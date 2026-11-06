/**
 * NED Campus Maps — Main Application Controller
 * Georeferenced to Real-World Satellite Imagery & OpenStreetMap Coordinates:
 * - Cricket Ground: [24.93202, 67.11531]
 * - Soccer Field:   [24.93153, 67.11687]
 * - CSIT (Block 5): [24.93107, 67.11390]
 * - Civil (Block 4):[24.93116, 67.11293]
 * - Admin (Block 27):[24.93273, 67.11028]
 * - Library (LIB):  [24.93331, 67.11113]
 * - Masjid (MSJ):   [24.93427, 67.11106]
 * - Polymer (22):   [24.93458, 67.11061]
 * Includes a custom 3-Point Affine Rotated Image Overlay so `ned_master_plan.jpg`
 * aligns at the exact ~54.5° real-world angle of NED University on University Road.
 */

(function () {
  "use strict";

  const DATA = window.NED_CAMPUS_DATA;
  const router = new window.CampusRouter(DATA);
  window.campusRouter = router;

  const state = {
    selectedPoiId: "poi-5",
    originId: "poi-gate-main",
    destinationId: "poi-5",
    activeRoute: null,
    activeCategory: "All",
    showWalkwayGraph: false,
    masterPlanActive: false,
    currentLayerMode: "street",
    walkSimInterval: null,
    walkSimProgress: 0.25
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
  let walkerMarker = null;

  /**
   * Production-grade AffineImageOverlay:
   * - Natural width/height raster aspect ratio calculation (Bug A fix)
   * - onload synchronization for clean initial rendering
   * - Memory-leak safe teardown in onRemove with listener unregistration (Bug B fix)
   * - Dynamic CSS matrix projection mapping non-square rasters onto georeferenced coordinates
   */
  const AffineImageOverlay = L.Layer.extend({
    initialize: function (url, corners, options = {}) {
      this._url = url;
      this._corners = corners; // { topLeft, topRight, bottomLeft }
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
   * 1. INITIALIZE APPLICATION
   */
  function initApp() {
    initMap();
    renderArchitecturalCampus();
    renderAllMarkers();
    renderWalkwayGraphOverlay();
    populateRouteSelects();
    renderCategoryChips();
    renderDirectoryList();
    bindUIEvents();

    // Calculate default flagship route: Main Gate -> Block 5 (CSIT & Maths Dept.)
    calculateAndRenderRoute(state.originId, state.destinationId, {
      fitBounds: false
    });
  }

  /**
   * 2. LEAFLET MAP & KEY-FREE TILE CONFIGURATION
   */
  function initMap() {
    const viewportCenter =
      window.innerWidth > 900 ? [24.9323, 67.1120] : DATA.meta.center;

    map = L.map("campus-map", {
      center: viewportCenter,
      zoom: DATA.meta.defaultZoom || 17,
      minZoom: DATA.meta.minZoom,
      maxZoom: DATA.meta.maxZoom,
      maxBounds: DATA.meta.maxBounds,
      maxBoundsViscosity: 0.9,
      zoomControl: false
    });

    // Key-free Layer 1: Standard OpenStreetMap + Esri World Topo Cartography
    const esriTopoStreet = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &amp; Esri | NED Campus GIS'
      }
    );

    // Key-free Layer 2: Esri World Imagery (High-Resolution Satellite View)
    const esriSatellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "Tiles &copy; Esri &mdash; High-Res Satellite"
      }
    );

    baseLayers = {
      street: esriTopoStreet,
      satellite: esriSatellite
    };

    baseLayers.street.addTo(map);

    // Layer 3: Georeferenced Rotated NED Master Plan Image Overlay
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
      if (map.getZoom() >= 18) {
        mapEl.classList.add("show-all-labels");
      } else {
        mapEl.classList.remove("show-all-labels");
      }
    });
  }

  /**
   * 3. RENDER GEOREFERENCED ARCHITECTURAL CAMPUS GROUNDS, ROADS & BUILDING FOOTPRINTS
   */
  function renderArchitecturalCampus() {
    campusArchitectureGroup.clearLayers();

    const isSat = state.currentLayerMode === "satellite";

    // 1. Rotated Campus Boundary Polygon matching real-world NED perimeter
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

    // 2. Campus Internal Paved Roads & Pedestrian Walkways
    DATA.walkwayGraph.edges.forEach(([u, v]) => {
      const nodeU = DATA.walkwayGraph.nodes[u];
      const nodeV = DATA.walkwayGraph.nodes[v];
      if (!nodeU || !nodeV) return;

      L.polyline(
        [
          [nodeU.lat, nodeU.lng],
          [nodeV.lat, nodeV.lng]
        ],
        {
          color: isSat ? "rgba(15, 23, 42, 0.55)" : "#cbd5e1",
          weight: 7,
          opacity: 0.8,
          lineCap: "round",
          interactive: false
        }
      ).addTo(campusArchitectureGroup);

      L.polyline(
        [
          [nodeU.lat, nodeU.lng],
          [nodeV.lat, nodeV.lng]
        ],
        {
          color: "#ffffff",
          weight: 4,
          opacity: isSat ? 0.65 : 0.92,
          lineCap: "round",
          interactive: false
        }
      ).addTo(campusArchitectureGroup);
    });

    // 3. Exact Real-World Cricket Ground ([24.93202, 67.11531])
    L.circle([24.93202, 67.11531], {
      radius: 64,
      color: "#15803d",
      weight: 2,
      fillColor: "#4ade80",
      fillOpacity: isSat ? 0.22 : 0.5,
      interactive: false
    }).addTo(campusArchitectureGroup);

    // 4. Exact Real-World Soccer Field ([24.93153, 67.11687])
    if (DATA.meta.soccerPolygon) {
      L.polygon(DATA.meta.soccerPolygon, {
        color: "#15803d",
        weight: 2,
        fillColor: "#22c55e",
        fillOpacity: isSat ? 0.22 : 0.48,
        interactive: false
      }).addTo(campusArchitectureGroup);
    }

    // 5. Main Car Parking Area
    if (DATA.meta.parkingPolygon) {
      L.polygon(DATA.meta.parkingPolygon, {
        color: "#4f46e5",
        weight: 1.5,
        fillColor: "#818cf8",
        fillOpacity: isSat ? 0.25 : 0.45,
        interactive: false
      }).addTo(campusArchitectureGroup);
    }

    // 6. Courtyard Fountain (Block 6)
    const fountainPoi = DATA.landmarks.find((p) => p.id === "poi-6");
    if (fountainPoi) {
      L.circle(fountainPoi.coordinates, {
        radius: 12,
        color: "#0284c7",
        weight: 2,
        fillColor: "#38bdf8",
        fillOpacity: 0.75,
        interactive: false
      }).addTo(campusArchitectureGroup);
    }

    // 7. Rotated Building Footprints for All 30 Blocks & Landmarks
    const categoryPalette = {
      Academic: { fill: "#34d399", stroke: "#059669" },
      Labs: { fill: "#38bdf8", stroke: "#0284c7" },
      Administration: { fill: "#facc15", stroke: "#ca8a04" },
      Services: { fill: "#fb923c", stroke: "#ea580c" },
      Cafeteria: { fill: "#fb7185", stroke: "#e11d48" },
      Library: { fill: "#a78bfa", stroke: "#7c3aed" },
      Sports: { fill: "#4ade80", stroke: "#16a34a" },
      Hostels: { fill: "#22d3ee", stroke: "#0891b2" },
      Emergency: { fill: "#f87171", stroke: "#dc2626" }
    };

    DATA.landmarks.forEach((poi) => {
      if (!poi.footprintPolygon) return;
      const palette = categoryPalette[poi.category] || {
        fill: "#cbd5e1",
        stroke: "#475569"
      };

      const poly = L.polygon(poi.footprintPolygon, {
        color: palette.stroke,
        weight: 1.8,
        fillColor: palette.fill,
        fillOpacity: isSat ? 0.38 : 0.68
      });

      poly.on("click", () => {
        setDestinationAndRoute(poi.id);
      });

      poly.addTo(campusArchitectureGroup);
    });
  }

  /**
   * 4. RENDER CLEAN BLOCK NUMBER BADGES
   */
  function renderAllMarkers() {
    markerClusterGroup.clearLayers();
    markerById = {};

    DATA.landmarks.forEach((poi) => {
      const isSelected = poi.id === state.selectedPoiId;
      const isEndpoint =
        poi.id === state.originId || poi.id === state.destinationId;
      const blockClass = poi.major !== false ? "major-block" : "sub-block";

      const iconHtml = `
        <div
          class="ned-block-badge ${blockClass} cat-${poi.category} ${isSelected ? "is-selected" : ""} ${isEndpoint ? "is-endpoint" : ""}"
          data-poi-id="${poi.id}"
          title="#${poi.blockNumber} — ${poi.name}"
        >${poi.blockNumber}</div>
        <div class="ned-pin-label">${poi.shortName}</div>
      `;

      const customIcon = L.divIcon({
        className: "ned-pin-wrapper",
        html: iconHtml,
        iconSize: [28, 24],
        iconAnchor: [14, 12],
        popupAnchor: [0, -16]
      });

      const marker = L.marker(poi.coordinates, {
        icon: customIcon,
        zIndexOffset: poi.major !== false ? 300 : 100
      });

      const popupContent = document.createElement("div");
      popupContent.innerHTML = `
        <div class="popup-card-title">#${poi.blockNumber} · ${poi.shortName}</div>
        <div class="popup-card-meta">${poi.name}<br/>${poi.category} • ${poi.buildingHours}</div>
        <div class="popup-btn-row">
          <button class="popup-action-btn primary" data-action="to" data-id="${poi.id}">Route Here</button>
          <button class="popup-action-btn secondary" data-action="from" data-id="${poi.id}">Start Here</button>
        </div>
      `;

      popupContent.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = btn.getAttribute("data-id");
          const action = btn.getAttribute("data-action");
          if (action === "to") {
            setDestinationAndRoute(id);
          } else {
            setOriginAndRoute(id);
          }
          marker.closePopup();
        });
      });

      marker.bindPopup(popupContent, { minWidth: 215 });

      marker.on("click", () => {
        selectLandmark(poi.id, { pan: false });
      });

      marker.addTo(markerClusterGroup);
      markerById[poi.id] = marker;
    });
  }

  /**
   * 5. WALKWAY GRAPH NODES & EDGES OVERLAY
   */
  function renderWalkwayGraphOverlay() {
    graphOverlayGroup.clearLayers();

    DATA.walkwayGraph.edges.forEach(([u, v, streetName]) => {
      const nodeU = DATA.walkwayGraph.nodes[u];
      const nodeV = DATA.walkwayGraph.nodes[v];
      if (!nodeU || !nodeV) return;

      L.polyline(
        [
          [nodeU.lat, nodeU.lng],
          [nodeV.lat, nodeV.lng]
        ],
        {
          color: "#2563eb",
          weight: 2.5,
          opacity: 0.75,
          dashArray: "4, 6"
        }
      )
        .bindTooltip(streetName, { sticky: true })
        .addTo(graphOverlayGroup);
    });

    Object.entries(DATA.walkwayGraph.nodes).forEach(([id, node]) => {
      L.circleMarker([node.lat, node.lng], {
        radius: 4,
        fillColor: "#0f172a",
        color: "#ffffff",
        weight: 1.5,
        fillOpacity: 1
      })
        .bindTooltip(`${node.label}`)
        .addTo(graphOverlayGroup);
    });
  }

  /**
   * 6. SHORTEST-PATH ROUTING & POLYLINE (#2563EB)
   */
  function calculateAndRenderRoute(sourceId, targetId, options = {}) {
    state.originId = sourceId;
    state.destinationId = targetId;
    state.selectedPoiId = targetId;

    const originSelect = document.getElementById("route-from-select");
    const destSelect = document.getElementById("route-to-select");
    if (originSelect) originSelect.value = sourceId;
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
        weight: 11,
        opacity: 0.95,
        lineCap: "round",
        lineJoin: "round"
      }).addTo(routeLayerGroup);

      L.polyline(route.coordinates, {
        color: "#2563EB",
        weight: 6.5,
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

    L.marker(startCoords, {
      icon: L.divIcon({
        className: "ned-pin-wrapper",
        html: `<div class="route-endpoint-pin origin"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      }),
      zIndexOffset: 800
    }).addTo(routeLayerGroup);

    L.marker(endCoords, {
      icon: L.divIcon({
        className: "ned-pin-wrapper",
        html: `<div class="route-endpoint-pin destination"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      }),
      zIndexOffset: 850
    }).addTo(routeLayerGroup);

    const initialWalkerPos = interpolateAlongPath(route.coordinates, 0.25);
    walkerMarker = L.marker(initialWalkerPos, {
      icon: L.divIcon({
        className: "ned-pin-wrapper",
        html: `<div class="walker-avatar-marker" title="Pedestrian Navigator">🚶</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      }),
      zIndexOffset: 950
    }).addTo(routeLayerGroup);

    if (options.fitBounds !== false && route.coordinates.length > 1) {
      const bounds = L.latLngBounds(route.coordinates);
      map.flyToBounds(bounds.pad(0.32), {
        duration: 0.65,
        maxZoom: 18
      });
    }

    updateUIWithRoute(route);
  }

  /**
   * 7. UPDATE SIDEBAR & FLOATING HUDS
   */
  function updateUIWithRoute(route) {
    const targetPoi =
      route.targetPoi ||
      DATA.landmarks.find((p) => p.id === state.selectedPoiId) ||
      DATA.landmarks[6];
    const sourcePoi =
      route.sourcePoi ||
      DATA.landmarks.find((p) => p.id === state.originId) ||
      DATA.landmarks[0];

    const sumTitle = document.getElementById("summary-route-title");
    const sumMetrics = document.getElementById("summary-route-metrics");
    if (sumTitle) {
      sumTitle.textContent = `${sourcePoi.shortName} → ${targetPoi.shortName}`;
    }
    if (sumMetrics) {
      sumMetrics.textContent = `${route.formattedDistance} • ${route.formattedTime} walk (1.3 m/s)`;
    }

    const codeEl = document.getElementById("dispatch-block-code");
    const statusTextEl = document.getElementById("dispatch-status-text");
    const deptNameEl = document.getElementById("meta-dept-name");
    const originNameEl = document.getElementById("meta-origin-name");
    const distTimeEl = document.getElementById("meta-dist-time");
    const categoryEl = document.getElementById("meta-category");
    const hoursEl = document.getElementById("meta-hours");
    const descEl = document.getElementById("dispatch-description");

    if (codeEl) codeEl.textContent = `#BLOCK-${targetPoi.blockNumber}`;
    if (statusTextEl)
      statusTextEl.textContent = `${targetPoi.shortName} • ${route.formattedDistance}`;
    if (deptNameEl) deptNameEl.textContent = targetPoi.name;
    if (originNameEl) originNameEl.textContent = sourcePoi.shortName;
    if (distTimeEl)
      distTimeEl.textContent = `${route.formattedDistance} (${route.formattedTime} walk)`;
    if (categoryEl)
      categoryEl.textContent = `${targetPoi.category} • ${targetPoi.floorCount} Floor(s)`;
    if (hoursEl) hoursEl.textContent = targetPoi.buildingHours;
    if (descEl) descEl.textContent = `"${targetPoi.description}"`;

    renderTurnByTurnSteps(route);

    const nextStep =
      route.steps.length > 1 ? route.steps[1] : route.steps[0];
    if (nextStep) updateTopTurnHUDWithStep(nextStep);

    const distEl = document.getElementById("eta-card-distance");
    const timeEl = document.getElementById("eta-card-duration");
    const clockEl = document.getElementById("eta-card-arrival");
    if (distEl) distEl.textContent = route.formattedDistance;
    if (timeEl) timeEl.textContent = route.formattedTime;
    if (clockEl) clockEl.textContent = route.arrivalTimeFormatted;

    updateWalkerPosition(0.25);
  }

  function renderTurnByTurnSteps(route) {
    const listEl = document.getElementById("turn-steps-list");
    const countBadge = document.getElementById("steps-count-badge");
    if (!listEl) return;

    if (countBadge) {
      countBadge.textContent = `${route.steps.length} steps · ${route.formattedDistance}`;
    }

    listEl.innerHTML = "";

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
      const item = document.createElement("div");
      const isArrive = step.turnType === "arrive";
      item.className = `turn-step-item ${isArrive ? "arrive-step" : ""}`;
      item.innerHTML = `
        <div class="step-turn-badge">${turnIcons[step.turnType] || "↑"}</div>
        <div class="step-body">
          <div class="step-main-text">${step.instruction}</div>
          <div class="step-sub-text">${step.landmarkHint || step.streetName}</div>
        </div>
        <div class="step-dist-pill">${step.formattedDistance}</div>
      `;

      item.addEventListener("click", () => {
        document
          .querySelectorAll(".turn-step-item")
          .forEach((el) => el.classList.remove("active"));
        item.classList.add("active");
        map.flyTo(step.coords, 18, { duration: 0.5 });
        updateTopTurnHUDWithStep(step);
      });

      listEl.appendChild(item);
    });
  }

  function updateTopTurnHUDWithStep(step) {
    const turnIconMap = {
      depart: "↑",
      straight: "↑",
      left: "↰",
      "slight-left": "↖",
      right: "↱",
      "slight-right": "↗",
      arrive: "◎"
    };
    const iconEl = document.getElementById("hud-turn-icon");
    const distEl = document.getElementById("hud-turn-dist");
    const streetEl = document.getElementById("hud-turn-street");

    if (iconEl) iconEl.textContent = turnIconMap[step.turnType] || "↰";
    if (distEl)
      distEl.textContent =
        step.distanceMeters > 0 ? step.formattedDistance : "Arrive";
    if (streetEl) streetEl.textContent = step.streetName;
  }

  /**
   * 8. LIVE WALK SIMULATION
   */
  function toggleWalkSimulation() {
    if (state.walkSimInterval) {
      stopWalkSimulation();
      return;
    }
    if (!state.activeRoute || state.activeRoute.coordinates.length < 2) return;

    const playBtn = document.getElementById("walk-sim-toggle-btn");
    const sumWalkBtn = document.getElementById("summary-walk-btn");
    if (playBtn) playBtn.textContent = "⏸";
    if (sumWalkBtn) sumWalkBtn.textContent = "⏸ Pause";

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
    const playBtn = document.getElementById("walk-sim-toggle-btn");
    const sumWalkBtn = document.getElementById("summary-walk-btn");
    if (playBtn) playBtn.textContent = "▶";
    if (sumWalkBtn) sumWalkBtn.textContent = "▶ Walk";
  }

  function updateWalkerPosition(t) {
    if (!state.activeRoute) return;
    const pos = interpolateAlongPath(state.activeRoute.coordinates, t);
    if (walkerMarker && pos) walkerMarker.setLatLng(pos);

    const fillEl = document.getElementById("eta-progress-fill");
    const arrowEl = document.getElementById("eta-progress-arrow");
    const pct = Math.min(96, Math.max(6, Math.round(t * 100)));
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (arrowEl) arrowEl.style.left = `${pct}%`;
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
   * 9. SELECTION, DIRECTORY & SEARCH AUTOCOMPLETE
   */
  function selectLandmark(poiId, options = {}) {
    state.selectedPoiId = poiId;
    if (poiId !== state.originId) {
      calculateAndRenderRoute(state.originId, poiId, {
        fitBounds: Boolean(options.fitBounds)
      });
    }
  }

  function setDestinationAndRoute(poiId) {
    if (poiId === state.originId) state.originId = "poi-gate-main";
    calculateAndRenderRoute(state.originId, poiId, { fitBounds: true });
    activateTab("tab-navigate");
  }

  function setOriginAndRoute(poiId) {
    if (poiId === state.destinationId) state.destinationId = "poi-5";
    calculateAndRenderRoute(poiId, state.destinationId, { fitBounds: true });
    activateTab("tab-navigate");
  }

  function populateRouteSelects() {
    const fromSelect = document.getElementById("route-from-select");
    const toSelect = document.getElementById("route-to-select");
    if (!fromSelect || !toSelect) return;

    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    DATA.landmarks.forEach((poi) => {
      const label = `[#${poi.blockNumber}] ${poi.shortName}`;
      fromSelect.add(new Option(label, poi.id));
      toSelect.add(new Option(label, poi.id));
    });

    fromSelect.value = state.originId;
    toSelect.value = state.destinationId;
  }

  function renderCategoryChips() {
    const bar = document.getElementById("category-chips-bar");
    if (!bar) return;

    const categories = [
      "All",
      "Academic",
      "Labs",
      "Administration",
      "Cafeteria",
      "Sports",
      "Services",
      "Hostels"
    ];

    bar.innerHTML = "";
    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = `cat-chip ${state.activeCategory === cat ? "active" : ""}`;
      btn.textContent = cat;
      btn.addEventListener("click", () => {
        state.activeCategory = cat;
        renderCategoryChips();
        renderDirectoryList();
      });
      bar.appendChild(btn);
    });
  }

  function renderDirectoryList() {
    const container = document.getElementById("directory-cards-list");
    if (!container) return;

    const filtered = DATA.landmarks.filter(
      (poi) =>
        state.activeCategory === "All" || poi.category === state.activeCategory
    );

    container.innerHTML = "";
    filtered.forEach((poi) => {
      const card = document.createElement("div");
      card.className = "dir-poi-card";
      card.innerHTML = `
        <div class="dir-poi-left">
          <div class="dir-block-num">${poi.blockNumber}</div>
          <div style="min-width:0;">
            <div class="dir-poi-name">${poi.name}</div>
            <div class="dir-poi-cat">${poi.category} • ${poi.buildingHours}</div>
          </div>
        </div>
        <button class="dir-go-btn" title="Route to ${poi.shortName}">↗</button>
      `;
      card.addEventListener("click", () => {
        setDestinationAndRoute(poi.id);
      });
      container.appendChild(card);
    });
  }

  function handleSearchInput(query) {
    const dropdown = document.getElementById("search-autocomplete");
    const clearBtn = document.getElementById("clear-search-btn");
    const trimmed = query.trim().toLowerCase();

    if (clearBtn) clearBtn.classList.toggle("visible", trimmed.length > 0);
    if (!dropdown) return;

    if (!trimmed) {
      dropdown.classList.remove("open");
      dropdown.innerHTML = "";
      return;
    }

    const matches = DATA.landmarks
      .map((poi) => {
        let score = 0;
        const nameLower = poi.name.toLowerCase();
        const shortLower = poi.shortName.toLowerCase();
        const blockLower = poi.blockNumber.toLowerCase();
        const kwMatch = (poi.keywords || []).some((k) =>
          k.toLowerCase().includes(trimmed)
        );

        if (blockLower === trimmed || `block ${blockLower}` === trimmed) score += 100;
        else if (blockLower.startsWith(trimmed)) score += 60;
        if (shortLower.startsWith(trimmed) || nameLower.startsWith(trimmed)) score += 50;
        else if (nameLower.includes(trimmed) || shortLower.includes(trimmed)) score += 30;
        if (kwMatch) score += 25;
        return { poi, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7);

    dropdown.innerHTML = "";
    if (matches.length === 0) {
      dropdown.innerHTML = `
        <div class="autocomplete-item">
          <div class="auto-item-sub">No match for "${query}". Try "CS", "15", "Library", or "Food".</div>
        </div>
      `;
      dropdown.classList.add("open");
      return;
    }

    matches.forEach(({ poi }, idx) => {
      const row = document.createElement("div");
      row.className = `autocomplete-item ${idx === 0 ? "highlighted" : ""}`;
      row.setAttribute("data-poi-id", poi.id);
      row.innerHTML = `
        <div class="auto-item-left">
          <div class="auto-block-badge">#${poi.blockNumber}</div>
          <div style="min-width:0;">
            <div class="auto-item-title">${poi.name}</div>
            <div class="auto-item-sub">${poi.category}</div>
          </div>
        </div>
        <span class="auto-route-trigger">Route →</span>
      `;
      row.addEventListener("click", () => {
        const input = document.getElementById("global-search-input");
        if (input) input.value = poi.shortName;
        dropdown.classList.remove("open");
        setDestinationAndRoute(poi.id);
      });
      dropdown.appendChild(row);
    });

    dropdown.classList.add("open");
  }

  /**
   * 10. QUICK ACTIONS, TABS & LAYER SWITCHER
   */
  function triggerQuickAction(actionType) {
    if (actionType === "from-main-gate") {
      const target =
        state.selectedPoiId && state.selectedPoiId !== "poi-gate-main"
          ? state.selectedPoiId
          : "poi-5";
      calculateAndRenderRoute("poi-gate-main", target, { fitBounds: true });
    } else if (actionType === "nearest-cafeteria") {
      const origin = state.selectedPoiId || state.originId || "poi-5";
      const nearest = router.findNearestLandmark(
        origin,
        (poi) => poi.category === "Cafeteria"
      );
      if (nearest) {
        calculateAndRenderRoute(origin, nearest.targetId, { fitBounds: true });
      }
    } else if (actionType === "emergency-safe-zone") {
      const origin = state.selectedPoiId || state.originId || "poi-5";
      const safeZones = new Set([
        "poi-gate-main",
        "poi-gate-north",
        "poi-cricket",
        "poi-29"
      ]);
      const nearestSafe = router.findNearestLandmark(origin, (poi) =>
        safeZones.has(poi.id)
      );
      if (nearestSafe) {
        calculateAndRenderRoute(origin, nearestSafe.targetId, {
          fitBounds: true
        });
      }
    } else if (actionType === "toggle-graph") {
      toggleWalkwayGraphOverlay();
    }
  }

  function toggleWalkwayGraphOverlay() {
    state.showWalkwayGraph = !state.showWalkwayGraph;
    const btn = document.getElementById("toggle-graph-header-btn");
    if (state.showWalkwayGraph) {
      graphOverlayGroup.addTo(map);
      if (btn) btn.classList.add("active");
    } else {
      map.removeLayer(graphOverlayGroup);
      if (btn) btn.classList.remove("active");
    }
  }

  function switchMapLayer(layerMode) {
    const opacityCard = document.getElementById("overlay-opacity-card");
    document.querySelectorAll(".layer-toggle-btn").forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-layer") === layerMode
      );
    });

    if (layerMode === "street") {
      state.currentLayerMode = "street";
      if (map.hasLayer(baseLayers.satellite)) map.removeLayer(baseLayers.satellite);
      if (!map.hasLayer(baseLayers.street)) baseLayers.street.addTo(map);
      if (map.hasLayer(masterPlanOverlay)) map.removeLayer(masterPlanOverlay);
      state.masterPlanActive = false;
      if (opacityCard) opacityCard.classList.remove("visible");
      renderArchitecturalCampus();
    } else if (layerMode === "satellite") {
      state.currentLayerMode = "satellite";
      if (map.hasLayer(baseLayers.street)) map.removeLayer(baseLayers.street);
      if (!map.hasLayer(baseLayers.satellite)) baseLayers.satellite.addTo(map);
      if (map.hasLayer(masterPlanOverlay)) map.removeLayer(masterPlanOverlay);
      state.masterPlanActive = false;
      if (opacityCard) opacityCard.classList.remove("visible");
      renderArchitecturalCampus();
    } else if (layerMode === "masterplan") {
      if (!map.hasLayer(masterPlanOverlay)) masterPlanOverlay.addTo(map);
      state.masterPlanActive = true;
      if (opacityCard) opacityCard.classList.add("visible");
    }
  }

  function activateTab(tabId) {
    if (tabId === "toggle-masterplan") {
      switchMapLayer(state.masterPlanActive ? state.currentLayerMode : "masterplan");
      return;
    }

    document.querySelectorAll(".tab-pane").forEach((pane) => {
      pane.classList.toggle("active", pane.id === tabId);
    });
    document.querySelectorAll(".dock-nav-btn").forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-tab-target") === tabId
      );
    });
  }

  function bindUIEvents() {
    const searchInput = document.getElementById("global-search-input");
    const clearSearchBtn = document.getElementById("clear-search-btn");
    const dropdown = document.getElementById("search-autocomplete");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => handleSearchInput(e.target.value));
      searchInput.addEventListener("focus", (e) => {
        if (e.target.value.trim()) handleSearchInput(e.target.value);
      });
      searchInput.addEventListener("keydown", (e) => {
        if (!dropdown || !dropdown.classList.contains("open")) return;
        const items = Array.from(
          dropdown.querySelectorAll(".autocomplete-item[data-poi-id]")
        );
        if (items.length === 0) return;

        let activeIdx = items.findIndex((el) =>
          el.classList.contains("highlighted")
        );

        if (e.key === "ArrowDown") {
          e.preventDefault();
          items.forEach((el) => el.classList.remove("highlighted"));
          activeIdx = (activeIdx + 1) % items.length;
          items[activeIdx].classList.add("highlighted");
          items[activeIdx].scrollIntoView({ block: "nearest" });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          items.forEach((el) => el.classList.remove("highlighted"));
          activeIdx = activeIdx <= 0 ? items.length - 1 : activeIdx - 1;
          items[activeIdx].classList.add("highlighted");
          items[activeIdx].scrollIntoView({ block: "nearest" });
        } else if (e.key === "Enter") {
          e.preventDefault();
          const targetItem = activeIdx >= 0 ? items[activeIdx] : items[0];
          if (targetItem) targetItem.click();
        } else if (e.key === "Escape") {
          dropdown.classList.remove("open");
        }
      });
    }

    if (clearSearchBtn && searchInput) {
      clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        handleSearchInput("");
      });
    }
    document.addEventListener("click", (e) => {
      if (dropdown && !e.target.closest(".search-container")) {
        dropdown.classList.remove("open");
      }
    });

    const fromSelect = document.getElementById("route-from-select");
    const toSelect = document.getElementById("route-to-select");
    const swapBtn = document.getElementById("swap-route-btn");

    if (fromSelect) {
      fromSelect.addEventListener("change", () =>
        calculateAndRenderRoute(fromSelect.value, toSelect.value, { fitBounds: true })
      );
    }
    if (toSelect) {
      toSelect.addEventListener("change", () =>
        calculateAndRenderRoute(fromSelect.value, toSelect.value, { fitBounds: true })
      );
    }
    if (swapBtn) {
      swapBtn.addEventListener("click", () =>
        calculateAndRenderRoute(state.destinationId, state.originId, { fitBounds: true })
      );
    }

    document.querySelectorAll("[data-quick-action]").forEach((btn) => {
      btn.addEventListener("click", () =>
        triggerQuickAction(btn.getAttribute("data-quick-action"))
      );
    });

    const graphHeaderBtn = document.getElementById("toggle-graph-header-btn");
    if (graphHeaderBtn) graphHeaderBtn.addEventListener("click", toggleWalkwayGraphOverlay);

    const resetCampusBtn = document.getElementById("reset-campus-view-btn");
    if (resetCampusBtn) {
      resetCampusBtn.addEventListener("click", () => {
        const center = window.innerWidth > 900 ? [24.9323, 67.1120] : DATA.meta.center;
        map.flyTo(center, 17, { duration: 0.65 });
      });
    }

    const walkSimBtn = document.getElementById("walk-sim-toggle-btn");
    const sumWalkBtn = document.getElementById("summary-walk-btn");
    if (walkSimBtn) walkSimBtn.addEventListener("click", toggleWalkSimulation);
    if (sumWalkBtn) sumWalkBtn.addEventListener("click", toggleWalkSimulation);

    const progressTrack = document.getElementById("eta-progress-track");
    if (progressTrack) {
      progressTrack.addEventListener("click", (e) => {
        const rect = progressTrack.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        stopWalkSimulation();
        updateWalkerPosition(ratio);
      });
    }

    const focusDestBtn = document.getElementById("card-focus-dest-btn");
    if (focusDestBtn) {
      focusDestBtn.addEventListener("click", () => {
        const poi = DATA.landmarks.find((p) => p.id === state.destinationId);
        if (poi) {
          map.flyTo(poi.coordinates, 18, { duration: 0.6 });
          if (markerById[poi.id]) markerById[poi.id].openPopup();
        }
      });
    }

    const copyRouteBtn = document.getElementById("card-share-route-btn");
    if (copyRouteBtn) {
      copyRouteBtn.addEventListener("click", () => {
        if (!state.activeRoute) return;
        const r = state.activeRoute;
        const text = `NED Route: ${r.sourcePoi?.shortName} -> ${r.targetPoi?.shortName} (${r.formattedDistance}, ${r.formattedTime})`;
        if (navigator.clipboard) navigator.clipboard.writeText(text);
        copyRouteBtn.textContent = "✓";
        setTimeout(() => (copyRouteBtn.textContent = "⎘"), 1400);
      });
    }

    document.querySelectorAll(".layer-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () =>
        switchMapLayer(btn.getAttribute("data-layer"))
      );
    });

    const opacitySlider = document.getElementById("masterplan-opacity-slider");
    if (opacitySlider) {
      opacitySlider.addEventListener("input", (e) => {
        if (masterPlanOverlay) masterPlanOverlay.setOpacity(parseFloat(e.target.value));
      });
    }

    const zoomInBtn = document.getElementById("map-zoom-in");
    const zoomOutBtn = document.getElementById("map-zoom-out");
    const recenterBtn = document.getElementById("map-recenter");
    if (zoomInBtn) zoomInBtn.addEventListener("click", () => map.zoomIn());
    if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => map.zoomOut());
    if (recenterBtn) {
      recenterBtn.addEventListener("click", () => {
        const center = window.innerWidth > 900 ? [24.9323, 67.1120] : DATA.meta.center;
        map.flyTo(center, 17, { duration: 0.65 });
      });
    }

    document.querySelectorAll(".dock-nav-btn").forEach((btn) => {
      btn.addEventListener("click", () =>
        activateTab(btn.getAttribute("data-tab-target"))
      );
    });

    const dragHandle = document.getElementById("drawer-drag-handle");
    const sidebarDrawer = document.getElementById("sidebar-drawer");
    if (dragHandle && sidebarDrawer) {
      dragHandle.addEventListener("click", () =>
        sidebarDrawer.classList.toggle("collapsed")
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
