# TraverseNED — Interactive Campus Navigation & Shortest-Path System

Interactive, production-ready web navigation system for **NED University of Engineering & Technology (Main Campus, Karachi)**.

## Features
- **Georeferenced Campus Map**: Key-free Esri World Topo & Satellite basemaps with an accurately calibrated Master Plan raster overlay.
- **Topological Pedestrian Routing**: $O((V+E)\log V)$ shortest-path pathfinding via $A^*$ and a Binary Min-Priority Queue.
- **Campus Directory**: Complete coverage of all 30 numbered blocks, sub-labs, sports complexes, libraries, hostels, and gates.
- **Turn-by-Turn Navigation & Guided Simulation**: Dynamic route polyline (`#2563EB`) with step directions and an interactive walking simulator.

## Tech Stack
- Client-side vanilla HTML5 / CSS3 / ES6 JavaScript
- [Leaflet.js](https://leafletjs.com/) (1.9.4)
- Deployed on Vercel

