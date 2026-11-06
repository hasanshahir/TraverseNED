// js/tracker.js
class CampusTracker {
  constructor(map, router, options = {}) {
    this.map = map;
    this.router = router;
    this.onStatusChange = options.onStatusChange || (() => {});
    this.onLocationUpdate = options.onLocationUpdate || (() => {});

    // NED Main Campus Boundary Polygon [lat, lng]
    this.campusPolygon = [
      [24.9379, 67.1134], // North-East corner (behind sports complex)
      [24.9348, 67.1195], // East corner along University Road
      [24.9298, 67.1168], // Main Gate entrance on University Road
      [24.9265, 67.1112], // South-West corner (Admin/Staff Colony edge)
      [24.9312, 67.1062], // West corner (behind Boys Hostel)
      [24.9365, 67.1085]  // North-West boundary along KU fence
    ];

    this.watchId = null;
    this.userMarker = null;
    this.accuracyCircle = null;
    this.isInsideNed = false;
    this.currentCoords = null;
  }

  // Ray-Casting algorithm to check if point is inside campus polygon
  isPointInPolygon(point, polygon) {
    const [lat, lng] = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];

      const intersect = ((yi > lng) !== (yj > lng)) &&
        (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  startTracking() {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your device browser.");
      return;
    }

    const geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 10000
    };

    this.watchId = navigator.geolocation.watchPosition(
      (pos) => this._handlePosition(pos),
      (err) => console.warn(`GPS Warning (${err.code}): ${err.message}`),
      geoOptions
    );
  }

  stopTracking() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  _handlePosition(pos) {
    const { latitude, longitude, accuracy } = pos.coords;
    const rawCoords = [latitude, longitude];

    // Filter out degraded cellular/Wi-Fi drift
    if (accuracy > 40) return;

    this.currentCoords = rawCoords;
    const inside = this.isPointInPolygon(rawCoords, this.campusPolygon);

    if (inside !== this.isInsideNed) {
      this.isInsideNed = inside;
      this.onStatusChange(this.isInsideNed);
    }

    this._updateMapDisplay(rawCoords, accuracy);
    this.onLocationUpdate(rawCoords, this.isInsideNed);
  }

  _updateMapDisplay(coords, accuracy) {
    if (!this.userMarker) {
      // Pulsing blue dot for live position
      const pulseIcon = L.divIcon({
        className: "gps-pulse-wrapper",
        html: '<div class="gps-pulse"></div><div class="gps-dot"></div>',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      this.userMarker = L.marker(coords, { icon: pulseIcon, zIndexOffset: 1000 }).addTo(this.map);
      this.accuracyCircle = L.circle(coords, {
        radius: accuracy,
        color: "#3B82F6",
        fillColor: "#60A5FA",
        fillOpacity: 0.15,
        weight: 1
      }).addTo(this.map);
    } else {
      this.userMarker.setLatLng(coords);
      this.accuracyCircle.setLatLng(coords);
      this.accuracyCircle.setRadius(accuracy);
    }
  }

  recenter() {
    if (this.currentCoords) {
      this.map.flyTo(this.currentCoords, 18, { animate: true, duration: 0.8 });
    } else if (this.router && this.router.data && this.router.data.meta) {
      this.map.flyTo(this.router.data.meta.center, 17, { animate: true, duration: 0.8 });
    }
  }
}
window.CampusTracker = CampusTracker;
