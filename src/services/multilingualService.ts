export type SupportedLanguage = 'en' | 'as' | 'hi' | 'mni' | 'lus' | 'bn';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', region: 'All India / National' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', region: 'Assam / Brahmaputra Valley' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'National' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্', region: 'Manipur' },
  { code: 'lus', name: 'Mizo', nativeName: 'Mizo ṭawng', region: 'Mizoram' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'Tripura / Barak Valley' }
];

export interface NotificationTemplate {
  criticalAlertTitle: string;
  warningAlertTitle: string;
  watchAlertTitle: string;
  evacuationNotice: string;
  slopeInstabilityNotice: string;
  roadBlockageNotice: string;
  safetyAction1: string;
  safetyAction2: string;
  safetyAction3: string;
  helplineNotice: string;
  offlineStatus: string;
}

export const NOTIFICATION_TRANSLATIONS: Record<SupportedLanguage, NotificationTemplate> = {
  en: {
    criticalAlertTitle: 'CRITICAL LANDSLIDE EMERGENCY ALERT',
    warningAlertTitle: 'HIGH RISK LANDSLIDE WARNING',
    watchAlertTitle: 'EARLY LANDSLIDE WATCH & ADVISORY',
    evacuationNotice: 'IMMEDIATE EVACUATION RECOMMENDED: Heavy rainfall saturation has exceeded critical geotechnical thresholds. Move to designated relief shelters away from slope toe.',
    slopeInstabilityNotice: 'Tension cracks, soil liquefaction, and water seepage detected on hill slope face. Severe hazard of mass movement.',
    roadBlockageNotice: 'HIGHWAY CLOSED / SEVERE ROAD RESTRICTION: Active rockfall and mudflow reported. Avoid transit along mountain corridors.',
    safetyAction1: 'Stay alert to strange sounds such as trees cracking or boulders knocking together.',
    safetyAction2: 'Never stay near mountain streams or river channels during torrential downpours.',
    safetyAction3: 'Keep emergency torch, first aid, water, and identity documents packed in waterproof kit.',
    helplineNotice: 'Toll-free State Emergency Operations Centre (SEOC) Helpline: 1070 / 1077 (NDRF / SDRF)',
    offlineStatus: 'Offline Cache Active. Telemetry and emergency dispatches saved locally.'
  },
  as: {
    criticalAlertTitle: 'জৰুৰী ভূস্খলন বিপদৰ সতৰ্কবাৰ্তা',
    warningAlertTitle: 'উচ্চ বিপদজনক ভূস্খলন সতৰ্কবাৰ্তা',
    watchAlertTitle: 'ভূস্খলন নিৰীক্ষণ আৰু পৰামৰ্শ',
    evacuationNotice: 'অবিলম্ব স্থানান্তৰৰ নিৰ্দেশ: অত্যাধিক বৰষুণৰ ফলত পাহাৰৰ মাটি বিপজ্জনকভাৱে শিথিল হৈ পৰিছে। পাহাৰৰ তলৰ পৰা নিৰাপদ আশ্ৰয় শিবিৰলৈ যাওক।',
    slopeInstabilityNotice: 'পাহাৰীয়া ভূমিত ফাঁট আৰু বোকা পানী ওলোৱা দেখা গৈছে। ডাঙৰ ভূমিস্খলনৰ তীব্ৰ আশংকা।',
    roadBlockageNotice: 'ৰাষ্ট্ৰীয় ঘাইপথ বন্ধ: শিল আৰু বোকা খহি পথ বন্ধ হৈ পৰিছে। পাহাৰীয়া পথেৰে ভ্ৰমণ নকৰিব।',
    safetyAction1: 'গছ বা শিল ভঙাৰ শব্দ শুনিলে তৎক্ষণাৎ সজাগ হওক।',
    safetyAction2: 'ধাৰাসাৰ বৰষুণৰ সময়ত নদী বা পাহাৰীয়া জান-জুৰিৰ ওচৰলৈ নাযাব।',
    safetyAction3: 'প্ৰয়োজনীয় খাদ্য, ঔষধ আৰু জৰুৰী নথিপত্ৰ সুৰক্ষিতভাৱে লগত ৰাখক।',
    helplineNotice: 'ৰাজ্যিক দুৰ্যোগ ব্যৱস্থাপনা সাহায্য নম্বৰ: ১০৭০ / ১০৭৭ (SDRF/NDRF)',
    offlineStatus: 'অফলাইন মেমৰী সক্ৰিয়। তথ্য আৰু ফোন নম্বৰ স্থানীয়ভাৱে সংৰক্ষিত।'
  },
  hi: {
    criticalAlertTitle: 'अत्यंत गंभीर भूस्खलन आपातकालीन चेतावनी',
    warningAlertTitle: 'उच्च जोखिम भूस्खलन चेतावनी',
    watchAlertTitle: 'भूस्खलन प्रारंभिक निगरानी एवं परामर्श',
    evacuationNotice: 'तत्काल निकासी की सलाह: अत्यधिक बारिश के कारण ढलान अस्थिर हो गई है। ढलान के निचले हिस्से से सुरक्षित राहत शिविरों में तुरंत जाएं।',
    slopeInstabilityNotice: 'पहाड़ी ढलानों पर दरारें और पानी का तेज रिसाव देखा गया है। बड़े भूस्खलन का गंभीर खतरा।',
    roadBlockageNotice: 'राजमार्ग बंद / गंभीर अवरोध: भारी मलबे और चट्टानों के गिरने की सूचना है। पहाड़ी मार्गों पर यात्रा न करें।',
    safetyAction1: 'पेड़ों के टूटने या पत्थरों के गिरने की आवाज पर तुरंत सतर्क हों।',
    safetyAction2: 'तेज मूसलाधार बारिश के दौरान नदी-नालों और जलधाराओं से दूर रहें।',
    safetyAction3: 'आपातकालीन टॉर्च, प्राथमिक चिकित्सा और जरूरी दस्तावेज सुरक्षित रखें।',
    helplineNotice: 'राज्य आपदा नियंत्रण कक्ष हेल्पलाइन: 1070 / 1077 (NDRF / SDRF)',
    offlineStatus: 'ऑफ़लाइन मोड सक्रिय। सभी डेटा और टेलीमेट्री डिवाइस में सुरक्षित हैं।'
  },
  mni: {
    criticalAlertTitle: 'অকনবা চিং ঈচাও / চিংশিৎ অমুক্লকপগী এলার্ট',
    warningAlertTitle: 'অকনবা চিংশিৎকী ৱাৰ্নিং',
    watchAlertTitle: 'চিংশিৎ মমল নিংশিং এদভাইজরি',
    evacuationNotice: 'য়াম্না থুনা নিংথম তৌবা য়াবা মফমদা চৎলু: নোং য়াম্না চুগনবা মরম্না চিংমৈ লেপতুনা য়াম্না খুদোংথিবা ওইরে। মীয়াম য়াম্না থুনা রিলিফ কেম্পতা চৎপীয়ু।',
    slopeInstabilityNotice: 'চিংদা অতৈনবা অমসুং ঈশিং থোরকপা উরে। চিংশিৎ য়াম্না থুনা তারকপগী খুদোংথিবা লৈ।',
    roadBlockageNotice: 'লম্বী থিংজিল্লে: চিংগী নুং অমসুং লৈমোন তারকপদগী লম্বী চৎপা য়ারোই।',
    safetyAction1: 'উ-পা অমসুং নুং তাথরকপগী খোন্থোক তাবদা চেকশিন্না লৈয়ু।',
    safetyAction2: 'নোং কননা চুরিংঙৈদা তুরেল অমসুং তোরেল মপাংদা চৎকনু।',
    safetyAction3: 'ইমার্জেন্সি কিট, হিদাক-লাংথক অমসুং অফবা চেকশিনবা লৌখৎলু।',
    helplineNotice: 'ষ্টেট ইমার্জেন্সি কন্ত্রোল হেল্পলাইন: ১০৭০ / ১০৭৭',
    offlineStatus: 'ওফলাইন মোদ চৎলি। দেতাশিং পোকেততা সেভ তৌরে।'
  },
  lus: {
    criticalAlertTitle: 'LEI MIN CHHIAHNA RANG HMALAKNA WARNING',
    warningAlertTitle: 'LEI MIN HLUAWM ZUAL HNENAH HRIATTIRNA',
    watchAlertTitle: 'LEI MIN VENCHHIAHNA HRIATTIRNA',
    evacuationNotice: 'INCHHIAH CHHUAH NGAI A NI: Ruah a sur nasat avangin tlang pang a nghing tawh. In awmna atanga hmun him, relief shelter lamah rang takin insawn rawh u.',
    slopeInstabilityNotice: 'Tlang pang khi leh tui chhuak a awm. Lei min lian tham tak a thleng thut thei.',
    roadBlockageNotice: 'KAWLPUIPU LIKKHAWNA KHALH A NI: Lung leh chirh a tlak avangin lirthei kal tlang theih a ni lo.',
    safetyAction1: 'Thing tliak ri leh lung thil ri ngaihven reng ang che.',
    safetyAction2: 'Ruahpui sur laiin luite leh luipui kamah awm suh.',
    safetyAction3: 'Emergency khawnvar, damdawi leh pawimawh thil humhim ang che.',
    helplineNotice: 'Disaster Management Helpline: 1070 / 1077',
    offlineStatus: 'Offline hmanga hman mek a ni. Data vawnṭhat a ni e.'
  },
  bn: {
    criticalAlertTitle: 'জরুরী ভূমিধস বিপদের সতর্কবার্তা',
    warningAlertTitle: 'উচ্চ ঝুঁকিপূর্ণ ভূমিধস সতর্কতা',
    watchAlertTitle: 'ভূমিধস পূর্বাভাস ও পরামর্শ',
    evacuationNotice: 'অবিলম্বে নিরাপদ আশ্রয়ে যান: অতিবৃষ্টির কারণে পাহাড়ের ঢাল বিপজ্জনকভাবে ধসে পড়ার মুখে। পাহাড়ের পাদদেশ ছেড়ে নিরাপদ আশ্রয়কেন্দ্রে চলে যান।',
    slopeInstabilityNotice: 'পাহাড়ের গায়ে গভীর ফাটল ও কাদাজল বেরোতে দেখা গেছে। ব্যাপক ভূমিধসের তীব্র আশঙ্কা।',
    roadBlockageNotice: 'জাতীয় সড়ক অবরুদ্ধ: পাথর ও কাদা ধসে রাস্তা বন্ধ হয়ে গেছে। পাহাড়ি পথে ভ্রমণ সম্পূর্ণ নিষেধ।',
    safetyAction1: 'গাছ মচকে যাওয়া বা পাথর পড়ার শব্দ শুনলেই সতর্ক হন।',
    safetyAction2: 'ভারী বৃষ্টির সময় পাহাড়ি নদী বা ঝর্ণার কাছে থাকবেন না।',
    safetyAction3: 'জরুরী খাদ্য, ওষুধপত্র এবং পরিচয়পত্র সাথে রাখুন।',
    helplineNotice: 'রাজ্য বিপর্যয় মোকাবিলা হেল্পলাইন: ১০৭০ / ১০৭৭',
    offlineStatus: 'অফলাইন মোড সক্রিয়। ডেটা ডিভাইসে সংরক্ষিত আছে।'
  }
};

export class MultilingualService {
  private static currentLanguage: SupportedLanguage = 'en';

  public static getLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  public static setLanguage(lang: SupportedLanguage) {
    this.currentLanguage = lang;
  }

  public static getTemplate(lang: SupportedLanguage = this.currentLanguage): NotificationTemplate {
    return NOTIFICATION_TRANSLATIONS[lang] || NOTIFICATION_TRANSLATIONS.en;
  }

  public static formatSMSAlert(
    locationName: string,
    stateName: string,
    riskLevel: 'WARNING' | 'WATCH' | 'CRITICAL',
    rainfallMm: number,
    lang: SupportedLanguage = this.currentLanguage
  ): string {
    const t = this.getTemplate(lang);
    if (riskLevel === 'CRITICAL' || riskLevel === 'WARNING') {
      return `[${t.criticalAlertTitle}] ${locationName}, ${stateName}. 24h Rain: ${rainfallMm}mm. ${t.evacuationNotice} Helpline: 1070.`;
    }
    return `[${t.watchAlertTitle}] ${locationName}, ${stateName}. 24h Rain: ${rainfallMm}mm. ${t.slopeInstabilityNotice} Helpline: 1070.`;
  }
}
