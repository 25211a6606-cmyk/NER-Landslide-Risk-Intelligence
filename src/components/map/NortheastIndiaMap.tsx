import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Mountain,
  CloudRain,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Maximize2,
  Compass,
  Layers,
  Sparkles,
  Search,
  Filter,
  Eye,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { MonitoredLocation, NERState, RiskLevel } from '../../types/location';
import { NER_STATES_INFO } from '../../data/nerLocations';

interface NortheastIndiaMapProps {
  locations: MonitoredLocation[];
  selectedLocation: MonitoredLocation | null;
  onSelectLocation: (loc: MonitoredLocation) => void;
  selectedState?: NERState | 'ALL';
  onSelectState?: (state: NERState) => void;
  onNavigateToGis?: () => void;
  compact?: boolean;
}

// Geographic bounding box for the Northeast India projection
// Lng: 88.0 (West Sikkim) to 97.5 (East Arunachal) -> Width ~ 9.5 deg
// Lat: 21.8 (South Mizoram) to 29.5 (North Arunachal) -> Height ~ 7.7 deg
const MAP_BOUNDS = {
  minLng: 88.0,
  maxLng: 97.5,
  minLat: 21.8,
  maxLat: 29.5
};

// SVG Canvas dimensions
const SVG_WIDTH = 920;
const SVG_HEIGHT = 680;

