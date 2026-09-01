/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopNav } from './components/layout/TopNav';
import { Sidebar, ActiveTab } from './components/layout/Sidebar';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { SettingsModal } from './components/layout/SettingsModal';
import { DeveloperModal } from './components/layout/DeveloperModal';

import { GISMap } from './components/map/GISMap';
import { LocationIntelligencePanel } from './components/location/LocationIntelligencePanel';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { StateDistrictExplorer } from './components/explorer/StateDistrictExplorer';
import { RainfallTriggerView } from './components/rainfall/RainfallTriggerView';
import { InfrastructureExposureView } from './components/infrastructure/InfrastructureExposureView';
import { AlertsCenter } from './components/alerts/AlertsCenter';
import { AlertSubscription } from './components/alerts/AlertSubscription';
import { HistoricalAnalysisView } from './components/history/HistoricalAnalysisView';
import { ModelIntelligenceView } from './components/model/ModelIntelligenceView';
import { DataStatusView } from './components/data-status/DataStatusView';

import { MonitoredLocation, NERState } from './types/location';
import { AlertItem, SystemNotification } from './types/alert';
import { SystemSettingsState } from './types/config';

import { locationService } from './services/locationService';
import { alertService } from './services/alertService';
import { PredictionEngine } from './services/predictionService';

