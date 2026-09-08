import { MonitoredLocation } from '../types/location';
import { MEGHALAYA_LOCATIONS } from './states/meghalaya';
import { SIKKIM_LOCATIONS } from './states/sikkim';
import { ARUNACHAL_LOCATIONS } from './states/arunachal';
import { ASSAM_LOCATIONS } from './states/assam';
import { MANIPUR_LOCATIONS } from './states/manipur';
import { MIZORAM_LOCATIONS } from './states/mizoram';
import { NAGALAND_LOCATIONS } from './states/nagaland';
import { TRIPURA_LOCATIONS } from './states/tripura';

export {
  MEGHALAYA_LOCATIONS,
  SIKKIM_LOCATIONS,
  ARUNACHAL_LOCATIONS,
  ASSAM_LOCATIONS,
  MANIPUR_LOCATIONS,
  MIZORAM_LOCATIONS,
  NAGALAND_LOCATIONS,
  TRIPURA_LOCATIONS
};

export const LOCATIONS_BY_STATE: Record<string, MonitoredLocation[]> = {
  'Meghalaya': MEGHALAYA_LOCATIONS,
  'Sikkim': SIKKIM_LOCATIONS,
  'Arunachal Pradesh': ARUNACHAL_LOCATIONS,
  'Assam': ASSAM_LOCATIONS,
  'Manipur': MANIPUR_LOCATIONS,
  'Mizoram': MIZORAM_LOCATIONS,
  'Nagaland': NAGALAND_LOCATIONS,
  'Tripura': TRIPURA_LOCATIONS
};

export const ALL_STATE_LOCATIONS: MonitoredLocation[] = [
  ...MEGHALAYA_LOCATIONS,
  ...SIKKIM_LOCATIONS,
  ...ARUNACHAL_LOCATIONS,
  ...ASSAM_LOCATIONS,
  ...MANIPUR_LOCATIONS,
  ...MIZORAM_LOCATIONS,
  ...NAGALAND_LOCATIONS,
  ...TRIPURA_LOCATIONS
];

export const NER_STATES = [
  'Meghalaya',
  'Sikkim',
  'Arunachal Pradesh',
  'Assam',
  'Manipur',
  'Mizoram',
  'Nagaland',
  'Tripura'
] as const;
