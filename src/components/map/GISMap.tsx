import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Eye,
  EyeOff,
  Filter,
  Check,
  MapPin,
  Compass,
  Navigation,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MonitoredLocation, RiskLevel, NERState } from '../../types/location';
import { MapLayerState, MapTileStyle } from '../../types/config';
import { NER_STATES_INFO } from '../../data/nerLocations';
import { WholeIndiaMap } from './WholeIndiaMap';
import { NortheastIndiaMap } from './NortheastIndiaMap';

interface GISMapProps {
  locations: MonitoredLocation[];
  selectedLocation: MonitoredLocation | null;
  onSelectLocation: (loc: MonitoredLocation) => void;
  mapTileStyle: MapTileStyle;
  selectedStateFilter?: string;
  selectedRiskFilter?: string;
  onStateFilterChange?: (state: string) => void;
  isLightMode?: boolean;
}

// State Boundary Polygons for Leaflet Map Overlay
const LEAFLET_STATE_POLYGONS: { name: NERState; coords: [number, number][]; color: string }[] = [
  {
    name: 'Sikkim',
    color: '#10b981',
    coords: [
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
    coords: [
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
    coords: [
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
    coords: [
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
    coords: [
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
    coords: [
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
    coords: [
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
    coords: [
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

export const GISMap: React.FC<GISMapProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  mapTileStyle,
  selectedStateFilter = 'ALL',
  selectedRiskFilter = 'ALL',
  onStateFilterChange,
  isLightMode = true
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const stateBoundariesLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const heatmapLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const rainfallLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const roadsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const infraLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const alertRadiusLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);

  const [viewMode, setViewMode] = useState<'GIS_MAP' | 'VECTOR_MAP'>('GIS_MAP');
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);
  const [isStateCardsExpanded, setIsStateCardsExpanded] = useState(false);
  const [activeStateModal, setActiveStateModal] = useState<NERState | null>(null);
  const [lastTappedPoint, setLastTappedPoint] = useState<{ lat: number; lng: number } | null>(null);

  const [layers, setLayers] = useState<MapLayerState>({
    riskMarkers: true,
    susceptibilityHeatmap: false,
    dynamicRainfall: false,
    roadNetwork: true,
    settlements: false,
    criticalInfrastructure: false,
    alertRadiusBuffer: true,
    satelliteOverlay: false,
    stateBoundaries: true
  });

  const handleSelectState = (stateName: string) => {
    if (onStateFilterChange) {
      onStateFilterChange(stateName);
    }
    if (stateName === 'ALL') {
      mapInstanceRef.current?.flyTo([26.0, 93.0], 7, { duration: 1.0 });
    } else {
      const stateInfo = NER_STATES_INFO[stateName as NERState];
      if (stateInfo && mapInstanceRef.current) {
        mapInstanceRef.current.flyTo(stateInfo.coordinates, stateInfo.zoomLevel, { duration: 1.0 });
      }
    }
  };

  // Tile sources
  const tileUrls: Record<MapTileStyle, { url: string; attribution: string }> = {
    'carto-dark': {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CartoDB &copy; OpenStreetMap contributors'
    },
    'osm-standard': {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors'
    },
    'esri-satellite': {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS'
    },
    'opentopo': {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenTopoMap contributors'
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current || viewMode !== 'GIS_MAP') return;

    // Centered on North-East India with full Indian context visible
    const map = L.map(mapContainerRef.current, {
      center: [26.0, 93.0],
      zoom: 7,
      minZoom: 4,
      maxZoom: 17,
      zoomControl: false
    });

    // Base Tile Layer
    const tileConfig = tileUrls[mapTileStyle] || tileUrls['carto-dark'];
    const tileLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: 18
    }).addTo(map);

    baseTileLayerRef.current = tileLayer;

    // Create Layer Groups
    stateBoundariesLayerGroupRef.current = L.layerGroup().addTo(map);
    markersLayerGroupRef.current = L.layerGroup().addTo(map);
    heatmapLayerGroupRef.current = L.layerGroup().addTo(map);
    rainfallLayerGroupRef.current = L.layerGroup().addTo(map);
    roadsLayerGroupRef.current = L.layerGroup().addTo(map);
    infraLayerGroupRef.current = L.layerGroup().addTo(map);
    alertRadiusLayerGroupRef.current = L.layerGroup().addTo(map);

    // Map Tap / Click Listener: Access closest or tapped place in North-East India
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setLastTappedPoint({ lat, lng });

      // Find closest place
      let nearestLoc: MonitoredLocation | null = null;
      let minDistance = Infinity;

      locations.forEach((loc) => {
        const dLat = loc.latitude - lat;
        const dLng = loc.longitude - lng;
        const dist = Math.sqrt(dLat * dLat + dLng * dLng);
        if (dist < minDistance) {
          minDistance = dist;
          nearestLoc = loc;
        }
      });

      // If clicked reasonably close to a monitored place (< 0.75 deg ~ 80km)
      if (nearestLoc && minDistance < 0.75) {
        onSelectLocation(nearestLoc);
      }
    });

    mapInstanceRef.current = map;

    // Fix map sizing on container resize
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [viewMode]);

  // Update Base Tile on style change
  useEffect(() => {
    if (!mapInstanceRef.current || !baseTileLayerRef.current) return;
    const tileConfig = tileUrls[mapTileStyle] || tileUrls['carto-dark'];
    baseTileLayerRef.current.setUrl(tileConfig.url);
  }, [mapTileStyle]);

  // Center on Selected Location
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedLocation || viewMode !== 'GIS_MAP') return;
    mapInstanceRef.current.flyTo(
      [selectedLocation.latitude, selectedLocation.longitude],
      11,
      { duration: 1.2 }
    );
  }, [selectedLocation, viewMode]);

  // Zoom to state filter if changed
  useEffect(() => {
    if (!mapInstanceRef.current || selectedStateFilter === 'ALL' || viewMode !== 'GIS_MAP') return;
    const stateInfo = NER_STATES_INFO[selectedStateFilter as NERState];
    if (stateInfo) {
      mapInstanceRef.current.flyTo(stateInfo.coordinates, stateInfo.zoomLevel, {
        duration: 1.0
      });
    }
  }, [selectedStateFilter, viewMode]);

  // Render State Boundaries, Markers and GIS Layers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || viewMode !== 'GIS_MAP') return;

    // Clear all layer groups
    stateBoundariesLayerGroupRef.current?.clearLayers();
    markersLayerGroupRef.current?.clearLayers();
    heatmapLayerGroupRef.current?.clearLayers();
    rainfallLayerGroupRef.current?.clearLayers();
    roadsLayerGroupRef.current?.clearLayers();
    infraLayerGroupRef.current?.clearLayers();
    alertRadiusLayerGroupRef.current?.clearLayers();

    // 0. Render State Boundary Polygons & Centroid Status Badges for ALL 8 States
    if (layers.stateBoundaries && stateBoundariesLayerGroupRef.current) {
      LEAFLET_STATE_POLYGONS.forEach((st) => {
        const isSelectedState = selectedStateFilter === st.name;
        const stateInfo = NER_STATES_INFO[st.name];
        const stateLocs = locations.filter((l) => l.state === st.name);
        const warnCount = stateLocs.filter((l) => l.prediction.riskLevel === 'WARNING').length;
        const watchCount = stateLocs.filter((l) => l.prediction.riskLevel === 'WATCH').length;
        const normalCount = stateLocs.filter((l) => l.prediction.riskLevel === 'NORMAL').length;
        const stateRiskLevel = warnCount > 0 ? 'WARNING' : watchCount > 0 ? 'WATCH' : 'NORMAL';
        const stateBadgeColor = stateRiskLevel === 'WARNING' ? '#ef4444' : stateRiskLevel === 'WATCH' ? '#f59e0b' : '#10b981';

        // 0.1 Polygon Boundary
        const poly = L.polygon(st.coords, {
          color: isSelectedState ? '#10b981' : st.color,
          weight: isSelectedState ? 3 : 1.5,
          dashArray: isSelectedState ? undefined : '5, 5',
          fillColor: isSelectedState ? '#10b981' : st.color,
          fillOpacity: isSelectedState ? 0.20 : 0.08
        });

        const popupContent = `
          <div style="padding: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-width: 230px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">
              <span style="font-size: 12px; font-weight: 800; color: ${st.color}; font-family: monospace; text-transform: uppercase;">${st.name}</span>
              <span style="font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: ${stateBadgeColor}25; color: ${stateBadgeColor}; border: 1px solid ${stateBadgeColor};">${stateRiskLevel}</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 6px; line-height: 1.5;">
              Capital: <strong style="color: #f1f5f9;">${stateInfo ? stateInfo.capital : 'N/A'}</strong><br/>
              Rainfall Today: <strong style="color: #38bdf8;">${stateInfo ? stateInfo.averageRainfallToday : 0} mm</strong><br/>
              Monitored Stations: <strong style="color: #f1f5f9;">${stateLocs.length}</strong> (Warning: <strong style="color: #ef4444;">${warnCount}</strong>, Watch: <strong style="color: #f59e0b;">${watchCount}</strong>)
            </div>
            <div style="font-size: 10px; color: #64748b; margin-bottom: 8px;">
              High Risk: <strong style="color: #cbd5e1;">${stateInfo ? stateInfo.highRiskDistricts.slice(0, 2).join(', ') : 'All districts'}</strong>
            </div>
            <button id="btn-state-explore-${st.name.replace(/[^a-zA-Z0-9]/g, '_')}" style="width: 100%; background: #10b981; color: #ffffff; border: none; border-radius: 6px; padding: 6px 0; font-size: 11px; font-weight: 700; cursor: pointer; text-align: center;">
              Focus & View ${st.name} Stations &rarr;
            </button>
          </div>
        `;

        poly.bindPopup(popupContent, { maxWidth: 280 });

        poly.on('popupopen', () => {
          const btn = document.getElementById(`btn-state-explore-${st.name.replace(/[^a-zA-Z0-9]/g, '_')}`);
          if (btn) {
            btn.onclick = () => handleSelectState(st.name);
          }
        });

        poly.addTo(stateBoundariesLayerGroupRef.current!);

        // 0.2 Permanent Centroid State Floating Badge (Visible across map for all 8 states)
        if (stateInfo) {
          const badgeIcon = L.divIcon({
            className: 'custom-state-badge',
            html: `
              <div class="cursor-pointer transition-all hover:scale-105 select-none" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35)); pointer-events: auto;">
                <div style="background: ${isLightMode ? 'rgba(255,255,255,0.94)' : 'rgba(15,23,42,0.92)'}; border: 1.5px solid ${isSelectedState ? '#10b981' : stateBadgeColor}; border-radius: 8px; padding: 2px 7px; display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; backdrop-filter: blur(4px);">
                  <span style="width: 7px; height: 7px; border-radius: 9999px; background: ${stateBadgeColor}; display: inline-block; ${warnCount > 0 ? 'box-shadow: 0 0 6px #ef4444;' : ''}"></span>
                  <span style="font-weight: 800; font-size: 10px; color: ${isLightMode ? '#0f172a' : '#f8fafc'}; font-family: monospace;">${st.name}</span>
                  <span style="font-size: 9px; font-weight: 700; padding: 1px 4px; border-radius: 3px; background: ${stateBadgeColor}20; color: ${stateBadgeColor}; border: 1px solid ${stateBadgeColor}40;">
                    ${warnCount > 0 ? `${warnCount} ALERTS` : `${stateLocs.length} SITES`}
                  </span>
                </div>
              </div>
            `,
            iconAnchor: [55, 12]
          });

          const stateMarker = L.marker(stateInfo.coordinates, { icon: badgeIcon });
          stateMarker.on('click', () => {
            handleSelectState(st.name);
          });
          stateMarker.addTo(stateBoundariesLayerGroupRef.current!);
        }
      });
    }

    // Filter locations based on UI filter
    const visibleLocations = locations.filter((loc) => {
      if (selectedStateFilter !== 'ALL' && loc.state !== selectedStateFilter) {
        return false;
      }
      if (selectedRiskFilter !== 'ALL' && loc.prediction.riskLevel !== selectedRiskFilter) {
        return false;
      }
      return true;
    });

    visibleLocations.forEach((loc) => {
      const isWarning = loc.prediction.riskLevel === 'WARNING';
      const isWatch = loc.prediction.riskLevel === 'WATCH';
      const isSelected = selectedLocation?.id === loc.id;

      const markerColor = isWarning ? '#ef4444' : isWatch ? '#f59e0b' : '#10b981';
      const borderColor = isSelected ? '#38bdf8' : '#ffffff';
      const radius = isSelected ? 12 : isWarning ? 10 : 8;

      // 1. Alert Radius Buffer Layer (10km circle for WARNING)
      if (layers.alertRadiusBuffer && isWarning && alertRadiusLayerGroupRef.current) {
        const circle = L.circle([loc.latitude, loc.longitude], {
          radius: 10000, // 10 km
          color: '#ef4444',
          weight: 1,
          dashArray: '4, 6',
          fillColor: '#ef4444',
          fillOpacity: 0.08
        });
        circle.bindTooltip(`Alert Zone: ${loc.name} (10km Radius)`, {
          className: 'leaflet-tooltip'
        });
        circle.addTo(alertRadiusLayerGroupRef.current);
      }

      // 2. Susceptibility Heatmap Layer
      if (layers.susceptibilityHeatmap && heatmapLayerGroupRef.current) {
        const suscCircle = L.circle([loc.latitude, loc.longitude], {
          radius: 6000 * loc.prediction.susceptibilityScore,
          color: 'transparent',
          fillColor: '#f97316',
          fillOpacity: 0.25 * loc.prediction.susceptibilityScore
        });
        suscCircle.addTo(heatmapLayerGroupRef.current);
      }

      // 3. Dynamic Rainfall Radar Layer
      if (layers.dynamicRainfall && rainfallLayerGroupRef.current) {
        const rainCircle = L.circle([loc.latitude, loc.longitude], {
          radius: Math.min(18000, 3000 + loc.rainfall.today * 120),
          color: '#06b6d4',
          weight: 1,
          dashArray: '2, 4',
          fillColor: '#0284c7',
          fillOpacity: Math.min(0.4, 0.1 + loc.rainfall.today / 200)
        });
        rainCircle.bindTooltip(`Rainfall: ${loc.rainfall.today} mm / 24h`, {
          className: 'leaflet-tooltip'
        });
        rainCircle.addTo(rainfallLayerGroupRef.current);
      }

      // 4. Critical Infrastructure Markers
      if (layers.criticalInfrastructure && infraLayerGroupRef.current) {
        if (loc.exposure.hospitals > 0) {
          const hospMarker = L.circleMarker([loc.latitude + 0.015, loc.longitude + 0.015], {
            radius: 5,
            color: '#38bdf8',
            fillColor: '#0284c7',
            fillOpacity: 0.9,
            weight: 1.5
          });
          hospMarker.bindTooltip(`Hospital: 1 unit near ${loc.name}`, { className: 'leaflet-tooltip' });
          hospMarker.addTo(infraLayerGroupRef.current);
        }
      }

      // 5. Road Network lines
      if (layers.roadNetwork && roadsLayerGroupRef.current) {
        loc.exposure.roadSegments.forEach((road, idx) => {
          const offset = (idx + 1) * 0.012;
          const polyline = L.polyline(
            [
              [loc.latitude - offset, loc.longitude - offset * 1.5],
              [loc.latitude, loc.longitude],
              [loc.latitude + offset, loc.longitude + offset * 1.5]
            ],
            {
              color: road.trafficVulnerability === 'HIGH' ? '#f43f5e' : '#64748b',
              weight: road.type === 'National Highway' ? 3 : 2,
              opacity: 0.7,
              dashArray: road.type === 'National Highway' ? undefined : '4, 4'
            }
          );
          polyline.bindTooltip(`${road.name} (${road.type})`, {
            className: 'leaflet-tooltip'
          });
          polyline.addTo(roadsLayerGroupRef.current!);
        });
      }

      // 6. Main Risk Markers
      if (layers.riskMarkers && markersLayerGroupRef.current) {
        // Warning Pulse Ring
        if (isWarning) {
          const pulseIcon = L.divIcon({
            className: 'custom-pulse-marker',
            html: `<div class="relative flex items-center justify-center">
                    <span class="w-8 h-8 rounded-full bg-rose-500/40 animate-ping absolute"></span>
                    <span class="w-5 h-5 rounded-full bg-rose-500/80 border border-rose-300 shadow-lg shadow-rose-950"></span>
                   </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          });
          const pulseMarker = L.marker([loc.latitude, loc.longitude], {
            icon: pulseIcon
          });
          pulseMarker.on('click', () => onSelectLocation(loc));
          pulseMarker.addTo(markersLayerGroupRef.current);
        }

        const circleMarker = L.circleMarker([loc.latitude, loc.longitude], {
          radius,
          fillColor: markerColor,
          color: borderColor,
          weight: isSelected ? 3 : 1.5,
          opacity: 1,
          fillOpacity: 0.95
        });

        // Interactive Popup
        const popupContent = `
          <div style="padding: 12px; font-family: sans-serif; min-width: 220px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 10px; font-weight: bold; font-family: monospace; color: #94a3b8; text-transform: uppercase;">${loc.state}</span>
              <span style="font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; background: ${
                isWarning ? 'rgba(239, 68, 68, 0.2)' : isWatch ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'
              }; color: ${markerColor}; border: 1px solid ${markerColor};">${loc.prediction.riskLevel} ${loc.prediction.riskScore}</span>
            </div>
            <div style="font-size: 13px; font-weight: 700; color: #ffffff; margin-bottom: 6px;">${loc.name}</div>
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 8px;">
              District: <strong style="color: #e2e8f0;">${loc.district}</strong><br/>
              Rainfall 24h: <strong style="color: #38bdf8;">${loc.rainfall.today} mm</strong><br/>
              Slope: <strong style="color: #e2e8f0;">${loc.environmental.slope}°</strong> • Antecedent: <strong style="color: #e2e8f0;">${Math.round(loc.rainfall.antecedentRainfallIndex)}/100</strong>
            </div>
            <button id="btn-popup-${loc.id}" style="width: 100%; background: #10b981; color: #ffffff; border: none; border-radius: 6px; padding: 6px 0; font-size: 11px; font-weight: 600; cursor: pointer; text-align: center;">
              Open Location Intelligence &rarr;
            </button>
          </div>
        `;

        circleMarker.bindPopup(popupContent, { maxWidth: 280 });

        circleMarker.on('popupopen', () => {
          const btn = document.getElementById(`btn-popup-${loc.id}`);
          if (btn) {
            btn.onclick = () => onSelectLocation(loc);
          }
        });

        circleMarker.on('click', () => {
          onSelectLocation(loc);
        });

        circleMarker.addTo(markersLayerGroupRef.current);
      }
    });
  }, [
    locations,
    selectedLocation,
    layers,
    selectedStateFilter,
    selectedRiskFilter,
    viewMode
  ]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleReset = () => {
    mapInstanceRef.current?.flyTo([26.0, 93.0], 7, { duration: 1.0 });
  };

  const toggleLayer = (layerKey: keyof MapLayerState) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // If Vector Map view mode is chosen
  if (viewMode === 'VECTOR_MAP') {
    return (
      <div className="relative w-full h-full p-2 md:p-4 bg-slate-100 flex flex-col">
        {/* Toggle back to GIS Map */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={() => setViewMode('GIS_MAP')}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-mono shadow-xl transition-all flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            Switch to GIS Satellite Map
          </button>
        </div>
        <WholeIndiaMap
          locations={locations}
          selectedLocation={selectedLocation}
          onSelectLocation={onSelectLocation}
          selectedState={selectedStateFilter as any}
          isLightMode={true}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none transition-colors ${
        isLightMode ? 'bg-slate-100' : 'bg-slate-950'
      }`}
    >
      {/* The Leaflet Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Top-Left Region Breadcrumb & Stats */}
      <div
        className={`absolute top-4 left-4 z-10 backdrop-blur-md border rounded-xl px-3.5 py-2.5 shadow-xl flex items-center gap-3 pointer-events-auto transition-colors ${
          isLightMode
            ? 'bg-white/95 border-slate-200 text-slate-800'
            : 'bg-slate-900/90 border-slate-700/80 text-slate-100'
        }`}
      >
        <div>
          <div className="text-[10px] font-mono text-emerald-600 font-semibold uppercase tracking-wider flex items-center gap-1">
            <Compass className="w-3 h-3 text-emerald-600" />
            India Map • North-East Region
          </div>
          <div
            className={`text-xs font-bold flex items-center gap-1.5 ${
              isLightMode ? 'text-slate-900' : 'text-slate-100'
            }`}
          >
            {selectedStateFilter === 'ALL' ? 'All 8 North-Eastern States' : selectedStateFilter}
            {selectedRiskFilter !== 'ALL' && (
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  isLightMode ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Filter: {selectedRiskFilter}
              </span>
            )}
          </div>
        </div>
        <div className={`h-6 w-px ${isLightMode ? 'bg-slate-200' : 'bg-slate-700'}`} />
        <div className="text-right">
          <div className="text-[10px] font-mono text-slate-400">Locations</div>
          <div
            className={`text-xs font-bold font-mono ${
              isLightMode ? 'text-slate-900' : 'text-slate-200'
            }`}
          >
            {locations.length} Sites
          </div>
        </div>
      </div>

      {/* Floating Bottom-Left Dynamic GIS Legend */}
      <div
        className={`absolute bottom-6 left-4 z-10 backdrop-blur-md border rounded-xl p-3 shadow-xl pointer-events-auto max-w-xs hidden sm:block transition-colors ${
          isLightMode
            ? 'bg-white/95 border-slate-200 text-slate-800'
            : 'bg-slate-900/90 border-slate-700/80 text-slate-100'
        }`}
      >
        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold mb-2">
          GIS Risk Legend • Tap Map to Access
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 ring-2 ring-rose-400/40 animate-pulse shrink-0" />
            <span className="font-semibold text-rose-700">WARNING (Score 70–100)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
            <span className="text-amber-700">WATCH (Score 40–69)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-emerald-700">NORMAL (Score 0–39)</span>
          </div>

          {layers.stateBoundaries && (
            <div
              className={`flex items-center gap-2 pt-1 border-t text-[11px] text-emerald-700 ${
                isLightMode ? 'border-slate-200' : 'border-slate-800'
              }`}
            >
              <span className="w-3 h-0.5 bg-emerald-500 shrink-0" />
              <span>State Boundary Polygons</span>
            </div>
          )}

          {layers.roadNetwork && (
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="w-3 h-0.5 bg-rose-500 shrink-0" />
              <span>National Highway Corridor</span>
            </div>
          )}
          {layers.dynamicRainfall && (
            <div className="flex items-center gap-2 text-[11px] text-cyan-600">
              <span className="w-3 h-3 rounded-full border border-cyan-500 border-dashed shrink-0" />
              <span>Dynamic Rainfall Radar</span>
            </div>
          )}
          {layers.alertRadiusBuffer && (
            <div className="flex items-center gap-2 text-[11px] text-rose-600">
              <span className="w-3 h-3 rounded-full border border-rose-500 border-dashed bg-rose-500/10 shrink-0" />
              <span>10km Early Warning Radius</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Right Map Action Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 pointer-events-auto">
        {/* Toggle to Geographic Vector Map Mode */}
        <button
          onClick={() => setViewMode('VECTOR_MAP')}
          title="Switch to Vector Whole India Map"
          className={`p-2.5 backdrop-blur-md border rounded-xl shadow-xl transition-all flex items-center justify-center ${
            isLightMode
              ? 'bg-white/95 border-slate-200 text-emerald-600 hover:bg-slate-50'
              : 'bg-slate-900/90 border-slate-700 text-emerald-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
        </button>

        {/* Layer Controls Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
            title="Toggle GIS Map Layers"
            className={`p-2.5 rounded-xl border shadow-xl transition-all ${
              isLayerMenuOpen
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : isLightMode
                ? 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-700 hover:bg-slate-50'
                : 'bg-slate-900/90 backdrop-blur-md border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Layer Controls Dropdown Menu */}
          {isLayerMenuOpen && (
            <div
              className={`absolute right-0 top-full mt-2 w-64 backdrop-blur-md border rounded-xl p-3 shadow-2xl space-y-2 z-20 animate-in fade-in zoom-in-95 ${
                isLightMode
                  ? 'bg-white/95 border-slate-200 text-slate-800'
                  : 'bg-slate-900/95 border-slate-700 text-slate-200'
              }`}
            >
              <div
                className={`flex items-center justify-between pb-2 border-b ${
                  isLightMode ? 'border-slate-200' : 'border-slate-800'
                }`}
              >
                <span
                  className={`text-xs font-bold ${
                    isLightMode ? 'text-slate-900' : 'text-slate-200'
                  }`}
                >
                  GIS Layer Controls
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold">ACTIVE</span>
              </div>

              <div className="space-y-1 text-xs">
                {[
                  { key: 'riskMarkers', label: 'Landslide Risk Markers' },
                  { key: 'stateBoundaries', label: 'State Boundaries & Polygons' },
                  { key: 'alertRadiusBuffer', label: '10km Warning Radius Circles' },
                  { key: 'roadNetwork', label: 'National & State Highways' },
                  { key: 'dynamicRainfall', label: 'Dynamic Rainfall Radar' },
                  { key: 'susceptibilityHeatmap', label: 'Terrain Susceptibility Zones' },
                  { key: 'criticalInfrastructure', label: 'Critical Hospitals & Assets' }
                ].map((l) => {
                  const isChecked = layers[l.key as keyof MapLayerState];
                  return (
                    <button
                      key={l.key}
                      onClick={() => toggleLayer(l.key as keyof MapLayerState)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                        isLightMode
                          ? 'hover:bg-slate-100 text-slate-700'
                          : 'hover:bg-slate-800/80 text-slate-300'
                      }`}
                    >
                      <span className="text-xs">{l.label}</span>
                      <span
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-400 text-white'
                            : isLightMode
                            ? 'border-slate-300 bg-slate-100'
                            : 'border-slate-600 bg-slate-950'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Zoom In */}
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className={`p-2.5 backdrop-blur-md border rounded-xl shadow-xl transition-all ${
            isLightMode
              ? 'bg-white/95 border-slate-200 text-slate-700 hover:bg-slate-50'
              : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className={`p-2.5 backdrop-blur-md border rounded-xl shadow-xl transition-all ${
            isLightMode
              ? 'bg-white/95 border-slate-200 text-slate-700 hover:bg-slate-50'
              : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {/* Reset View to North East */}
        <button
          onClick={handleReset}
          title="Reset Map to Full North-East India View"
          className={`p-2.5 backdrop-blur-md border rounded-xl shadow-xl transition-all ${
            isLightMode
              ? 'bg-white/95 border-slate-200 text-slate-700 hover:bg-slate-50'
              : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Bottom Center Quick State Switcher Bar */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-auto backdrop-blur-md border rounded-2xl p-1.5 shadow-2xl flex items-center gap-1.5 overflow-x-auto max-w-[95vw] scrollbar-none transition-colors ${
          isLightMode ? 'bg-white/95 border-slate-200' : 'bg-slate-950/95 border-slate-800'
        }`}
      >
        <button
          onClick={() => handleSelectState('ALL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all flex items-center gap-1.5 ${
            selectedStateFilter === 'ALL'
              ? 'bg-emerald-600 text-white shadow-md'
              : isLightMode
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>All 8 States ({locations.length})</span>
        </button>

        <div className={`h-4 w-px ${isLightMode ? 'bg-slate-300' : 'bg-slate-700'} shrink-0`} />

        {LEAFLET_STATE_POLYGONS.map((st) => {
          const isCurrentState = selectedStateFilter === st.name;
          const locCount = locations.filter((l) => l.state === st.name).length;
          const stateWarnings = locations.filter((l) => l.state === st.name && l.prediction.riskLevel === 'WARNING').length;
          const stateWatches = locations.filter((l) => l.state === st.name && l.prediction.riskLevel === 'WATCH').length;

          return (
            <button
              key={st.name}
              onClick={() => handleSelectState(st.name)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-all flex items-center gap-1.5 ${
                isCurrentState
                  ? 'bg-emerald-600 text-white font-bold shadow-md ring-2 ring-emerald-400/50'
                  : isLightMode
                  ? 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor:
                    stateWarnings > 0 ? '#ef4444' : stateWatches > 0 ? '#f59e0b' : '#10b981'
                }}
              />
              <span>{st.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  isCurrentState
                    ? 'bg-emerald-700/60 text-emerald-100'
                    : stateWarnings > 0
                    ? 'bg-rose-100 text-rose-700'
                    : isLightMode
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {locCount}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