export default function App() {
  // State management
  const [locations, setLocations] = useState<MonitoredLocation[]>(() =>
    locationService.getAllLocations()
  );
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedLocation, setSelectedLocation] = useState<MonitoredLocation | null>(null);
  const [isLocationPanelOpen, setIsLocationPanelOpen] = useState(false);

  const [selectedState, setSelectedState] = useState<NERState>('Sikkim');
  const [mapRiskFilter, setMapRiskFilter] = useState('ALL');
  const [mapStateFilter, setMapStateFilter] = useState('ALL');

  const [alerts, setAlerts] = useState<AlertItem[]>(() => alertService.getAllAlerts());
  const [notifications, setNotifications] = useState<SystemNotification[]>(() =>
    alertService.getNotifications()
  );

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDevGuideModalOpen, setIsDevGuideModalOpen] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>(() =>
    new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST'
  );

  // User & System Configuration
  const [settings, setSettings] = useState<SystemSettingsState>({
    theme: 'light',
    riskThresholds: {
      normalMax: 39,
      watchMax: 69,
      warningMin: 70,
      susceptibilityWeight: 0.45,
      rainfallWeight: 0.4,
      exposureWeight: 0.15
    },
    mapStyle: 'osm-standard',
    autoRefreshIntervalSeconds: 60,
    soundAlertsEnabled: true,
    demoMode: true,
    liveSimulationActive: true
  });

  const isLightMode = settings.theme === 'light';

  const handleToggleLightMode = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const stateStats = locationService.getAllStatesSummary();
  const warningLocations = locations.filter((l) => l.prediction.riskLevel === 'WARNING');
  const watchLocations = locations.filter((l) => l.prediction.riskLevel === 'WATCH');

  // Handle Location Selection
  const handleSelectLocation = (loc: MonitoredLocation) => {
    setSelectedLocation(loc);
    setIsLocationPanelOpen(true);
  };

  // Manual Refresh & Data Sync
  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLocations([...locationService.getAllLocations()]);
      setAlerts(alertService.getAllAlerts());
      setNotifications(alertService.getNotifications());
      setLastUpdated(
        new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST'
      );
      setIsRefreshing(false);
    }, 600);
  };

  // Simulate Sudden Monsoon Storm Surge Action
  const handleTriggerDemoSurge = () => {
    // Pick a watch location to spike into warning (e.g. Cherrapunji or Kohima)
    const targetLoc =
      locations.find((l) => l.id === 'MEG_001') ||
      locations.find((l) => l.id === 'NAG_001') ||
      locations[0];

    if (!targetLoc) return;

    // Simulate extreme 24h rainfall spike
    const updatedRainfall = {
      ...targetLoc.rainfall,
      today: 285.4,
      last3Days: 460.0,
      last7Days: 610.0,
      antecedentRainfallIndex: 94.0,
      triggerLevel: 'CRITICAL' as const
    };

    const newPrediction = PredictionEngine.evaluateRisk(
      targetLoc.environmental,
      updatedRainfall,
      targetLoc.exposure,
      settings.riskThresholds
    );

    const updatedLoc: MonitoredLocation = {
      ...targetLoc,
      rainfall: updatedRainfall,
      prediction: newPrediction,
      lastUpdated: new Date().toISOString()
    };

    locationService.updateLocation(updatedLoc);
    setLocations([...locationService.getAllLocations()]);
    setSelectedLocation(updatedLoc);
    setIsLocationPanelOpen(true);

    // Broadcast emergency alert & dispatch mock SMS
    alertService.broadcastAlertForLocation(
      updatedLoc,
      'WARNING',
      'MONSOON SURGE SIMULATION: Extreme convective cloudburst (285 mm / 24h) triggered critical slope failure warning.'
    );

    setAlerts(alertService.getAllAlerts());
    setNotifications(alertService.getNotifications());
    setLastUpdated(
      new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST'
    );
  };

  // Auto-refresh polling timer
  useEffect(() => {
    if (settings.autoRefreshIntervalSeconds <= 0) return;
    const interval = setInterval(() => {
      setLastUpdated(
        new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST'
      );
    }, settings.autoRefreshIntervalSeconds * 1000);
    return () => clearInterval(interval);
  }, [settings.autoRefreshIntervalSeconds]);

  return (
    <div
      className={`flex flex-col h-screen w-screen overflow-hidden font-sans antialiased transition-colors ${
        isLightMode ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* 1. Global Top Navigation Header */}
      <TopNav
        locations={locations}
        onSelectLocation={handleSelectLocation}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenDevGuide={() => setIsDevGuideModalOpen(true)}
        notifications={notifications}
        lastUpdated={lastUpdated}
        onManualRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
        onTriggerDemoSurge={handleTriggerDemoSurge}
        isLightMode={isLightMode}
        onToggleLightMode={handleToggleLightMode}
      />

      {/* 2. Main Body Container: Sidebar + Active View Workspace + Slideout Intelligence Panel */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Nav */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'settings') {
              setIsSettingsModalOpen(true);
            }
          }}
          activeWarningsCount={warningLocations.length}
          activeWatchesCount={watchLocations.length}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isLightMode={isLightMode}
        />

        {/* Central Operational Viewport */}
        <main
          className={`flex-1 overflow-hidden relative transition-colors ${
            isLightMode ? 'bg-slate-50' : 'bg-slate-950'
          }`}
        >
          {/* VIEW 1: Overview Dashboard */}
          {activeTab === 'dashboard' && (
            <OverviewDashboard
              locations={locations}
              activeAlerts={alerts.filter((a) => a.status === 'ACTIVE')}
              stateStats={stateStats}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onFilterRiskOnMap={(risk) => {
                setMapRiskFilter(risk);
                setMapStateFilter('ALL');
              }}
              onSelectLocation={handleSelectLocation}
              onSelectState={(st) => {
                setSelectedState(st);
                setMapStateFilter(st);
              }}
              isLightMode={isLightMode}
            />
          )}

          {/* VIEW 2: Live GIS Map */}
          {activeTab === 'map' && (
            <div className="w-full h-full relative">
              <GISMap
                locations={locations}
                selectedLocation={selectedLocation}
                onSelectLocation={handleSelectLocation}
                mapTileStyle={isLightMode ? 'osm-standard' : settings.mapStyle}
                selectedStateFilter={mapStateFilter}
                selectedRiskFilter={mapRiskFilter}
                onStateFilterChange={(st) => setMapStateFilter(st)}
                isLightMode={isLightMode}
              />
            </div>
          )}

          {/* VIEW 3: Location Intelligence (Direct full viewport mode) */}
          {activeTab === 'location' && (
            <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
              <div className="flex-1 h-1/2 lg:h-full relative">
                <GISMap
                  locations={locations}
                  selectedLocation={selectedLocation || locations[0]}
                  onSelectLocation={handleSelectLocation}
                  mapTileStyle={isLightMode ? 'osm-standard' : settings.mapStyle}
                  selectedStateFilter="ALL"
                  selectedRiskFilter="ALL"
                  onStateFilterChange={(st) => setMapStateFilter(st)}
                  isLightMode={isLightMode}
                />
              </div>
              <div className="w-full lg:w-96 xl:w-[460px] h-1/2 lg:h-full">
                <LocationIntelligencePanel
                  location={selectedLocation || locations[0]}
                  onClose={() => setActiveTab('dashboard')}
                  onOpenHistoryView={(loc) => {
                    setSelectedLocation(loc);
                    setActiveTab('history');
                  }}
                  onOpenSubscribeView={() => setActiveTab('subscribe')}
                  onAlertDispatched={() => {
                    setAlerts(alertService.getAllAlerts());
                    setNotifications(alertService.getNotifications());
                  }}
                  isLightMode={isLightMode}
                />
              </div>
            </div>
          )}

          {/* VIEW 4: State & District Explorer */}
          {activeTab === 'explorer' && (
            <StateDistrictExplorer
              locations={locations}
              selectedState={selectedState}
              onSelectState={setSelectedState}
              onSelectLocation={handleSelectLocation}
              onViewOnMap={(st) => {
                setMapStateFilter(st);
                setActiveTab('map');
              }}
              isLightMode={isLightMode}
            />
          )}

          {/* VIEW 5: Rainfall & Trigger Dynamics */}
          {activeTab === 'rainfall' && (
            <RainfallTriggerView
              locations={locations}
              selectedLocation={selectedLocation || locations[0]}
              onSelectLocation={handleSelectLocation}
            />
          )}

          {/* VIEW 6: Infrastructure Exposure */}
          {activeTab === 'infrastructure' && (
            <InfrastructureExposureView
              locations={locations}
              onSelectLocation={handleSelectLocation}
            />
          )}

          {/* VIEW 7: Alerts Center & Dispatch */}
          {activeTab === 'alerts' && (
            <AlertsCenter
              alerts={alerts}
              locations={locations}
              onRefreshAlerts={() => {
                setAlerts(alertService.getAllAlerts());
                setNotifications(alertService.getNotifications());
              }}
              onSelectLocation={(loc) => {
                handleSelectLocation(loc);
                setActiveTab('map');
              }}
              isLightMode={isLightMode}
            />
          )}

          {/* VIEW 8: SMS Subscription */}
          {activeTab === 'subscribe' && (
            <AlertSubscription
              locations={locations}
              onSubscriberAdded={() => {
                setAlerts(alertService.getAllAlerts());
                setNotifications(alertService.getNotifications());
              }}
              isLightMode={isLightMode}
            />
          )}

          {/* VIEW 9: Historical Analysis */}
          {activeTab === 'history' && (
            <HistoricalAnalysisView
              locations={locations}
              selectedLocation={selectedLocation || locations[0]}
              onSelectLocation={handleSelectLocation}
            />
          )}

          {/* VIEW 10: Model Intelligence (GeoAI & XAI) */}
          {activeTab === 'model' && <ModelIntelligenceView />}

          {/* VIEW 11: Data Source Status */}
          {activeTab === 'data-status' && (
            <DataStatusView
              onManualRefresh={handleManualRefresh}
              isRefreshing={isRefreshing}
              lastUpdated={lastUpdated}
            />
          )}
        </main>

        {/* 3. Slideout Location Intelligence Panel (When triggered on Map/Dashboard) */}
        {isLocationPanelOpen && activeTab !== 'location' && (
          <div className="absolute right-0 top-0 bottom-0 z-30 shadow-2xl animate-in slide-in-from-right duration-200">
            <LocationIntelligencePanel
              location={selectedLocation}
              onClose={() => setIsLocationPanelOpen(false)}
              onOpenHistoryView={(loc) => {
                setSelectedLocation(loc);
                setIsLocationPanelOpen(false);
                setActiveTab('history');
              }}
              onOpenSubscribeView={() => {
                setIsLocationPanelOpen(false);
                setActiveTab('subscribe');
              }}
              onAlertDispatched={() => {
                setAlerts(alertService.getAllAlerts());
                setNotifications(alertService.getNotifications());
              }}
              isLightMode={isLightMode}
            />
          </div>
        )}
      </div>

      {/* 4. Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          alertService.markAllNotificationsAsRead();
          setNotifications(alertService.getNotifications());
        }}
        onSelectLocationId={(id) => {
          const loc = locationService.getLocationById(id);
          if (loc) handleSelectLocation(loc);
        }}
      />

      {/* 5. System Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onUpdateSettings={(newVals) => {
          setSettings((prev) => ({ ...prev, ...newVals }));
        }}
        onResetDefaults={() => {
          setSettings({
            theme: 'dark',
            riskThresholds: {
              normalMax: 39,
              watchMax: 69,
              warningMin: 70,
              susceptibilityWeight: 0.45,
              rainfallWeight: 0.4,
              exposureWeight: 0.15
            },
            mapStyle: 'carto-dark',
            autoRefreshIntervalSeconds: 60,
            soundAlertsEnabled: true,
            demoModeActive: true
          });
        }}
      />

      {/* 6. Developer & SIH Hackathon Guide Modal */}
      <DeveloperModal
        isOpen={isDevGuideModalOpen}
        onClose={() => setIsDevGuideModalOpen(false)}
      />
    </div>
  );
}
