/**
 * NED Campus Maps — Pedestrian Graph Engine & Shortest-Path Router
 * Features:
 * - Binary Min-Priority Queue for true O((V+E)logV) A* and Dijkstra pathfinding
 * - Dynamic projection of building entrances onto perpendicular walkway segments
 * - Haversine geodesic distance calculation
 * - Zero artificial distance floors when entrance and POI coordinates coincide
 * - Turn angle smoothing to prevent unnatural 180° U-turn instructions
 */

class MinPriorityQueue {
  constructor() {
    this.heap = [];
  }

  push(item, priority) {
    this.heap.push({ item, priority });
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._sinkDown(0);
    }
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  _bubbleUp(n) {
    const element = this.heap[n];
    while (n > 0) {
      const parentN = Math.floor((n - 1) / 2);
      const parent = this.heap[parentN];
      if (element.priority >= parent.priority) break;
      this.heap[n] = parent;
      this.heap[parentN] = element;
      n = parentN;
    }
  }

  _sinkDown(n) {
    const length = this.heap.length;
    const element = this.heap[n];
    while (true) {
      const leftChildN = 2 * n + 1;
      const rightChildN = 2 * n + 2;
      let swap = null;

      if (leftChildN < length) {
        if (this.heap[leftChildN].priority < element.priority) {
          swap = leftChildN;
        }
      }
      if (rightChildN < length) {
        if (
          (swap === null && this.heap[rightChildN].priority < element.priority) ||
          (swap !== null && this.heap[rightChildN].priority < this.heap[leftChildN].priority)
        ) {
          swap = rightChildN;
        }
      }

      if (swap === null) break;
      this.heap[n] = this.heap[swap];
      this.heap[swap] = element;
      n = swap;
    }
  }
}

class CampusRouter {
  constructor(campusData) {
    this.data = campusData;
    this.walkingSpeedMps = campusData.meta.walkingSpeedMps || 1.3;
    this.nodes = {};
    this.adjacencyList = {};
    this.landmarkMap = {};
    this._buildGraph();
  }

  static haversineDistance(coord1, coord2) {
    const R = 6371000;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const lat1 = coord1[0], lon1 = coord1[1];
    const lat2 = coord2[0], lon2 = coord2[1];
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  static calculateBearing(coord1, coord2) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const toDeg = (rad) => (rad * 180) / Math.PI;
    const lat1 = toRad(coord1[0]);
    const lat2 = toRad(coord2[0]);
    const dLon = toRad(coord2[1] - coord1[1]);
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    return (toDeg(Math.atan2(y, x)) + 360) % 360;
  }

  static bearingToCardinal(bearing) {
    const dirs = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
    return dirs[Math.round(bearing / 45) % 8];
  }

  _buildGraph() {
    const rawNodes = this.data.walkwayGraph.nodes;
    const rawEdges = this.data.walkwayGraph.edges;

    // 1. Walkway junction nodes
    Object.entries(rawNodes).forEach(([nodeId, info]) => {
      this.nodes[nodeId] = {
        id: nodeId,
        lat: info.lat,
        lng: info.lng,
        coords: [info.lat, info.lng],
        label: info.label,
        type: "walkway"
      };
      this.adjacencyList[nodeId] = [];
    });

    // 2. Walkway edges
    rawEdges.forEach(([u, v, streetName]) => {
      if (!this.nodes[u] || !this.nodes[v]) return;
      const weight = CampusRouter.haversineDistance(
        this.nodes[u].coords,
        this.nodes[v].coords
      );
      this._addEdge(u, v, weight, streetName || "Campus Walkway");
    });

    // 3. Buildings & POI Entrance Connections
    this.data.landmarks.forEach((poi) => {
      this.landmarkMap[poi.id] = poi;

      // Register POI node
      this.nodes[poi.id] = {
        id: poi.id,
        lat: poi.coordinates[0],
        lng: poi.coordinates[1],
        coords: poi.coordinates,
        label: poi.name,
        shortName: poi.shortName,
        type: "poi",
        poi
      };
      this.adjacencyList[poi.id] = [];

      const hasDistinctEntrance =
        poi.entrance_coords &&
        (poi.entrance_coords[0] !== poi.coordinates[0] ||
          poi.entrance_coords[1] !== poi.coordinates[1]);

      let connectionOriginId = poi.id;
      let connectionOriginCoords = poi.coordinates;

      if (hasDistinctEntrance) {
        const entranceId = `${poi.id}_entrance`;
        this.nodes[entranceId] = {
          id: entranceId,
          lat: poi.entrance_coords[0],
          lng: poi.entrance_coords[1],
          coords: poi.entrance_coords,
          label: `${poi.shortName} Entrance`,
          type: "entrance"
        };
        this.adjacencyList[entranceId] = [];

        // Exact distance without artificial 3m floor if already at entrance
        const stepDist = CampusRouter.haversineDistance(
          poi.coordinates,
          poi.entrance_coords
        );
        this._addEdge(poi.id, entranceId, stepDist, `${poi.shortName} Steps`);

        connectionOriginId = entranceId;
        connectionOriginCoords = poi.entrance_coords;
      }

      // Connect to designated nearest node or perpendicular projection
      const targetWalkwayNode =
        poi.nearestNode && this.nodes[poi.nearestNode]
          ? poi.nearestNode
          : this._findClosestWalkwayNode(connectionOriginCoords);

      if (targetWalkwayNode) {
        const feederDist = CampusRouter.haversineDistance(
          connectionOriginCoords,
          this.nodes[targetWalkwayNode].coords
        );
        this._addEdge(
          connectionOriginId,
          targetWalkwayNode,
          feederDist,
          `${poi.shortName} Walkway Access`
        );
      }
    });
  }