// Coordinate transformation: Geodetic (Lat, Lng) to SVG pixels (x, y)
function projectGeoToSvg(lat: number, lng: number): { x: number; y: number } {
  const normX = (lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng);
  // Invert Y because latitude goes North (up) while SVG y goes down
  const normY = (MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat);

  // Apply slight Mercator padding and aspect correction
  const paddingX = 40;
  const paddingY = 40;
  const usableWidth = SVG_WIDTH - paddingX * 2;
  const usableHeight = SVG_HEIGHT - paddingY * 2;

  const x = paddingX + normX * usableWidth;
  const y = paddingY + normY * usableHeight;

  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

// Vector Polygons approximating the authentic borders of all 8 North-Eastern states
// with realistic mountain curves, river valleys, and international borders
interface StatePolygon {
  name: NERState;
  color: string;
  fillDefault: string;
  fillHover: string;
  centerCoords: [number, number];
  points: [number, number][]; // [lat, lng] array
}

const NER_STATE_POLYGONS: StatePolygon[] = [
  {
    name: 'Sikkim',
    color: '#10b981',
    fillDefault: 'rgba(16, 185, 129, 0.12)',
    fillHover: 'rgba(16, 185, 129, 0.28)',
    centerCoords: [27.533, 88.512],
    points: [
      [28.12, 88.55],
      [28.05, 88.88],
      [27.75, 88.92],
      [27.35, 88.85],
      [27.10, 88.62],
      [27.08, 88.15],
      [27.38, 88.08],
      [27.85, 88.18]
    ]
  },
  {
    name: 'Arunachal Pradesh',
    color: '#06b6d4',
    fillDefault: 'rgba(6, 182, 212, 0.12)',
    fillHover: 'rgba(6, 182, 212, 0.28)',
    centerCoords: [28.2, 94.5],
    points: [
      [27.45, 91.65],
      [27.85, 91.75],
      [28.02, 92.50],
      [28.75, 93.85],
      [29.25, 95.05],
      [29.45, 96.20],
      [28.85, 97.40],
      [27.85, 97.10],
      [27.45, 96.15],
      [27.05, 95.70],
      [27.25, 94.60],
      [27.85, 94.10],
      [27.30, 93.10],
      [26.95, 92.15]
    ]
  },
  {
    name: 'Assam',
    color: '#3b82f6',
    fillDefault: 'rgba(59, 130, 246, 0.12)',
    fillHover: 'rgba(59, 130, 246, 0.28)',
    centerCoords: [26.2, 92.8],
    points: [
      [26.95, 89.85],
      [26.85, 92.15],
      [27.30, 93.10],
      [27.85, 94.10],
      [27.25, 94.60],
      [27.50, 95.80],
      [27.15, 95.95],
      [26.85, 95.10],
      [26.50, 94.10],
      [26.05, 93.65],
      [25.85, 93.15],
      [25.05, 93.20],
      [24.50, 93.05],
      [24.70, 92.45],
      [25.10, 92.65],
      [25.95, 92.20],
      [26.05, 91.10],
      [25.85, 90.05],
      [26.05, 89.80]
    ]
  },
  {
    name: 'Meghalaya',
    color: '#8b5cf6',
    fillDefault: 'rgba(139, 92, 246, 0.12)',
    fillHover: 'rgba(139, 92, 246, 0.28)',
    centerCoords: [25.5, 91.3],
    points: [
      [26.05, 89.80],
      [26.05, 91.10],
      [25.95, 92.20],
      [25.50, 92.75],
      [25.15, 92.65],
      [25.10, 91.80],
      [25.12, 90.50],
      [25.25, 89.85]
    ]
  },
  {
    name: 'Nagaland',
    color: '#f59e0b',
    fillDefault: 'rgba(245, 158, 11, 0.12)',
    fillHover: 'rgba(245, 158, 11, 0.28)',
    centerCoords: [26.15, 94.5],
    points: [
      [26.85, 95.10],
      [27.05, 95.25],
      [26.75, 95.50],
      [26.20, 95.05],
      [25.55, 94.45],
      [25.60, 93.75],
      [26.05, 93.65],
      [26.50, 94.10]
    ]
  },
  {
    name: 'Manipur',
    color: '#ec4899',
    fillDefault: 'rgba(236, 72, 153, 0.12)',
    fillHover: 'rgba(236, 72, 153, 0.28)',
    centerCoords: [24.7, 93.9],
    points: [
      [25.55, 94.45],
      [25.35, 94.65],
      [24.75, 94.55],
      [24.15, 94.20],
      [23.85, 93.25],
      [24.25, 93.10],
      [24.50, 93.05],
      [25.05, 93.20],
      [25.60, 93.75]
    ]
  },
  {
    name: 'Mizoram',
    color: '#14b8a6',
    fillDefault: 'rgba(20, 184, 166, 0.12)',
    fillHover: 'rgba(20, 184, 166, 0.28)',
    centerCoords: [23.3, 92.8],
    points: [
      [24.50, 93.05],
      [24.25, 93.10],
      [23.85, 93.25],
      [23.25, 93.40],
      [22.35, 93.10],
      [21.90, 92.85],
      [22.25, 92.50],
      [23.45, 92.25],
      [24.25, 92.35],
      [24.70, 92.45]
    ]
  },
  {
    name: 'Tripura',
    color: '#eab308',
    fillDefault: 'rgba(234, 179, 8, 0.12)',
    fillHover: 'rgba(234, 179, 8, 0.28)',
    centerCoords: [23.8, 91.8],
    points: [
      [24.50, 92.15],
      [24.25, 92.35],
      [23.45, 92.25],
      [23.05, 91.95],
      [22.95, 91.45],
      [23.65, 91.15],
      [24.15, 91.35],
      [24.45, 91.85]
    ]
  }
];

// Major Rivers (Brahmaputra, Barak, Teesta) for geographic authenticity
const MAJOR_RIVERS: { name: string; points: [number, number][] }[] = [
  {
    name: 'Brahmaputra River',
    points: [
      [28.2, 95.8],
      [27.9, 95.3],
      [27.4, 94.8],
      [26.9, 93.8],
      [26.6, 92.8],
      [26.2, 91.7],
      [26.1, 90.4],
      [25.9, 89.8]
    ]
  },
  {
    name: 'Barak River',
    points: [
      [25.2, 93.5],
      [24.8, 93.1],
      [24.8, 92.8],
      [24.9, 92.4]
    ]
  },
  {
    name: 'Teesta River',
    points: [
      [28.0, 88.6],
      [27.6, 88.5],
      [27.1, 88.5]
    ]
  }
];

export const NortheastIndiaMap: React.FC<NortheastIndiaMapProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  selectedState = 'ALL',
  onSelectState,
  onNavigateToGis,
  compact = false
}) => {
  const [hoveredLocation, setHoveredLocation] = useState<MonitoredLocation | null>(null);
  const [hoveredState, setHoveredState] = useState<NERState | null>(null);
  const [activeFilterRisk, setActiveFilterRisk] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapLayerMode, setMapLayerMode] = useState<'STANDARD' | 'RAINFALL' | 'SUSCEPTIBILITY'>('STANDARD');
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Filter visible locations on the India NE map
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      if (selectedState !== 'ALL' && loc.state !== selectedState) return false;
      if (activeFilterRisk !== 'ALL' && loc.prediction.riskLevel !== activeFilterRisk) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = loc.name.toLowerCase().includes(q);
        const matchDist = loc.district.toLowerCase().includes(q);
        const matchState = loc.state.toLowerCase().includes(q);
        if (!matchName && !matchDist && !matchState) return false;
      }
      return true;
    });
  }, [locations, selectedState, activeFilterRisk, searchQuery]);

  // Track cursor position for dynamic floating tooltip
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Convert state points array to SVG path 'd' attribute
  const generatePolygonPath = (points: [number, number][]) => {
    if (points.length === 0) return '';
    const start = projectGeoToSvg(points[0][0], points[0][1]);
    let path = `M ${start.x} ${start.y}`;
    for (let i = 1; i < points.length; i++) {
      const pt = projectGeoToSvg(points[i][0], points[i][1]);
      path += ` L ${pt.x} ${pt.y}`;
    }
    path += ' Z';
    return path;
  };

  // Convert river points array to smooth SVG curve path
  const generateRiverPath = (points: [number, number][]) => {
    if (points.length === 0) return '';
    const start = projectGeoToSvg(points[0][0], points[0][1]);
    let path = `M ${start.x} ${start.y}`;
    for (let i = 1; i < points.length; i++) {
      const pt = projectGeoToSvg(points[i][0], points[i][1]);
      path += ` L ${pt.x} ${pt.y}`;
    }
    return path;
  };

  // Find highest risk level in state
  const getStateRiskLevel = (stateName: NERState): RiskLevel => {
    const stateLocs = locations.filter((l) => l.state === stateName);
    if (stateLocs.some((l) => l.prediction.riskLevel === 'WARNING')) return 'WARNING';
    if (stateLocs.some((l) => l.prediction.riskLevel === 'WATCH')) return 'WATCH';
    return 'NORMAL';
  };

  // Handle clicking directly on the SVG map area (closest location resolution)
  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    // Check if clicked directly on background
    const target = e.target as HTMLElement;
    if (target.tagName === 'circle' || target.tagName === 'text') return; // Handled by marker

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Inverse calculate normalized geo coordinates
    const paddingX = 40;
    const paddingY = 40;
    const usableWidth = SVG_WIDTH - paddingX * 2;
    const usableHeight = SVG_HEIGHT - paddingY * 2;

    const normX = Math.max(0, Math.min(1, (clickX - paddingX) / usableWidth));
    const normY = Math.max(0, Math.min(1, (clickY - paddingY) / usableHeight));

    const clickedLng = MAP_BOUNDS.minLng + normX * (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng);
    const clickedLat = MAP_BOUNDS.maxLat - normY * (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat);

    // Find nearest place in locations
    let nearestLoc: MonitoredLocation | null = null;
    let minDistance = Infinity;

    locations.forEach((loc) => {
      const dLat = loc.latitude - clickedLat;
      const dLng = loc.longitude - clickedLng;
      const dist = Math.sqrt(dLat * dLat + dLng * dLng);
      if (dist < minDistance) {
        minDistance = dist;
        nearestLoc = loc;
      }
    });

    if (nearestLoc && minDistance < 1.2) {
      onSelectLocation(nearestLoc);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden text-slate-100">
      {/* Top Header / Interactive Navigation Bar */}
      <div className="p-3 md:p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/70">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base font-bold text-white tracking-wide">
                Interactive India Map • North-East Region
              </h2>
              <span className="px-2 py-0.5 bg-cyan-950 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono rounded font-bold">
                8 States • 38 Monitored Sites
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Tap any state, district corridor, or place marker to immediately open its live hazard intelligence.
            </p>
          </div>
        </div>

        {/* Action Controls & Layer Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer Mode Switch */}
          <div className="flex bg-slate-900 border border-slate-700/80 rounded-lg p-0.5 text-xs font-mono">
            <button
              onClick={() => setMapLayerMode('STANDARD')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
                mapLayerMode === 'STANDARD'
                  ? 'bg-emerald-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              Risk Sites
            </button>
            <button
              onClick={() => setMapLayerMode('RAINFALL')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
                mapLayerMode === 'RAINFALL'
                  ? 'bg-cyan-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CloudRain className="w-3 h-3" />
              24h Rain
            </button>
            <button
              onClick={() => setMapLayerMode('SUSCEPTIBILITY')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
                mapLayerMode === 'SUSCEPTIBILITY'
                  ? 'bg-amber-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mountain className="w-3 h-3" />
              Terrain Slope
            </button>
          </div>

          {/* Risk Filter */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1 text-xs">
            <Filter className="w-3 h-3 text-slate-400" />
            <select
              value={activeFilterRisk}
              onChange={(e) => setActiveFilterRisk(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs cursor-pointer font-mono"
            >
              <option value="ALL">All Risk ({locations.length})</option>
              <option value="WARNING">Warning Only ({locations.filter((l) => l.prediction.riskLevel === 'WARNING').length})</option>
              <option value="WATCH">Watch Only ({locations.filter((l) => l.prediction.riskLevel === 'WATCH').length})</option>
              <option value="NORMAL">Normal ({locations.filter((l) => l.prediction.riskLevel === 'NORMAL').length})</option>
            </select>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Find place or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-36 md:w-44 bg-slate-950 border border-slate-700 rounded-lg pl-6 pr-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Open in Full GIS Map */}
          {onNavigateToGis && (
            <button
              onClick={onNavigateToGis}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all active:scale-95"
              title="Open full GIS satellite map"
            >
              <Maximize2 className="w-3 h-3 text-emerald-400" />
              GIS Satellite
            </button>
          )}
        </div>
      </div>

      {/* 8 State Quick-Tap Badges Strip */}
      <div className="px-3 py-1.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
        <span className="text-[10px] font-mono text-slate-500 uppercase font-bold shrink-0 mr-1 flex items-center gap-1">
          <Navigation className="w-3 h-3 text-emerald-400" />
          States:
        </span>
        <button
          onClick={() => onSelectState && onSelectState('ALL' as any)}
          className={`px-2 py-0.5 rounded text-[11px] font-mono shrink-0 transition-all ${
            selectedState === 'ALL'
              ? 'bg-emerald-600 text-white font-bold shadow-sm'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          All 8 States ({locations.length})
        </button>
        {NER_STATE_POLYGONS.map((st) => {
          const isSelected = selectedState === st.name;
          const risk = getStateRiskLevel(st.name);
          const badgeRiskColor =
            risk === 'WARNING'
              ? 'border-rose-500/60 text-rose-300'
              : risk === 'WATCH'
              ? 'border-amber-500/60 text-amber-300'
              : 'border-slate-800 text-slate-400';

          return (
            <button
              key={st.name}
              onClick={() => onSelectState && onSelectState(st.name)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono shrink-0 border transition-all flex items-center gap-1 ${
                isSelected
                  ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold ring-1 ring-emerald-500/40'
                  : `bg-slate-900/80 ${badgeRiskColor} hover:bg-slate-800 hover:text-slate-200`
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  risk === 'WARNING'
                    ? 'bg-rose-500 animate-pulse'
                    : risk === 'WATCH'
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
              />
              {st.name}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Geographic SVG Canvas Area */}
      <div className="relative flex-1 min-h-[420px] md:min-h-[500px] w-full bg-[#070d18] overflow-hidden flex items-center justify-center select-none">
        {/* Subtle Grid Lines & Geographic Graticule */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Geographic Subcontinent SVG Container */}
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-full max-h-[640px] cursor-crosshair relative z-10"
          onMouseMove={handleMouseMove}
          onClick={handleMapClick}
        >
          <defs>
            {/* Glow Filters for WARNING and Active Pulses */}
            <filter id="pulseGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Pattern for Terrain Elevation Hatching */}
            <pattern id="elevationHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#334155" strokeWidth="0.8" opacity="0.4" />
            </pattern>

            {/* Radial Gradient for Selected Focus Halo */}
            <radialGradient id="selectHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. International Border Context Labeling (Bhutan, China/Tibet, Myanmar, Bangladesh) */}
          <g className="text-[10px] font-mono fill-slate-600 font-bold select-none tracking-widest">
            <text x="140" y="240" opacity="0.6">BHUTAN</text>
            <text x="560" y="70" opacity="0.6">TIBET / CHINA</text>
            <text x="760" y="440" opacity="0.6">MYANMAR</text>
            <text x="260" y="580" opacity="0.6">BANGLADESH</text>
            <text x="40" y="380" opacity="0.6">WEST BENGAL</text>
          </g>

          {/* 2. Major River Systems (Brahmaputra, Barak, Teesta) */}
          <g className="rivers" pointerEvents="none">
            {MAJOR_RIVERS.map((river, idx) => (
              <g key={idx}>
                <path
                  d={generateRiverPath(river.points)}
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={generateRiverPath(river.points)}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeOpacity="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            ))}
          </g>

          {/* 3. State Polygons with Interactive Hover & Tapping */}
          <g className="states-layer">
            {NER_STATE_POLYGONS.map((poly) => {
              const isSelectedState = selectedState === poly.name;
              const isHoveredState = hoveredState === poly.name;
              const riskLevel = getStateRiskLevel(poly.name);
              const pathD = generatePolygonPath(poly.points);
              const center = projectGeoToSvg(poly.centerCoords[0], poly.centerCoords[1]);

              // Dynamic fill color according to active layer mode
              let fillColor = poly.fillDefault;
              if (isSelectedState || isHoveredState) {
                fillColor = poly.fillHover;
              } else if (mapLayerMode === 'RAINFALL') {
                const avgRain = NER_STATES_INFO[poly.name]?.averageRainfallToday || 40;
                fillColor = avgRain >= 60 ? 'rgba(6, 182, 212, 0.25)' : 'rgba(59, 130, 246, 0.12)';
              } else if (mapLayerMode === 'SUSCEPTIBILITY') {
                fillColor = riskLevel === 'WARNING' ? 'rgba(239, 68, 68, 0.18)' : 'rgba(245, 158, 11, 0.12)';
              }

              const strokeColor = isSelectedState
                ? '#10b981'
                : isHoveredState
                ? '#38bdf8'
                : poly.color;

              return (
                <g
                  key={poly.name}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredState(poly.name)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectState) onSelectState(poly.name);
                  }}
                >
                  {/* State Boundary Polygon */}
                  <path
                    d={pathD}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelectedState ? 2.5 : isHoveredState ? 2 : 1.2}
                    strokeDasharray={isSelectedState ? undefined : '5, 3'}
                    className="transition-all duration-200"
                  />

                  {/* State Name Label in Center */}
                  <text
                    x={center.x}
                    y={center.y}
                    textAnchor="middle"
                    className="font-mono text-[11px] md:text-xs font-extrabold fill-slate-300 pointer-events-none drop-shadow"
                    style={{
                      fill: isSelectedState ? '#34d399' : '#e2e8f0',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {poly.name}
                  </text>

                  {/* Small State Capital / Place count sub-label */}
                  <text
                    x={center.x}
                    y={center.y + 13}
                    textAnchor="middle"
                    className="font-mono text-[9px] fill-slate-400 pointer-events-none"
                  >
                    {locations.filter((l) => l.state === poly.name).length} Sites
                  </text>
                </g>
              );
            })}
          </g>

          {/* 4. Monitored Places Pins & Hazard Status Rings */}
          <g className="places-layer">
            {filteredLocations.map((loc) => {
              const { x, y } = projectGeoToSvg(loc.latitude, loc.longitude);
              const isSelected = selectedLocation?.id === loc.id;
              const isHovered = hoveredLocation?.id === loc.id;
              const isWarning = loc.prediction.riskLevel === 'WARNING';
              const isWatch = loc.prediction.riskLevel === 'WATCH';

              const pinFill = isWarning ? '#ef4444' : isWatch ? '#f59e0b' : '#10b981';
              const pinRadius = isSelected ? 9 : isHovered ? 8 : isWarning ? 6.5 : 5.5;

              return (
                <g
                  key={loc.id}
                  className="cursor-pointer transition-transform duration-150"
                  onMouseEnter={() => setHoveredLocation(loc)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectLocation(loc);
                  }}
                >
                  {/* Pulsing Warning Radar Ring */}
                  {isWarning && (
                    <circle
                      cx={x}
                      cy={y}
                      r={18}
                      fill="rgba(239, 68, 68, 0.25)"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeDasharray="3, 3"
                      className="animate-ping origin-center"
                      filter="url(#pulseGlow)"
                    />
                  )}

                  {/* Selected Highlight Halo */}
                  {isSelected && (
                    <circle
                      cx={x}
                      cy={y}
                      r={24}
                      fill="url(#selectHalo)"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeDasharray="2, 2"
                    />
                  )}

                  {/* Outer Pin Border Ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r={pinRadius + 2}
                    fill="#0f172a"
                    stroke={isSelected ? '#38bdf8' : isHovered ? '#ffffff' : pinFill}
                    strokeWidth={isSelected ? 2 : 1.2}
                  />

                  {/* Core Status Pin Marker */}
                  <circle
                    cx={x}
                    cy={y}
                    r={pinRadius}
                    fill={pinFill}
                    stroke="#ffffff"
                    strokeWidth={0.8}
                    filter={isWarning ? 'url(#pulseGlow)' : undefined}
                  />

                  {/* Place Name Tag (Shown for Warning, Selected, or Hovered) */}
                  {(isWarning || isSelected || isHovered) && (
                    <g pointerEvents="none" className="transition-opacity">
                      {/* Background Pill */}
                      <rect
                        x={x + 10}
                        y={y - 12}
                        width={loc.name.length * 6.5 + 24}
                        height={18}
                        rx={4}
                        fill="#020617"
                        stroke={isWarning ? '#ef4444' : isSelected ? '#38bdf8' : '#334155'}
                        strokeWidth="1"
                        opacity="0.95"
                      />
                      {/* Place Text */}
                      <text
                        x={x + 14}
                        y={y + 1}
                        className="font-sans text-[10px] font-bold fill-white"
                      >
                        {loc.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* Compass Rose Indicator */}
          <g transform="translate(840, 70)" className="select-none pointer-events-none">
            <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <polygon points="0,-16 4,-4 0,0 -4,-4" fill="#ef4444" />
            <polygon points="0,16 4,4 0,0 -4,4" fill="#94a3b8" />
            <text x="0" y="-18" textAnchor="middle" className="font-mono text-[9px] font-extrabold fill-rose-400">N</text>
            <text x="18" y="3" textAnchor="middle" className="font-mono text-[8px] fill-slate-400">E</text>
          </g>
        </svg>

        {/* Interactive Floating Hover Popover (When cursor hovers over any place) */}
        {hoveredLocation && (
          <div
            className="absolute z-30 pointer-events-none p-3 rounded-xl bg-slate-950/95 border border-emerald-500/50 shadow-2xl space-y-1.5 max-w-[260px] animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
            style={{
              left: Math.min(mousePos.x + 16, SVG_WIDTH - 240),
              top: Math.max(10, mousePos.y - 100)
            }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                {hoveredLocation.district}, {hoveredLocation.state}
              </span>
              <span
                className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                  hoveredLocation.prediction.riskLevel === 'WARNING'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : hoveredLocation.prediction.riskLevel === 'WATCH'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {hoveredLocation.prediction.riskLevel} ({hoveredLocation.prediction.riskScore}/100)
              </span>
            </div>

            <div className="text-xs font-bold text-white flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              {hoveredLocation.name}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1 text-slate-300">
              <div>
                <span className="text-slate-500 block">Slope Angle</span>
                <span className="font-bold text-amber-300">{hoveredLocation.environmental.slope.toFixed(1)}°</span>
              </div>
              <div>
                <span className="text-slate-500 block">24h Rain</span>
                <span className="font-bold text-cyan-300">{hoveredLocation.rainfall.today} mm</span>
              </div>
            </div>

            <div className="text-[9px] text-emerald-400 pt-1 font-mono flex items-center gap-1">
              <span>👉 Click to open complete place telemetry</span>
            </div>
          </div>
        )}

        {/* Selected Place Bottom Action Bar (When a place is currently active) */}
        {selectedLocation && (
          <div className="absolute bottom-3 left-3 right-3 md:left-auto md:right-3 md:w-96 p-3 rounded-xl bg-slate-950/90 border border-emerald-500/40 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 z-20 animate-in slide-in-from-bottom-2 duration-200">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    selectedLocation.prediction.riskLevel === 'WARNING'
                      ? 'bg-rose-500 animate-pulse'
                      : selectedLocation.prediction.riskLevel === 'WATCH'
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`}
                />
                <h4 className="text-xs font-bold text-white truncate">{selectedLocation.name}</h4>
                <span className="text-[10px] font-mono text-slate-400">
                  ({selectedLocation.state})
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                Score: <strong className="text-cyan-400">{selectedLocation.prediction.riskScore}/100</strong> • Slope:{' '}
                <strong>{selectedLocation.environmental.slope}°</strong> • Rain:{' '}
                <strong>{selectedLocation.rainfall.today}mm</strong>
              </p>
            </div>

            <button
              onClick={() => onSelectLocation(selectedLocation)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold font-mono shrink-0 shadow-lg shadow-emerald-950 transition-all active:scale-95 flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              Place Details
            </button>
          </div>
        )}
      </div>

      {/* Map Footer Summary Legend */}
      <div className="p-2.5 md:p-3 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="font-bold text-slate-300">Map Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-rose-500/30" />
            <span>Warning (&ge; 70)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
            <span>Watch (40-69)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30" />
            <span>Normal (&lt; 40)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-cyan-400" />
            <span>Major River Corridors</span>
          </div>
        </div>

        <div className="text-slate-500">
          Tip: Tap any state polygon to filter places or tap any point to select nearest place
        </div>
      </div>
    </div>
  );
};
