import React, { useState, useMemo } from 'react';
import {
  Layers,
  MapPin,
  Compass,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  ArrowRight,
  Shield,
  Eye,
  Info,
  Sliders,
  Filter,
  Flame,
  CloudRain,
  Mountain,
  Navigation,
  Sun,
  Moon
} from 'lucide-react';
import { MonitoredLocation, NERState } from '../../types/location';

interface WholeIndiaMapProps {
  locations: MonitoredLocation[];
  selectedLocation: MonitoredLocation | null;
  onSelectLocation: (location: MonitoredLocation) => void;
  selectedState?: NERState | 'ALL';
  onSelectState?: (state: NERState | 'ALL') => void;
  onNavigateToGis?: () => void;
  isLightMode?: boolean;
}

// Coordinate projection bounding box for Whole India (Lat: 8.0°N to 37.5°N, Lon: 68.0°E to 97.5°E)
const MAP_CONFIG = {
  minLon: 68.0,
  maxLon: 97.5,
  minLat: 8.0,
  maxLat: 37.5,
  svgWidth: 1000,
  svgHeight: 1050
};

// Convert Geographic Coordinates [longitude, latitude] to SVG (X, Y)
export function projectGeoToSvg(
  lon: number,
  lat: number,
  viewMode: 'ALL_INDIA' | 'NORTHEAST' | 'NORTH_HIMALAYA' = 'ALL_INDIA'
): [number, number] {
  if (viewMode === 'NORTHEAST') {
    // Zoom focus on North-East India (Lon 88 to 97.5, Lat 21.5 to 29.5)
    const neMinLon = 88.0;
    const neMaxLon = 97.5;
    const neMinLat = 21.5;
    const neMaxLat = 29.5;
    const x = ((lon - neMinLon) / (neMaxLon - neMinLon)) * MAP_CONFIG.svgWidth;
    const y = ((neMaxLat - lat) / (neMaxLat - neMinLat)) * MAP_CONFIG.svgHeight;
    return [x, y];
  }

  // Standard Whole India Albers/Equirectangular-like SVG projection
  const x = ((lon - MAP_CONFIG.minLon) / (MAP_CONFIG.maxLon - MAP_CONFIG.minLon)) * MAP_CONFIG.svgWidth;
  const y = ((MAP_CONFIG.maxLat - lat) / (MAP_CONFIG.maxLat - MAP_CONFIG.minLat)) * MAP_CONFIG.svgHeight;
  return [x, y];
}

// Indian States and Union Territories Geo Boundary Polygons
export interface StateBoundary {
  id: string;
  name: string;
  isNER: boolean;
  nerStateKey?: NERState;
  zone: 'North' | 'South' | 'East' | 'West' | 'Central' | 'NorthEast';
  center: [number, number]; // [lon, lat]
  pathCoords: [number, number][]; // Array of [lon, lat] points
}

