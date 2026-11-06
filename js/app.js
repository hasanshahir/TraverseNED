/**
 * TraverseNED — Main Application Controller
 * Features:
 * - Real-Time Geofence status & GPS snapping (js/tracker.js integration)
 * - Dynamic shortest-path routing with Binary Min-Heap A*
 * - Mobile-first bottom sheet drawer & interactive walk simulation
 * - Layer toggles (Campus Map, High-Res Satellite, Affine Rotated Master Plan)
 */

(function () {
  "use strict";

  const DATA = window.NED_CAMPUS_DATA;
  const router = new window.CampusRouter(DATA);
  window.campusRouter = router;

  const state = {
    selectedDestinationId: "poi-5", // CSIT default
    activeOriginId: "GPS_CURRENT",
    activeRoute: null,
    showWalkwayGraph: false,
    masterPlanActive: false,
    currentLayerMode: "street",
    walkSimInterval: null,
    walkSimProgress: 0.25,
    userGpsCoords: null,
    isInsideCampus: false
  };

  let map = null;
  let baseLayers = {};
  let masterPlanOverlay = null;
  let campusBoundaryLayer = null;
  let campusArchitectureGroup = null;
  let markerClusterGroup = null;
  let markerById = {};
  let routeLayerGroup = null;
  let graphOverlayGroup = null;
  let tracker = null;
  let walkerMarker = null;

  /**
   * Affine Rotated Image Overlay for Master Plan
   */
  const AffineImageOverlay = L.Layer.extend({
    initialize: function (url, corners, options = {}) {
      this._url = url;
      this._corners = corners;
      this._opacity = options.opacity !== undefined ? options.opacity : 0.85;
      this._clipPath = options.clipPath || "inset(4% 4% 22% 4% round 12px)";
    },
    onAdd: function (mapInstance) {
      this._map = mapInstance;
      if (!this._container) {
        this._container = L.DomUtil.create("div", "leaflet-image-layer");
        this._container.style.position = "absolute";
        this._container.style.top = "0";
        this._container.style.left = "0";
        this._container.style.pointerEvents = "none";
        this._container.style.zIndex = "250";

        this._img = L.DomUtil.create("img", "", this._container);
        this._img.style.position = "absolute";
        this._img.style.transformOrigin = "0 0";
        this._img.style.clipPath = this._clipPath;
        this._img.style.opacity = String(this._opacity);

        this._img.onload = () => {
          if (this._map) this._reset();
        };
        this._img.src = this._url;
      }

      mapInstance.getPanes().overlayPane.appendChild(this._container);
      mapInstance.on("zoom viewreset move", this._reset, this);
      if (this._img.complete) {
        this._reset();
      }
    },
    onRemove: function (mapInstance) {
      mapInstance.off("zoom viewreset move", this._reset, this);
      if (this._container && this._container.parentNode) {
        this._container.parentNode.removeChild(this._container);
      }
    },
    setOpacity: function (opacity) {
      this._opacity = opacity;
      if (this._img) this._img.style.opacity = String(opacity);
      return this;
    },
    _reset: function () {
      if (!this._map || !this._img) return;
      const W = this._img.naturalWidth || 1000;
      const H = this._img.naturalHeight || 1000;
      const pTL = this._map.latLngToLayerPoint(this._corners.topLeft);
      const pTR = this._map.latLngToLayerPoint(this._corners.topRight);
      const pBL = this._map.latLngToLayerPoint(this._corners.bottomLeft);

      const a = (pTR.x - pTL.x) / W;
      const b = (pTR.y - pTL.y) / W;
      const c = (pBL.x - pTL.x) / H;
      const d = (pBL.y - pTL.y) / H;

      this._img.style.width = `${W}px`;
      this._img.style.height = `${H}px`;
      this._img.style.transform = `matrix(${a}, ${b}, ${c}, ${d}, ${pTL.x}, ${pTL.y})`;
    }
  });

  /**
   * 1. APP INITIALIZATION
   */
  function initApp() {
    initMap();
    renderArchitecturalCampus();
    renderAllMarkers();
    renderWalkwayGraphOverlay();
    populateSelects();
    bindUIEvents();
    initCampusTracker();

    // Default route: Main Gate -> Block 5 (CSIT)
    calculateAndRenderRoute("poi-gate-main", state.selectedDestinationId, { fitBounds: false });
  }

  /**
   * 2. MAP CONFIGURATION
   */
  function initMap() {
    map = L.map("campus-map", {
      center: DATA.meta.center || [24.9322, 67.1133],
      zoom: 17,
      minZoom: 15,
      maxZoom: 20,
      maxBounds: DATA.meta.maxBounds,
      maxBoundsViscosity: 0.9,
      zoomControl: false
    });

    const esriTopo = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 20, maxNativeZoom: 19, attribution: "&copy; Esri & OpenStreetMap | NED GIS" }
    );

    const esriSatellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 20, maxNativeZoom: 19, attribution: "&copy; Esri | Satellite" }
    );

    baseLayers = { street: esriTopo, satellite: esriSatellite };
    baseLayers.street.addTo(map);

    masterPlanOverlay = new AffineImageOverlay(
      "assets/ned_master_plan.jpg",
      DATA.meta.masterPlanControlCorners,
      { opacity: 0.85 }
    );

    campusArchitectureGroup = L.layerGroup().addTo(map);
    graphOverlayGroup = L.layerGroup();
    routeLayerGroup = L.layerGroup().addTo(map);
    markerClusterGroup = L.layerGroup().addTo(map);

    map.on("zoomend", () => {
      const mapEl = document.getElementById("campus-map");
      if (!mapEl) return;
      if (map.getZoom() >= 18) mapEl.classList.add("show-all-labels");
      else mapEl.classList.remove("show-all-labels");
    });
  }

  /**
   * 3. RENDER CAMPUS FOOTPRINTS & ROADS
   */
  function renderArchitecturalCampus() {
    campusArchitectureGroup.clearLayers();
    const isSat = state.currentLayerMode === "satellite";

    if (DATA.meta.campusBoundaryPolygon) {
      campusBoundaryLayer = L.polygon(DATA.meta.campusBoundaryPolygon, {
        color: isSat ? "#38bdf8" : "#94a3b8",
        weight: 2,
        dashArray: "6, 6",
        fillColor: "#f8fafc",
        fillOpacity: isSat ? 0.04 : 0.45,
        interactive: false
      }).addTo(campusArchitectureGroup);
    }

    DATA.walkwayGraph.edges.forEach(([u, v]) => {
      const nodeU = DATA.walkwayGraph.nodes[u];
      const nodeV = DATA.walkwayGraph.nodes[v];
      if (!nodeU || !nodeV) return;

      L.polyline([[nodeU.lat, nodeU.lng], [nodeV.lat, nodeV.lng]], {
        color: isSat ? "rgba(15, 23, 42, 0.55)" : "#cbd5e1",
        weight: 6,
        opacity: 0.8,
        lineCap: "round",
        interactive: false
      }).addTo(campusArchitectureGroup);

      L.polyline([[nodeU.lat, nodeU.lng], [nodeV.lat, nodeV.lng]], {
        color: "#ffffff",
        weight: 3.5,
        opacity: isSat ? 0.65 : 0.92,
        lineCap: "round",
        interactive: false
      }).addTo(campusArchitectureGroup);
    });

    // Cricket Ground
    L.circle([24.93202, 67.11531], {
      radius: 64,
      color: "#15803d",
      weight: 2,
      fillColor: "#4ade80",
      fillOpacity: isSat ? 0.22 : 0.5,
      interactive: false
    }).addTo(campusArchitectureGroup);

    // Soccer Field
    if (DATA.meta.soccerPolygon) {
      L.polygon(DATA.meta.soccerPolygon, {
        color: "#15803d",
        weight: 2,
        fillColor: "#22c55e",
        fillOpacity: isSat ? 0.22 : 0.48,
        interactive: false
      }).addTo(campusArchitectureGroup);
    }

    // Building Footprints
    const categoryPalette = {
      Academic:       { fill: "#34d399", stroke: "#059669" },
      Labs:           { fill: "#38bdf8", stroke: "#0284c7" },
      Administration: { fill: "#facc15", stroke: "#ca8a04" },
      Services:       { fill: "#fb923c", stroke: "#ea580c" },
      Cafeteria:      { fill: "#fb7185", stroke: "#e11d48" },
      Library:        { fill: "#a78bfa", stroke: "#7c3aed" },
      Sports:         { fill: "#4ade80", stroke: "#16a34a" },
      Hostels:        { fill: "#22d3ee", stroke: "#0891b2" },
      Emergency:      { fill: "#f87171", stroke: "#dc2626" }
    };

    DATA.landmarks.forEach((poi) => {
      if (!poi.footprintPolygon) return;
      const palette = categoryPalette[poi.category] || { fill: "#cbd5e1", stroke: "#475569" };

      const poly = L.polygon(poi.footprintPolygon, {
        color: palette.stroke,
        weight: 1.8,
        fillColor: palette.fill,
        fillOpacity: isSat ? 0.38 : 0.68
      });

      poly.on("click", () => {
        selectDestinationAndRoute(poi.id);
      });
      poly.addTo(campusArchitectureGroup);
    });
  }

  /**
   * 4. RENDER POI MARKERS
   */
  function renderAllMarkers() {
    markerClusterGroup.clearLayers();
    markerById = {};

    DATA.landmarks.forEach((poi) => {
      const isSelected = poi.id === state.selectedDestinationId;
      const isEndpoint = poi.id === state.activeOriginId || poi.id === state.selectedDestinationId;
      const blockClass = poi.major !== false ? "major-block" : "sub-block";

      const iconHtml = `
        <div class="ned-block-badge ${blockClass} cat-${poi.category} ${isSelected ? "is-selected" : ""} ${isEndpoint ? "is-endpoint" : ""}" data-poi-id="${poi.id}" title="#${poi.blockNumber} — ${poi.name}">${poi.blockNumber}</div>
        <div class="ned-pin-label">${poi.shortName}</div>
      `;

      const marker = L.marker(poi.coordinates, {
        icon: L.divIcon({
          className: "ned-pin-wrapper",
          html: iconHtml,
          iconSize: [28, 24],
          iconAnchor: [14, 12]
        }),
        zIndexOffset: poi.major !== false ? 300 : 100
      });

      marker.on("click", () => {
        selectDestinationAndRoute(poi.id);
      });

      marker.addTo(markerClusterGroup);
      markerById[poi.id] = marker;
    });
  }

  /**
   * 5. WALKWAY GRAPH
   */
  function renderWalkwayGraphOverlay() {
    graphOverlayGroup.clearLayers();
    DATA.walkwayGraph.edges.forEach(([u, v, streetName]) => {
      const nodeU = DATA.walkwayGraph.nodes[u];
      const nodeV = DATA.walkwayGraph.nodes[v];
      if (!nodeU || !nodeV) return;

      L.polyline([[nodeU.lat, nodeU.lng], [nodeV.lat, nodeV.lng]], {
        color: "#2563eb",
        weight: 2.5,
        opacity: 0.75,
        dashArray: "4, 6"
      }).addTo(graphOverlayGroup);
    });
  }

  /**
   * 6. ROUTE CALCULATION & RENDERING
   */
  function calculateAndRenderRoute(sourceId, targetId, options = {}) {
    state.activeOriginId = sourceId;
    state.selectedDestinationId = targetId;

    const destSelect = document.getElementById("select-destination");
    if (destSelect) destSelect.value = targetId;

    document.querySelectorAll(".ned-block-badge").forEach((el) => {
      const id = el.getAttribute("data-poi-id");
      el.classList.toggle("is-selected", id === targetId);
      el.classList.toggle("is-endpoint", id === sourceId || id === targetId);
    });

    const route = router.findShortestPath(sourceId, targetId);
    if (!route) return;

    state.activeRoute = route;
    stopWalkSimulation();
    routeLayerGroup.clearLayers();

    if (route.coordinates.length > 1) {
      L.polyline(route.coordinates, {
        color: "#ffffff",
        weight: 10,
        opacity: 0.95,
        lineCap: "round",
        lineJoin: "round"
      }).addTo(routeLayerGroup);

      L.polyline(route.coordinates, {
        color: "#2563EB",
        weight: 6,
        opacity: 0.98,
        lineCap: "round",
        lineJoin: "round"
      }).addTo(routeLayerGroup);

      L.polyline(route.coordinates, {
        color: "#93c5fd",
        weight: 3,
        opacity: 0.95,
        className: "route-line-animated"
      }).addTo(routeLayerGroup);
    }

    const startCoords = route.coordinates[0];
    const endCoords = route.coordinates[route.coordinates.length - 1];

    if (sourceId !== "GPS_CURRENT") {
      L.marker(startCoords, {
        icon: L.divIcon({
          className: "ned-pin-wrapper",
          html: '<div class="route-endpoint-pin origin"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        }),
        zIndexOffset: 800
      }).addTo(routeLayerGroup);
    }

    L.marker(endCoords, {
      icon: L.divIcon({
        className: "ned-pin-wrapper",
        html: '<div class="route-endpoint-pin destination"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      }),
      zIndexOffset: 850
    }).addTo(routeLayerGroup);

    // Initial walker marker
    const walkerPos = interpolateAlongPath(route.coordinates, 0.15);
    walkerMarker = L.marker(walkerPos, {
      icon: L.divIcon({
        className: "ned-pin-wrapper",
        html: '<div class="walker-avatar-marker" title="Pedestrian Position">🚶</div>',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      }),
      zIndexOffset: 950
    }).addTo(routeLayerGroup);

    if (options.fitBounds !== false && route.coordinates.length > 1) {
      map.flyToBounds(L.latLngBounds(route.coordinates).pad(0.35), {
        duration: 0.65,
        maxZoom: 18
      });
    }

    updateNavigationSheet(route);
  }

  function updateNavigationSheet(route) {
    const timeEl = document.getElementById("route-time");
    const distEl = document.getElementById("route-dist");
    const closeBtn = document.getElementById("btn-close-route");
    const stepsList = document.getElementById("steps-list");
    const stepsBadge = document.getElementById("steps-count-badge");

    if (timeEl) timeEl.innerText = route.formattedTime;
    if (distEl) distEl.innerText = route.formattedDistance;
    if (closeBtn) closeBtn.classList.remove("hidden");
    if (stepsBadge) stepsBadge.innerText = `${route.steps.length} steps`;

    if (stepsList) {
      stepsList.innerHTML = "";
      const turnIcons = {
        depart: "↑",
        straight: "↑",
        left: "↰",
        "slight-left": "↖",
        right: "↱",
        "slight-right": "↗",
        arrive: "◎"
      };

      route.steps.forEach((step) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div class="step-left">
            <span class="turn-icon">${turnIcons[step.turnType] || "↑"}</span>
            <span class="step-text">${step.instruction}</span>
          </div>
          <span class="step-dist">${step.formattedDistance}</span>
        `;
        li.addEventListener("click", () => {
          map.flyTo(step.coords, 18, { duration: 0.5 });
        });
        stepsList.appendChild(li);
      });
    }
  }

  /**
   * 7. LIVE GPS TRACKER & GEOFENCE HOOK
   */
  function initCampusTracker() {
    tracker = new CampusTracker(map, router, {
      onStatusChange: (isInside) => {
        state.isInsideCampus = isInside;
        const badge = document.getElementById("geofence-badge");
        const label = document.getElementById("geofence-text");

        if (isInside) {
          badge.className = "status-badge inside";
          label.innerText = "🟢 On Campus — Live GPS Active";
        } else {
          badge.className = "status-badge outside";
          label.innerText = "⚪ Off Campus — Static Mode";
        }
      },

      onLocationUpdate: (currentCoords, isInside) => {
        state.userGpsCoords = currentCoords;

        // If user is inside campus and has chosen GPS_CURRENT or has an active destination
        if (state.activeOriginId === "GPS_CURRENT" && state.selectedDestinationId) {
          snapGpsToRoute(currentCoords);
        }
      }
    });

    tracker.startTracking();
  }

  function snapGpsToRoute(coords) {
    router.nodes["GPS_CURRENT"] = {
      id: "GPS_CURRENT",
      coords,
      lat: coords[0],
      lng: coords[1],
      type: "user_gps",
      label: "My Real-Time Location"
    };

    const nearestNode = router._findClosestWalkwayNode(coords);
    if (!nearestNode) return;

    const distToWalkway = window.CampusRouter.haversineDistance(
      coords,
      router.nodes[nearestNode].coords
    );

    router.adjacencyList["GPS_CURRENT"] = [
      { node: nearestNode, weight: distToWalkway, streetName: "Walking Path" }
    ];

    const updatedRoute = router.findShortestPath("GPS_CURRENT", state.selectedDestinationId);
    if (updatedRoute) {
      calculateAndRenderRoute("GPS_CURRENT", state.selectedDestinationId, { fitBounds: false });
    }
  }

  /**
   * 8. WALK SIMULATION
   */
  function toggleWalkSimulation() {
    if (state.walkSimInterval) {
      stopWalkSimulation();
      return;
    }
    if (!state.activeRoute || state.activeRoute.coordinates.length < 2) return;

    const btn = document.getElementById("btn-simulate-walk");
    if (btn) btn.innerText = "⏸ Pause";

    state.walkSimProgress = 0.02;
    state.walkSimInterval = setInterval(() => {
      state.walkSimProgress += 0.015;
      if (state.walkSimProgress >= 1) {
        updateWalkerPosition(1);
        stopWalkSimulation();
        return;
      }
      updateWalkerPosition(state.walkSimProgress);
    }, 80);
  }

  function stopWalkSimulation() {
    if (state.walkSimInterval) {
      clearInterval(state.walkSimInterval);
      state.walkSimInterval = null;
    }
    const btn = document.getElementById("btn-simulate-walk");
    if (btn) btn.innerText = "▶ Walk";
  }

  function updateWalkerPosition(t) {
    if (!state.activeRoute) return;
    const pos = interpolateAlongPath(state.activeRoute.coordinates, t);
    if (walkerMarker && pos) walkerMarker.setLatLng(pos);
  }

  function interpolateAlongPath(coords, t) {
    if (!coords || coords.length === 0) return null;
    if (coords.length === 1 || t <= 0) return coords[0];
    if (t >= 1) return coords[coords.length - 1];

    const lengths = [];
    let totalLen = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      const d = window.CampusRouter.haversineDistance(coords[i], coords[i + 1]);
      lengths.push(d);
      totalLen += d;
    }
    if (totalLen === 0) return coords[0];

    const targetDist = t * totalLen;
    let accum = 0;
    for (let i = 0; i < lengths.length; i++) {
      if (accum + lengths[i] >= targetDist) {
        const r = lengths[i] === 0 ? 0 : (targetDist - accum) / lengths[i];
        return [
          coords[i][0] + (coords[i + 1][0] - coords[i][0]) * r,
          coords[i][1] + (coords[i + 1][1] - coords[i][1]) * r
        ];
      }
      accum += lengths[i];
    }
    return coords[coords.length - 1];
  }

  /**
   * 9. EVENT BINDINGS & UI HELPERS
   */
  function populateSelects() {
    const originSelect = document.getElementById("select-origin");
    const destSelect = document.getElementById("select-destination");
    if (!originSelect || !destSelect) return;

    DATA.landmarks.forEach((poi) => {
      const label = `[#${poi.blockNumber}] ${poi.shortName}`;
      originSelect.add(new Option(label, poi.id));
      destSelect.add(new Option(label, poi.id));
    });

    destSelect.value = state.selectedDestinationId;
  }

  function selectDestinationAndRoute(poiId) {
    state.selectedDestinationId = poiId;
    const destSelect = document.getElementById("select-destination");
    if (destSelect) destSelect.value = poiId;

    const source = state.isInsideCampus && state.userGpsCoords ? "GPS_CURRENT" : state.activeOriginId;
    calculateAndRenderRoute(source === "GPS_CURRENT" && !state.userGpsCoords ? "poi-gate-main" : source, poiId, { fitBounds: true });
  }

  function bindUIEvents() {
    // Search Autocomplete
    const searchInput = document.getElementById("campus-search");
    const clearBtn = document.getElementById("clear-search");
    const resultsList = document.getElementById("search-results");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const val = e.target.value.trim().toLowerCase();
        if (clearBtn) clearBtn.classList.toggle("hidden", !val);

        if (!val) {
          resultsList.classList.add("hidden");
          return;
        }

        const matches = DATA.landmarks.filter((p) => {
          return (
            p.name.toLowerCase().includes(val) ||
            p.shortName.toLowerCase().includes(val) ||
            p.blockNumber.toLowerCase() === val ||
            (p.keywords && p.keywords.some((k) => k.toLowerCase().includes(val)))
          );
        }).slice(0, 6);

        resultsList.innerHTML = "";
        if (matches.length === 0) {
          resultsList.innerHTML = '<li style="cursor:default;color:#64748b;">No department or block found</li>';
        } else {
          matches.forEach((p) => {
            const li = document.createElement("li");
            li.innerHTML = `
              <div class="item-left">
                <span class="badge">#${p.blockNumber}</span>
                <span class="title">${p.shortName}</span>
              </div>
              <span class="action">Route →</span>
            `;
            li.addEventListener("click", () => {
              searchInput.value = p.shortName;
              resultsList.classList.add("hidden");
              selectDestinationAndRoute(p.id);
            });
            resultsList.appendChild(li);
          });
        }
        resultsList.classList.remove("hidden");
      });
    }

    if (clearBtn && searchInput) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        clearBtn.classList.add("hidden");
        resultsList.classList.add("hidden");
      });
    }

    document.addEventListener("click", (e) => {
      if (resultsList && !e.target.closest(".search-card")) {
        resultsList.classList.add("hidden");
      }
    });

    // Destination & Origin Selects
    const originSelect = document.getElementById("select-origin");
    const destSelect = document.getElementById("select-destination");

    if (originSelect) {
      originSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "GPS_CURRENT" && state.userGpsCoords) {
          snapGpsToRoute(state.userGpsCoords);
        } else {
          calculateAndRenderRoute(val === "GPS_CURRENT" ? "poi-gate-main" : val, state.selectedDestinationId, { fitBounds: true });
        }
      });
    }

    if (destSelect) {
      destSelect.addEventListener("change", (e) => {
        selectDestinationAndRoute(e.target.value);
      });
    }

    // Quick Action Pills
    document.querySelectorAll("[data-quick]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-quick");
        if (action === "main-gate") {
          selectDestinationAndRoute("poi-gate-main");
        } else if (action === "cafe") {
          const nearest = router.findNearestLandmark(
            state.activeOriginId === "GPS_CURRENT" ? "poi-gate-main" : state.activeOriginId,
            (p) => p.category === "Cafeteria"
          );
          if (nearest) selectDestinationAndRoute(nearest.targetId);
        } else if (action === "library") {
          selectDestinationAndRoute("poi-library");
        } else if (action === "admin") {
          selectDestinationAndRoute("poi-27");
        }
      });
    });

    // FABS
    const btnRecenter = document.getElementById("btn-recenter");
    if (btnRecenter) {
      btnRecenter.addEventListener("click", () => {
        if (tracker) tracker.recenter();
      });
    }

    const btnEmergency = document.getElementById("btn-emergency");
    if (btnEmergency) {
      btnEmergency.addEventListener("click", () => {
        const safeZones = new Set(["poi-gate-main", "poi-gate-north", "poi-cricket", "poi-29"]);
        const origin = state.activeOriginId === "GPS_CURRENT" ? "poi-gate-main" : state.activeOriginId;
        const nearestSafe = router.findNearestLandmark(origin, (p) => safeZones.has(p.id));
        if (nearestSafe) selectDestinationAndRoute(nearestSafe.targetId);
      });
    }

    const btnGraph = document.getElementById("btn-walk-graph");
    if (btnGraph) {
      btnGraph.addEventListener("click", () => {
        state.showWalkwayGraph = !state.showWalkwayGraph;
        btnGraph.classList.toggle("active", state.showWalkwayGraph);
        if (state.showWalkwayGraph) graphOverlayGroup.addTo(map);
        else map.removeLayer(graphOverlayGroup);
      });
    }

    // Bottom Sheet Drag Handle Toggle
    const dragHandle = document.getElementById("sheet-drag-handle");
    const sheet = document.getElementById("bottom-sheet");
    if (dragHandle && sheet) {
      dragHandle.addEventListener("click", () => {
        sheet.classList.toggle("collapsed");
      });
    }

    // End Route Button
    const closeRouteBtn = document.getElementById("btn-close-route");
    if (closeRouteBtn) {
      closeRouteBtn.addEventListener("click", () => {
        routeLayerGroup.clearLayers();
        stopWalkSimulation();
        closeRouteBtn.classList.add("hidden");
        document.getElementById("route-time").innerText = "-- min";
        document.getElementById("route-dist").innerText = "-- m";
      });
    }

    // Walk Simulation Button
    const simBtn = document.getElementById("btn-simulate-walk");
    if (simBtn) {
      simBtn.addEventListener("click", toggleWalkSimulation);
    }

    // Layer Toggles
    document.querySelectorAll(".layer-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const layer = btn.getAttribute("data-layer");
        document.querySelectorAll(".layer-toggle-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        if (layer === "street") {
          state.currentLayerMode = "street";
          if (map.hasLayer(baseLayers.satellite)) map.removeLayer(baseLayers.satellite);
          if (!map.hasLayer(baseLayers.street)) baseLayers.street.addTo(map);
          if (map.hasLayer(masterPlanOverlay)) map.removeLayer(masterPlanOverlay);
          renderArchitecturalCampus();
        } else if (layer === "satellite") {
          state.currentLayerMode = "satellite";
          if (map.hasLayer(baseLayers.street)) map.removeLayer(baseLayers.street);
          if (!map.hasLayer(baseLayers.satellite)) baseLayers.satellite.addTo(map);
          if (map.hasLayer(masterPlanOverlay)) map.removeLayer(masterPlanOverlay);
          renderArchitecturalCampus();
        } else if (layer === "masterplan") {
          if (!map.hasLayer(masterPlanOverlay)) masterPlanOverlay.addTo(map);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