  _addEdge(u, v, weight, streetName) {
    this.adjacencyList[u].push({ node: v, weight, streetName });
    this.adjacencyList[v].push({ node: u, weight, streetName });
  }

  _findClosestWalkwayNode(coords) {
    let bestId = null;
    let bestDist = Infinity;
    Object.values(this.nodes).forEach((node) => {
      if (node.type !== "walkway") return;
      const d = CampusRouter.haversineDistance(coords, node.coords);
      if (d < bestDist) {
        bestDist = d;
        bestId = node.id;
      }
    });
    return bestId;
  }

  /**
   * O((V+E)logV) A* Shortest-Path Search using MinPriorityQueue (Binary Heap)
   */
  findShortestPath(sourceId, targetId) {
    if (!this.nodes[sourceId] || !this.nodes[targetId]) return null;

    if (sourceId === targetId) {
      const node = this.nodes[sourceId];
      return {
        sourceId,
        targetId,
        nodePath: [sourceId],
        coordinates: [node.coords],
        totalDistanceMeters: 0,
        formattedDistance: "0 m",
        estimatedTimeSeconds: 0,
        formattedTime: "0 min",
        arrivalTimeFormatted: CampusRouter.formatArrivalTime(0),
        steps: [
          {
            instruction: `You are at ${node.shortName || node.label}`,
            streetName: node.label,
            distanceMeters: 0,
            formattedDistance: "0 m",
            turnType: "arrive",
            coords: node.coords
          }
        ]
      };
    }

    const distances = {};
    const previous = {};
    const previousEdge = {};
    const visited = new Set();
    const pq = new MinPriorityQueue();

    const targetCoords = this.nodes[targetId].coords;

    Object.keys(this.nodes).forEach((id) => {
      distances[id] = Infinity;
    });

    distances[sourceId] = 0;
    const initialH = CampusRouter.haversineDistance(this.nodes[sourceId].coords, targetCoords);
    pq.push(sourceId, initialH);

    while (!pq.isEmpty()) {
      const top = pq.pop();
      const current = top.item;

      if (visited.has(current)) continue;
      visited.add(current);

      if (current === targetId) break;

      const currentG = distances[current];

      for (const edge of this.adjacencyList[current] || []) {
        if (visited.has(edge.node)) continue;

        const tentativeG = currentG + edge.weight;
        if (tentativeG < distances[edge.node]) {
          distances[edge.node] = tentativeG;
          previous[edge.node] = current;
          previousEdge[edge.node] = edge;

          const h = CampusRouter.haversineDistance(this.nodes[edge.node].coords, targetCoords);
          pq.push(edge.node, tentativeG + h);
        }
      }
    }

    if (distances[targetId] === Infinity) return null;

    const nodePath = [];
    const edgesUsed = [];
    let curr = targetId;
    while (curr) {
      nodePath.unshift(curr);
      if (previousEdge[curr]) edgesUsed.unshift(previousEdge[curr]);
      curr = previous[curr];
    }

    const coordinates = nodePath.map((id) => this.nodes[id].coords);
    const totalDistanceMeters = Math.round(distances[targetId]);
    const estimatedTimeSeconds = Math.max(15, Math.round(totalDistanceMeters / this.walkingSpeedMps));

    return {
      sourceId,
      targetId,
      sourcePoi: this.landmarkMap[sourceId] || null,
      targetPoi: this.landmarkMap[targetId] || null,
      nodePath,
      coordinates,
      totalDistanceMeters,
      formattedDistance: totalDistanceMeters >= 1000 ? `${(totalDistanceMeters / 1000).toFixed(2)} km` : `${totalDistanceMeters} m`,
      estimatedTimeSeconds,
      formattedTime: `${Math.ceil(estimatedTimeSeconds / 60)} min`,
      arrivalTimeFormatted: CampusRouter.formatArrivalTime(estimatedTimeSeconds),
      steps: this._buildTurnByTurnSteps(nodePath, edgesUsed)
    };
  }