export const ALL_INDIA_STATES: StateBoundary[] = [
  // 1. Jammu & Kashmir and Ladakh (Northern Himalayas)
  {
    id: 'JK_LADAKH',
    name: 'Jammu, Kashmir & Ladakh',
    isNER: false,
    zone: 'North',
    center: [76.5, 34.2],
    pathCoords: [
      [74.0, 36.8], [75.5, 37.1], [77.5, 36.0], [79.5, 35.5], [79.2, 33.0],
      [78.0, 32.5], [76.2, 32.8], [74.5, 33.2], [73.8, 34.5], [74.0, 36.8]
    ]
  },
  // 2. Himachal Pradesh (Western Himalayas - High Landslide Zone)
  {
    id: 'HP',
    name: 'Himachal Pradesh',
    isNER: false,
    zone: 'North',
    center: [77.2, 31.8],
    pathCoords: [
      [76.2, 32.8], [78.0, 32.5], [78.8, 31.5], [77.8, 30.8], [76.5, 31.2],
      [75.8, 32.2], [76.2, 32.8]
    ]
  },
  // 3. Punjab
  {
    id: 'PB',
    name: 'Punjab',
    isNER: false,
    zone: 'North',
    center: [75.4, 31.0],
    pathCoords: [
      [74.5, 32.2], [75.8, 32.2], [76.5, 31.2], [76.8, 30.5], [75.5, 29.8],
      [74.2, 30.2], [74.5, 32.2]
    ]
  },
  // 4. Uttarakhand (Himalayan Hazard Zone)
  {
    id: 'UK',
    name: 'Uttarakhand',
    isNER: false,
    zone: 'North',
    center: [79.2, 30.2],
    pathCoords: [
      [77.8, 30.8], [78.8, 31.5], [80.5, 31.0], [81.0, 29.8], [79.8, 28.9],
      [78.5, 29.6], [77.8, 30.8]
    ]
  },
  // 5. Haryana & Delhi NCR
  {
    id: 'HR_DL',
    name: 'Haryana & Delhi NCR',
    isNER: false,
    zone: 'North',
    center: [76.8, 29.0],
    pathCoords: [
      [75.5, 29.8], [76.8, 30.5], [77.4, 29.8], [77.3, 28.2], [76.5, 27.9],
      [75.2, 28.5], [75.5, 29.8]
    ]
  },
  // 6. Rajasthan (Western Region)
  {
    id: 'RJ',
    name: 'Rajasthan',
    isNER: false,
    zone: 'West',
    center: [73.5, 26.5],
    pathCoords: [
      [74.2, 30.2], [75.2, 28.5], [76.5, 27.9], [77.5, 27.2], [77.0, 25.5],
      [75.5, 24.5], [74.0, 24.2], [72.5, 24.8], [70.5, 26.2], [70.0, 28.0],
      [72.5, 29.8], [74.2, 30.2]
    ]
  },
  // 7. Uttar Pradesh (Northern Plains)
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    isNER: false,
    zone: 'North',
    center: [80.5, 27.0],
    pathCoords: [
      [77.4, 29.8], [78.5, 29.6], [79.8, 28.9], [81.0, 28.5], [83.5, 27.5],
      [84.5, 26.5], [83.8, 24.8], [82.5, 24.2], [80.5, 24.8], [78.5, 25.5],
      [77.5, 27.2], [77.4, 29.8]
    ]
  },
  // 8. Bihar
  {
    id: 'BR',
    name: 'Bihar',
    isNER: false,
    zone: 'East',
    center: [85.5, 25.8],
    pathCoords: [
      [83.5, 27.5], [85.0, 27.5], [87.5, 26.8], [88.2, 26.0], [87.8, 24.8],
      [86.0, 24.5], [83.8, 24.8], [84.5, 26.5], [83.5, 27.5]
    ]
  },
  // 9. West Bengal (including Darjeeling / Himalayan foothills & Siliguri Corridor to NER)
  {
    id: 'WB',
    name: 'West Bengal',
    isNER: false,
    zone: 'East',
    center: [87.8, 23.5],
    pathCoords: [
      [88.2, 27.2], [88.9, 27.1], [89.8, 26.5], [89.0, 25.8], [88.5, 24.8],
      [88.8, 22.8], [88.2, 21.6], [87.0, 21.8], [86.8, 23.2], [87.8, 24.8],
      [88.2, 26.0], [88.2, 27.2]
    ]
  },
  // 10. Gujarat
  {
    id: 'GJ',
    name: 'Gujarat',
    isNER: false,
    zone: 'West',
    center: [71.5, 22.5],
    pathCoords: [
      [70.5, 24.2], [72.5, 24.8], [73.5, 23.8], [73.8, 21.5], [72.8, 20.8],
      [71.5, 21.0], [69.2, 22.2], [68.8, 23.5], [70.5, 24.2]
    ]
  },
  // 11. Madhya Pradesh (Central India)
  {
    id: 'MP',
    name: 'Madhya Pradesh',
    isNER: false,
    zone: 'Central',
    center: [78.2, 23.5],
    pathCoords: [
      [75.5, 24.5], [77.0, 25.5], [78.5, 25.5], [80.5, 24.8], [82.5, 24.2],
      [82.2, 22.5], [80.8, 21.8], [78.5, 21.5], [75.8, 21.5], [74.5, 22.8],
      [75.5, 24.5]
    ]
  },
  // 12. Jharkhand
  {
    id: 'JH',
    name: 'Jharkhand',
    isNER: false,
    zone: 'East',
    center: [85.5, 23.6],
    pathCoords: [
      [83.8, 24.8], [86.0, 24.5], [87.8, 24.8], [86.8, 23.2], [86.5, 22.2],
      [84.5, 22.4], [83.8, 24.8]
    ]
  },
  // 13. Odisha
  {
    id: 'OD',
    name: 'Odisha',
    isNER: false,
    zone: 'East',
    center: [84.5, 20.5],
    pathCoords: [
      [86.5, 22.2], [87.0, 21.8], [86.5, 20.0], [85.0, 19.2], [83.5, 18.5],
      [82.5, 19.0], [82.8, 21.0], [84.5, 22.4], [86.5, 22.2]
    ]
  },
  // 14. Chhattisgarh
  {
    id: 'CG',
    name: 'Chhattisgarh',
    isNER: false,
    zone: 'Central',
    center: [82.0, 21.2],
    pathCoords: [
      [82.5, 24.2], [83.8, 23.5], [84.5, 22.4], [82.8, 21.0], [81.5, 18.5],
      [80.5, 19.5], [80.8, 21.8], [82.2, 22.5], [82.5, 24.2]
    ]
  },
  // 15. Maharashtra
  {
    id: 'MH',
    name: 'Maharashtra',
    isNER: false,
    zone: 'West',
    center: [75.8, 19.5],
    pathCoords: [
      [73.8, 21.5], [75.8, 21.5], [78.5, 21.5], [80.8, 21.8], [80.5, 19.5],
      [78.5, 18.2], [76.5, 17.5], [74.5, 16.0], [73.2, 16.8], [72.8, 19.5],
      [73.8, 21.5]
    ]
  },
  // 16. Goa
  {
    id: 'GA',
    name: 'Goa',
    isNER: false,
    zone: 'West',
    center: [74.0, 15.3],
    pathCoords: [
      [73.8, 15.8], [74.3, 15.7], [74.2, 14.9], [73.7, 15.0], [73.8, 15.8]
    ]
  },
  // 17. Karnataka
  {
    id: 'KA',
    name: 'Karnataka',
    isNER: false,
    zone: 'South',
    center: [75.8, 14.5],
    pathCoords: [
      [74.5, 16.0], [76.5, 17.5], [77.5, 16.5], [77.8, 14.5], [77.2, 12.8],
      [76.2, 11.8], [74.8, 12.5], [74.2, 14.9], [74.5, 16.0]
    ]
  },
  // 18. Telangana
  {
    id: 'TS',
    name: 'Telangana',
    isNER: false,
    zone: 'South',
    center: [79.0, 17.8],
    pathCoords: [
      [78.5, 18.2], [80.5, 19.5], [81.0, 18.0], [80.5, 16.8], [78.8, 16.2],
      [77.5, 16.5], [78.5, 18.2]
    ]
  },
  // 19. Andhra Pradesh
  {
    id: 'AP',
    name: 'Andhra Pradesh',
    isNER: false,
    zone: 'South',
    center: [80.0, 15.8],
    pathCoords: [
      [83.5, 18.5], [82.5, 16.8], [80.5, 15.8], [80.2, 13.5], [78.5, 13.5],
      [77.8, 14.5], [78.8, 16.2], [80.5, 16.8], [81.0, 18.0], [82.5, 19.0],
      [83.5, 18.5]
    ]
  },
  // 20. Kerala (Western Ghats Landslide Sensitive Zone)
  {
    id: 'KL',
    name: 'Kerala',
    isNER: false,
    zone: 'South',
    center: [76.5, 10.2],
    pathCoords: [
      [74.8, 12.5], [76.2, 11.8], [76.8, 10.5], [77.2, 9.2], [77.4, 8.3],
      [76.8, 8.5], [76.0, 9.8], [75.2, 11.5], [74.8, 12.5]
    ]
  },
  // 21. Tamil Nadu
  {
    id: 'TN',
    name: 'Tamil Nadu',
    isNER: false,
    zone: 'South',
    center: [78.5, 11.0],
    pathCoords: [
      [77.2, 12.8], [78.5, 13.5], [80.2, 13.5], [79.8, 10.5], [79.2, 9.2],
      [77.8, 8.2], [77.4, 8.3], [77.2, 9.2], [76.8, 10.5], [76.2, 11.8],
      [77.2, 12.8]
    ]
  },

  // ==========================================
  // 8 NORTH-EASTERN REGION STATES (NER FOCUS)
  // ==========================================

  // 22. Sikkim (Himalayan High Risk Zone)
  {
    id: 'SK',
    name: 'Sikkim',
    isNER: true,
    nerStateKey: 'Sikkim',
    zone: 'NorthEast',
    center: [88.5, 27.6],
    pathCoords: [
      [88.1, 28.1], [88.8, 28.1], [88.9, 27.5], [88.6, 27.1], [88.1, 27.2], [88.1, 28.1]
    ]
  },
  // 23. Arunachal Pradesh
  {
    id: 'AR',
    name: 'Arunachal Pradesh',
    isNER: true,
    nerStateKey: 'Arunachal Pradesh',
    zone: 'NorthEast',
    center: [94.5, 28.2],
    pathCoords: [
      [91.8, 27.5], [92.5, 28.2], [94.0, 28.8], [96.0, 28.9], [97.3, 28.2],
      [97.0, 27.5], [95.8, 27.2], [94.2, 27.4], [93.2, 27.0], [92.0, 26.9],
      [91.8, 27.5]
    ]
  },
  // 24. Assam (Central Brahmaputra Valley)
  {
    id: 'AS',
    name: 'Assam',
    isNER: true,
    nerStateKey: 'Assam',
    zone: 'NorthEast',
    center: [92.8, 26.2],
    pathCoords: [
      [89.8, 26.5], [90.5, 26.8], [92.0, 26.9], [93.2, 27.0], [94.2, 27.4],
      [95.8, 27.2], [95.5, 26.5], [94.0, 26.0], [93.2, 25.5], [92.8, 25.0],
      [92.2, 25.5], [91.0, 25.8], [89.9, 25.9], [89.8, 26.5]
    ]
  },
  // 25. Meghalaya (Shillong Plateau - Rainiest Region)
  {
    id: 'ML',
    name: 'Meghalaya',
    isNER: true,
    nerStateKey: 'Meghalaya',
    zone: 'NorthEast',
    center: [91.4, 25.5],
    pathCoords: [
      [89.9, 25.9], [91.0, 25.8], [92.2, 25.5], [92.6, 25.2], [92.2, 25.0],
      [91.0, 25.1], [89.8, 25.2], [89.9, 25.9]
    ]
  },
  // 26. Nagaland
  {
    id: 'NL',
    name: 'Nagaland',
    isNER: true,
    nerStateKey: 'Nagaland',
    zone: 'NorthEast',
    center: [94.4, 26.0],
    pathCoords: [
      [93.8, 26.6], [94.8, 26.9], [95.2, 26.4], [94.5, 25.5], [93.6, 25.6], [93.8, 26.6]
    ]
  },
  // 27. Manipur
  {
    id: 'MN',
    name: 'Manipur',
    isNER: true,
    nerStateKey: 'Manipur',
    zone: 'NorthEast',
    center: [93.9, 24.8],
    pathCoords: [
      [93.6, 25.6], [94.5, 25.5], [94.5, 24.2], [93.5, 24.0], [93.2, 24.8], [93.6, 25.6]
    ]
  },
  // 28. Mizoram
  {
    id: 'MZ',
    name: 'Mizoram',
    isNER: true,
    nerStateKey: 'Mizoram',
    zone: 'NorthEast',
    center: [92.8, 23.3],
    pathCoords: [
      [92.5, 24.4], [93.2, 24.2], [93.2, 22.4], [92.6, 21.9], [92.2, 22.8], [92.5, 24.4]
    ]
  },
  // 29. Tripura
  {
    id: 'TR',
    name: 'Tripura',
    isNER: true,
    nerStateKey: 'Tripura',
    zone: 'NorthEast',
    center: [91.8, 23.8],
    pathCoords: [
      [91.5, 24.4], [92.3, 24.3], [92.2, 23.1], [91.3, 23.1], [91.2, 23.8], [91.5, 24.4]
    ]
  }
];

