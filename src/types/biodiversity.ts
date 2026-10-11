export type TaxonomicGroup =
  | 'Kuş'
  | 'Kelebek'
  | 'Uğur Böceği'
  | 'Karınca'
  | 'Diğer Böcek';

export type EcologicalRole =
  | 'Tozlaştırıcı (Polinatör)'
  | 'Zararlı Kontrolcüsü (Biyolojik Mücadele)'
  | 'Ayrıştırıcı & Toprak Mühendisi'
  | 'Tohum Dağıtıcı & Böcekçil';

export type SeasonTransition =
  | 'Eylül-Kasım (Sonbahar Geçişi)'
  | 'Mart-Mayıs (İlkbahar Geçişi)';

export type MonthName =
  | 'Eylül'
  | 'Ekim'
  | 'Kasım'
  | 'Mart'
  | 'Nisan'
  | 'Mayıs';

export type IUCNStatusCode =
  | 'LC (Asgari Endişe - Soyu Tehlikede Değil)'
  | 'NT (Tehdide Yakın - Koruma Gerektiren)'
  | 'VU (Duyarlı / Hassas Tür)'
  | 'EN (Nesli Tehlikede)'
  | 'CR (Kritik Tehlikede)';

export type SafetyClassification =
  | 'Tamamen Zararsız & Ekosistem Dostu'
  | 'İnsana Zararsız · Biyolojik Mücadele Ajanı'
  | 'Dikkatli Gözlemlenmeli (Savunma / Alerji Riski)'
  | 'Bitki / Tarım Zararlısı Olabilir';

export type TrophicLevel =
  | '1. Derece Tüketici (Otçul / Nektarivor / Tohumcul)'
  | '2. Derece Tüketici (Etçil / Böcekçil Avcı)'
  | 'Hem Etçil Hem Otçul (Omnivor Tüketici)'
  | 'Ayrıştırıcı & Detritivor (Madde Döngüsü Mühendisi)';

export interface SimilarSpeciesItem {
  commonNameTr: string;
  scientificName: string;
  distinguishingFeature: string; // Bu türden nasıl ayırt edilir?
  whereItLives: string; // Benzer tür nerelerde yaşar?
  ecologicalRole?: EcologicalRole;
}

export interface CampusZone {
  id: string;
  code: string;
  name: string;
  streetAddressNote: string;
  lat: number; // Real latitude in Kapaklı / Tekirdağ
  lng: number; // Real longitude in Kapaklı / Tekirdağ
  vegetationDensity: number; // % (0-100)
  dominantFlora: string;
  microClimateNote: string;
  avgAutumnTemp: number; // °C
  avgSpringTemp: number; // °C
  polygonPoints: string; // SVG polygon points on 1000x620 canvas
  geoPolygon: [number, number][]; // Real GPS polygon coordinates around Yıldızkent Ortaokulu
  centerX: number;
  centerY: number;
  soilType: string;
}

export interface FoodChainLink {
  producerSource: string; // Üretici basamağı (Bitki, çiçek nektarı, yaprak, tohum)
  lowerTrophic: string; // Av / Besin Kaynağı: Ne ile beslenir?
  speciesNode: string; // Gözlemlenen tür ve trofik düzeyi
  upperTrophic: string; // Avcı (Predatör): Kimler onunla beslenir?
  trophicLevel: TrophicLevel;
  predatorPreySummary: string; // Av-Avcı ilişkisi ve besin zincirinden çıkarsa ne olacağı (8. Sınıf Kazanımı)
  ecosystemServiceSummary: string; // Ekosisteme net katkısı
}

export interface CurriculumAlignment {
  grade5Biocenosis: string; // 5. Sınıf F.5.6.1 Biyoçeşitlilik, habitat ve nesli tükenme tehditleri kazanım bağlantısı
  grade8FoodWeb: string; // 8. Sınıf F.8.6.1 Besin zinciri, üretici-tüketici-ayrıştırıcı, av-avcı ve enerji akışı kazanım bağlantısı
}

export interface SpeciesObservation {
  id: string;
  commonNameTr: string;
  scientificName: string;
  family: string;
  taxonomicGroup: TaxonomicGroup;
  ecologicalRole: EcologicalRole;
  seasonTransition: SeasonTransition;
  month: MonthName;
  observedDate: string;
  temperatureC: number;
  humidityPercent: number;
  vegetationDensityPercent: number;
  zoneId: string;
  zoneName: string;
  locationLabel: string; // Örn: "73. Sokak No:7 Güney Bahçe Tarhı, Kapaklı/Tekirdağ"
  lat: number; // Gerçek Enlem (Kapaklı / Tekirdağ)
  lng: number; // Gerçek Boylam (Kapaklı / Tekirdağ)
  mapX: number; // 0-1000 coordinate on school schematic map
  mapY: number; // 0-620 coordinate on school schematic map
  individualCount: number;
  observerStudent: string;
  studentClass: string;
  imageUrl?: string;
  // Yeni Biyolojik & Ekolojik Alanlar
  iucnStatus: IUCNStatusCode;
  extinctionRiskNote: string; // Nesli tükenme durumu ve Trakya/Türkiye popülasyon eğilimi
  safetyClassification: SafetyClassification;
  safetyAndHumanImpact: string; // Zararlı mı zararsız mı? İnsana ve bahçeye etkisi
  whereItLives: string; // Nerelerde yaşar? (Habitat & Coğrafi dağılım)
  whatItEats: string; // Ne yer? (Detaylı diyet)
  similarSpecies: SimilarSpeciesItem[]; // Benzerleri ve nerede yaşadıkları
  verificationChecklist?: string[]; // Öğrenci teşhis doğrulama soruları
  verifiedByStudent: boolean;
  curriculumAlignment: CurriculumAlignment;
  foodChain: FoodChainLink;
  temperatureToleranceRange: string;
  vegetationRelationship: string;
  morphologicalNotes: string;
  conservationTip: string;
  confidenceScore: number;
}

export interface AIIdentificationResult {
  commonNameTr: string;
  scientificName: string;
  family: string;
  taxonomicGroup: TaxonomicGroup;
  ecologicalRole: EcologicalRole;
  confidenceScore: number;
  iucnStatus: IUCNStatusCode;
  extinctionRiskNote: string;
  safetyClassification: SafetyClassification;
  safetyAndHumanImpact: string;
  whereItLives: string;
  whatItEats: string;
  similarSpecies: SimilarSpeciesItem[];
  verificationChecklist: string[];
  curriculumAlignment: CurriculumAlignment;
  foodChain: FoodChainLink;
  temperatureToleranceRange: string;
  vegetationRelationship: string;
  morphologicalNotes: string;
  conservationTip: string;
}

export interface TubitakResearchReport {
  title: string;
  hypothesisEvaluation: string;
  seasonalComparisonSummary: string;
  temperatureCorrelationFinding: string;
  vegetationDensityFinding: string;
  foodWebBalanceAssessment: string;
  grade5And8CurriculumSynthesis: string;
  recommendationsForSchoolCampus: string[];
}