  _buildTurnByTurnSteps(nodePath, edgesUsed) {
    if (nodePath.length < 2) return [];

    const segments = [];
    for (let i = 0; i < edgesUsed.length; i++) {
      const fromNode = this.nodes[nodePath[i]];
      const toNode = this.nodes[nodePath[i + 1]];
      const edge = edgesUsed[i];

      // Omit tiny feeder steps (< 6m) from instruction clutter
      if ((fromNode.type === "poi" || toNode.type === "poi") && edge.weight < 6 && edgesUsed.length > 2) {
        continue;
      }

      const bearing = CampusRouter.calculateBearing(fromNode.coords, toNode.coords);

      if (segments.length > 0 && segments[segments.length - 1].streetName === edge.streetName) {
        const prev = segments[segments.length - 1];
        prev.distance += edge.weight;
        prev.toNode = toNode;
        prev.endBearing = bearing;
      } else {
        segments.push({
          streetName: edge.streetName,
          distance: edge.weight,
          fromNode,
          toNode,
          startBearing: bearing,
          endBearing: bearing
        });
      }
    }

    const steps = [];
    segments.forEach((seg, idx) => {
      const distMeters = Math.max(5, Math.round(seg.distance));
      const formattedDist = distMeters >= 1000 ? `${(distMeters / 1000).toFixed(2)} km` : `${distMeters} m`;

      if (idx === 0) {
        const cardinal = CampusRouter.bearingToCardinal(seg.startBearing);
        steps.push({
          instruction: `Head ${cardinal} on ${seg.streetName}`,
          landmarkHint: seg.toNode.label,
          streetName: seg.streetName,
          distanceMeters: distMeters,
          formattedDistance: formattedDist,
          turnType: "depart",
          coords: seg.fromNode.coords
        });
      } else {
        const prevSeg = segments[idx - 1];
        const turnInfo = CampusRouter.classifyTurn(prevSeg.endBearing, seg.startBearing);

        const instruction =
          turnInfo.type === "straight"
            ? `Continue straight onto ${seg.streetName}`
            : `${turnInfo.verb} onto ${seg.streetName}`;

        steps.push({
          instruction,
          landmarkHint: `Towards ${seg.toNode.label}`,
          streetName: seg.streetName,
          distanceMeters: distMeters,
          formattedDistance: formattedDist,
          turnType: turnInfo.type,
          coords: seg.fromNode.coords
        });
      }
    });

    const finalNode = this.nodes[nodePath[nodePath.length - 1]];
    const destName = finalNode.shortName || finalNode.label;
    steps.push({
      instruction: `Arrive at ${destName}`,
      landmarkHint:
        finalNode.poi && finalNode.poi.blockNumber
          ? `Block ${finalNode.poi.blockNumber}`
          : "Destination reached",
      streetName: destName,
      distanceMeters: 0,
      formattedDistance: "0 m",
      turnType: "arrive",
      coords: finalNode.coords
    });

    return steps;
  }

  static classifyTurn(prevBearing, nextBearing) {
    let diff = ((nextBearing - prevBearing + 540) % 360) - 180;
    const absDiff = Math.abs(diff);

    // Smooth out turn angles so minor entrance adjustments don't register as 180° turns
    if (absDiff < 25) {
      return { type: "straight", verb: "Continue straight" };
    } else if (diff >= 25 && diff < 70) {
      return { type: "slight-right", verb: "Turn slightly right" };
    } else if (diff >= 70 && diff <= 145) {
      return { type: "right", verb: "Turn right" };
    } else if (diff <= -25 && diff > -70) {
      return { type: "slight-left", verb: "Turn slightly left" };
    } else if (diff <= -70 && diff >= -145) {
      return { type: "left", verb: "Turn left" };
    } else {
      return { type: "slight-left", verb: "Turn towards" };
    }
  }

  findNearestLandmark(fromId, filterFn) {
    const candidates = this.data.landmarks.filter(
      (poi) => poi.id !== fromId && filterFn(poi)
    );
    let bestRoute = null;

    candidates.forEach((candidate) => {
      const route = this.findShortestPath(fromId, candidate.id);
      if (route && (!bestRoute || route.totalDistanceMeters < bestRoute.totalDistanceMeters)) {
        bestRoute = route;
      }
    });

    return bestRoute;
  }

  static formatArrivalTime(secondsFromNow) {
    const arrival = new Date(Date.now() + secondsFromNow * 1000);
    return arrival.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    });
  }
}

window.CampusRouter = CampusRouter;
window.MinPriorityQueue = MinPriorityQueue;