// Major Indian Rivers for context (Ganga, Brahmaputra, Yamuna, Indus, Narmada, Godavari)
const MAJOR_INDIA_RIVERS: { name: string; points: [number, number][] }[] = [
  {
    name: 'Brahmaputra River (NER LifeLine)',
    points: [
      [95.5, 28.2], [94.8, 27.6], [93.5, 26.9], [92.2, 26.3], [91.2, 26.2], [89.9, 26.0], [89.7, 25.0]
    ]
  },
  {
    name: 'Ganga River',
    points: [
      [79.0, 30.5], [78.2, 29.8], [80.3, 26.9], [81.8, 25.4], [85.2, 25.6], [88.1, 24.5], [88.5, 22.5]
    ]
  },
  {
    name: 'Yamuna River',
    points: [
      [78.4, 31.0], [77.2, 28.6], [77.8, 27.2], [80.2, 26.0], [81.8, 25.4]
    ]
  },
  {
    name: 'Narmada River',
    points: [
      [81.7, 22.7], [78.8, 22.8], [75.5, 22.0], [72.8, 21.7]
    ]
  },
  {
    name: 'Godavari River',
    points: [
      [73.5, 19.9], [76.5, 19.0], [79.2, 18.8], [81.8, 16.9]
    ]
  }
];

// Major Indian Metropolitan & Strategic Cities (as reference anchors across India)
const MAJOR_INDIA_CITIES = [
  { name: 'New Delhi (National Capital)', lon: 77.2, lat: 28.6, type: 'CAPITAL' },
  { name: 'Mumbai', lon: 72.8, lat: 19.0, type: 'METRO' },
  { name: 'Kolkata', lon: 88.3, lat: 22.5, type: 'METRO' },
  { name: 'Chennai', lon: 80.2, lat: 13.0, type: 'METRO' },
  { name: 'Bengaluru', lon: 77.5, lat: 12.9, type: 'METRO' },
  { name: 'Guwahati (NER Gateway)', lon: 91.7, lat: 26.1, type: 'NER_GATEWAY' },
  { name: 'Dehradun (Himalayan HQ)', lon: 78.0, lat: 30.3, type: 'HIMALAYA' },
  { name: 'Shimla', lon: 77.1, lat: 31.1, type: 'HIMALAYA' }
];

export const WholeIndiaMap: React.FC<WholeIndiaMapProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  selectedState = 'ALL',
  onSelectState,
  onNavigateToGis,
  isLightMode = true
}) => {
  const [viewMode, setViewMode] = useState<'ALL_INDIA' | 'NORTHEAST'>('ALL_INDIA');
  const [activeRiskFilter, setActiveRiskFilter] = useState<'ALL' | 'WARNING' | 'WATCH' | 'NORMAL'>('ALL');
  const [showRivers, setShowRivers] = useState(true);
  const [showPlaceLabels, setShowPlaceLabels] = useState(true);
  const [showMajorCities, setShowMajorCities] = useState(true);
  const [hoveredState, setHoveredState] = useState<StateBoundary | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<MonitoredLocation | null>(null);

  // Filter locations based on active risk level and state
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      if (activeRiskFilter !== 'ALL' && loc.prediction.riskLevel !== activeRiskFilter) {
        return false;
      }
      if (selectedState !== 'ALL' && loc.state !== selectedState) {
        return false;
      }
      return true;
    });
  }, [locations, activeRiskFilter, selectedState]);

  // Aggregate counts
  const warningCount = locations.filter((l) => l.prediction.riskLevel === 'WARNING').length;
  const watchCount = locations.filter((l) => l.prediction.riskLevel === 'WATCH').length;
  const normalCount = locations.filter((l) => l.prediction.riskLevel === 'NORMAL').length;

  // Render SVG polygon path string from coordinates
  const renderPathD = (coords: [number, number][]) => {
    return coords
      .map((pt, i) => {
        const [x, y] = projectGeoToSvg(pt[0], pt[1], viewMode);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ') + ' Z';
  };

  // Convert River Polyline
  const renderRiverPath = (pts: [number, number][]) => {
    return pts
      .map((pt, i) => {
        const [x, y] = projectGeoToSvg(pt[0], pt[1], viewMode);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <div
      className={`w-full rounded-xl border shadow-sm flex flex-col overflow-hidden transition-colors ${
        isLightMode
          ? 'bg-white border-slate-200 text-slate-900'
          : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}
    >
      {/* Map Control Toolbar Header */}
      <div
        className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
          isLightMode ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950/60 border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-600/10 text-emerald-600 border border-emerald-600/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base font-bold tracking-tight">
                {viewMode === 'ALL_INDIA' ? 'Complete India Map' : 'North-East Region Focus'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                TAP TO ACCESS PLACES
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Interactive geological & landslide risk map. Tap on any state or place pin to inspect live telemetry.
            </p>
          </div>
        </div>

        {/* View Switchers & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Zoom Modes */}
          <div
            className={`flex items-center rounded-lg p-0.5 border ${
              isLightMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-800 border-slate-700'
            }`}
          >
            <button
              onClick={() => setViewMode('ALL_INDIA')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                viewMode === 'ALL_INDIA'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Whole India
            </button>
            <button
              onClick={() => setViewMode('NORTHEAST')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                viewMode === 'NORTHEAST'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              North-East Focus
            </button>
          </div>

          {/* Risk Level Pills */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => setActiveRiskFilter('ALL')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                activeRiskFilter === 'ALL'
                  ? 'bg-slate-800 text-white border-slate-700 font-semibold'
                  : isLightMode
                  ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              All ({locations.length})
            </button>
            <button
              onClick={() => setActiveRiskFilter('WARNING')}
              className={`px-2 py-1 rounded-md text-xs font-medium border transition-all flex items-center gap-1 ${
                activeRiskFilter === 'WARNING'
                  ? 'bg-rose-600 text-white border-rose-700 font-semibold'
                  : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              Warning ({warningCount})
            </button>
            <button
              onClick={() => setActiveRiskFilter('WATCH')}
              className={`px-2 py-1 rounded-md text-xs font-medium border transition-all flex items-center gap-1 ${
                activeRiskFilter === 'WATCH'
                  ? 'bg-amber-600 text-white border-amber-700 font-semibold'
                  : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Watch ({watchCount})
            </button>
          </div>

          {/* GIS Satellite Switcher Button */}
          {onNavigateToGis && (
            <button
              onClick={onNavigateToGis}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>GIS Satellite</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Map Stage */}
      <div className="relative w-full overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4">
        {/* Layer Toggles Floating Card */}
        <div
          className={`absolute top-4 left-4 z-10 p-2.5 rounded-lg border shadow-md flex flex-col gap-1.5 text-xs backdrop-blur-md ${
            isLightMode
              ? 'bg-white/95 border-slate-200 text-slate-700'
              : 'bg-slate-900/90 border-slate-800 text-slate-300'
          }`}
        >
          <div className="font-bold text-[11px] uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Map Layers</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={showPlaceLabels}
              onChange={(e) => setShowPlaceLabels(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
            />
            <span>Place Labels</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={showRivers}
              onChange={(e) => setShowRivers(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
            />
            <span>Major Rivers (Brahmaputra/Ganga)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={showMajorCities}
              onChange={(e) => setShowMajorCities(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
            />
            <span>Major Indian Metros</span>
          </label>
        </div>

        {/* Selected State / Place Banner */}
        <div
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-lg border shadow-md flex items-center gap-3 text-xs max-w-xs backdrop-blur-md ${
            isLightMode
              ? 'bg-white/95 border-slate-200 text-slate-800'
              : 'bg-slate-900/90 border-slate-800 text-slate-200'
          }`}
        >
          {selectedLocation ? (
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase font-bold text-emerald-600 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Active Place Selected
              </div>
              <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                {selectedLocation.name}
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    selectedLocation.prediction.riskLevel === 'WARNING'
                      ? 'bg-rose-100 text-rose-800'
                      : selectedLocation.prediction.riskLevel === 'WATCH'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {selectedLocation.prediction.riskLevel}
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                {selectedLocation.district}, {selectedLocation.state} • {selectedLocation.rainfall.today} mm Rain
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-500">
              <Info className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tap any pin on the map to inspect place telemetry</span>
            </div>
          )}
        </div>

        {/* Interactive Whole India SVG Map */}
        <div className="w-full max-w-4xl aspect-[1/1] sm:aspect-[10/9] relative select-none">
          <svg
            viewBox={`0 0 ${MAP_CONFIG.svgWidth} ${MAP_CONFIG.svgHeight}`}
            className="w-full h-full filter drop-shadow-sm"
          >
            <defs>
              {/* Light Mode Gradients */}
              <linearGradient id="nerHighlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="selectedStateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.25" />
              </linearGradient>
              <pattern id="himalayaHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="10" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
              </pattern>
            </defs>

            {/* Ocean / Subcontinent Background Grid */}
            <rect
              width={MAP_CONFIG.svgWidth}
              height={MAP_CONFIG.svgHeight}
              fill={isLightMode ? '#f8fafc' : '#090d16'}
              rx="12"
            />

            {/* Subtle Latitude / Longitude Grid lines */}
            {[10, 15, 20, 25, 30, 35].map((lat) => {
              const [, y] = projectGeoToSvg(70, lat, viewMode);
              return (
                <line
                  key={`lat-${lat}`}
                  x1="40"
                  y1={y}
                  x2={MAP_CONFIG.svgWidth - 40}
                  y2={y}
                  stroke={isLightMode ? '#e2e8f0' : '#1e293b'}
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              );
            })}
            {[72, 78, 84, 90, 96].map((lon) => {
              const [x] = projectGeoToSvg(lon, 20, viewMode);
              return (
                <line
                  key={`lon-${lon}`}
                  x1={x}
                  y1="40"
                  x2={x}
                  y2={MAP_CONFIG.svgHeight - 40}
                  stroke={isLightMode ? '#e2e8f0' : '#1e293b'}
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              );
            })}

            {/* 1. Indian States and Territories Polygons */}
            <g id="indian-states">
              {ALL_INDIA_STATES.map((state) => {
                const isSelected = selectedState === state.nerStateKey || selectedState === state.name;
                const isHovered = hoveredState?.id === state.id;
                const isNER = state.isNER;

                // Color calculation
                let fillColor = isLightMode ? '#f1f5f9' : '#1e293b';
                let strokeColor = isLightMode ? '#cbd5e1' : '#334155';
                let strokeWidth = 1.5;

                if (isNER) {
                  fillColor = isLightMode ? '#dcfce7' : '#064e3b';
                  strokeColor = '#10b981';
                  strokeWidth = 2;
                }

                if (isSelected) {
                  fillColor = isLightMode ? '#bfdbfe' : '#1e3a8a';
                  strokeColor = '#2563eb';
                  strokeWidth = 2.5;
                } else if (isHovered) {
                  fillColor = isNER
                    ? (isLightMode ? '#bbf7d0' : '#047857')
                    : (isLightMode ? '#e2e8f0' : '#334155');
                }

                const [cx, cy] = projectGeoToSvg(state.center[0], state.center[1], viewMode);

                return (
                  <g
                    key={state.id}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => {
                      if (state.isNER && state.nerStateKey && onSelectState) {
                        onSelectState(state.nerStateKey);
                      }
                    }}
                    onMouseEnter={() => setHoveredState(state)}
                    onMouseLeave={() => setHoveredState(null)}
                  >
                    <path
                      d={renderPathD(state.pathCoords)}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                    />

                    {/* State Center Label */}
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-[10px] sm:text-xs font-semibold pointer-events-none ${
                        isNER
                          ? 'fill-emerald-800 font-bold'
                          : isLightMode
                          ? 'fill-slate-600'
                          : 'fill-slate-400'
                      }`}
                    >
                      {state.name}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* 2. Major Rivers Overlay */}
            {showRivers && (
              <g id="indian-rivers" className="pointer-events-none">
                {MAJOR_INDIA_RIVERS.map((river) => (
                  <g key={river.name}>
                    <path
                      d={renderRiverPath(river.points)}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth={river.name.includes('Brahmaputra') ? 3.5 : 2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.85}
                    />
                  </g>
                ))}
              </g>
            )}

            {/* 3. Major Indian Metros / Cities Reference Points */}
            {showMajorCities && (
              <g id="indian-cities" className="pointer-events-none">
                {MAJOR_INDIA_CITIES.map((city) => {
                  const [x, y] = projectGeoToSvg(city.lon, city.lat, viewMode);
                  return (
                    <g key={city.name} transform={`translate(${x}, ${y})`}>
                      <circle
                        r={city.type === 'CAPITAL' ? 5 : 3.5}
                        fill={city.type === 'CAPITAL' ? '#ef4444' : '#64748b'}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <text
                        x="7"
                        y="3"
                        className="text-[9px] font-semibold fill-slate-700"
                      >
                        {city.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* 4. Interactive Monitored Landslide Place Pins */}
            <g id="landslide-places">
              {filteredLocations.map((loc) => {
                const [x, y] = projectGeoToSvg(
                  loc.longitude,
                  loc.latitude,
                  viewMode
                );
                const isSelected = selectedLocation?.id === loc.id;
                const isHovered = hoveredLocation?.id === loc.id;
                const risk = loc.prediction.riskLevel;

                let pinColor = '#10b981'; // normal
                if (risk === 'WARNING') pinColor = '#e11d48'; // warning rose
                if (risk === 'WATCH') pinColor = '#d97706'; // watch amber

                return (
                  <g
                    key={loc.id}
                    transform={`translate(${x}, ${y})`}
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLocation(loc);
                    }}
                    onMouseEnter={() => setHoveredLocation(loc)}
                    onMouseLeave={() => setHoveredLocation(null)}
                  >
                    {/* Pulsing ring for warning sites */}
                    {risk === 'WARNING' && (
                      <circle
                        r="18"
                        fill="#e11d48"
                        opacity="0.25"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Selection Highlight Halo */}
                    {(isSelected || isHovered) && (
                      <circle
                        r={isSelected ? 16 : 13}
                        fill={pinColor}
                        opacity="0.3"
                      />
                    )}

                    {/* Pin Shape */}
                    <circle
                      r={isSelected ? 8 : 6}
                      fill={pinColor}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-transform group-hover:scale-125 filter drop-shadow-md"
                    />

                    {/* Place Name Tag */}
                    {showPlaceLabels && (
                      <g transform="translate(0, -12)">
                        <rect
                          x={-loc.name.length * 3.5 - 6}
                          y="-13"
                          width={loc.name.length * 7 + 12}
                          height="16"
                          rx="4"
                          fill={
                            isSelected
                              ? '#0f172a'
                              : isLightMode
                              ? 'rgba(255, 255, 255, 0.95)'
                              : 'rgba(15, 23, 42, 0.95)'
                          }
                          stroke={pinColor}
                          strokeWidth="1"
                          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))"
                        />
                        <text
                          x="0"
                          y="-2"
                          textAnchor="middle"
                          className={`text-[9px] font-bold ${
                            isSelected
                              ? 'fill-white'
                              : isLightMode
                              ? 'fill-slate-900'
                              : 'fill-slate-100'
                          }`}
                        >
                          {loc.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      {/* Quick Place Intelligence Footer Bar */}
      {selectedLocation && (
        <div
          className={`px-4 py-3 border-t flex flex-wrap items-center justify-between gap-3 ${
            isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-2 rounded-lg ${
                selectedLocation.prediction.riskLevel === 'WARNING'
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : selectedLocation.prediction.riskLevel === 'WATCH'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{selectedLocation.name}</span>
                <span className="text-xs text-slate-500 font-medium">
                  ({selectedLocation.district}, {selectedLocation.state})
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-0.5">
                <span>
                  <strong>Risk Score:</strong> {selectedLocation.prediction.riskScore}/100
                </span>
                <span>•</span>
                <span>
                  <strong>24h Rain:</strong> {selectedLocation.rainfall.today} mm
                </span>
                <span>•</span>
                <span>
                  <strong>Elevation:</strong> {selectedLocation.environmental.elevation}m
                </span>
                <span>•</span>
                <span>
                  <strong>Slope:</strong> {selectedLocation.environmental.slope}°
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectLocation(selectedLocation)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Inspect Full Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
