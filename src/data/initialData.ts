import { CampusZone, SpeciesObservation } from '../types/biodiversity';
import ladybugImg from '../assets/images/specimen_ladybug_1791214144571.jpg';
import butterflyImg from '../assets/images/specimen_butterfly_1791214156978.jpg';
import greatTitImg from '../assets/images/specimen_great_tit_1791214170035.jpg';
import harvesterAntImg from '../assets/images/specimen_harvester_ant_1791214181512.jpg';

export const YILDIZKENT_SCHOOL_CENTER = {
  lat: 41.32017,
  lng: 27.96703,
  address: 'Yıldızkent, 73. Sokağı No:7, 59510 Kapaklı / Tekirdağ',
  googleMapsUrl:
    'https://www.google.com/maps/place/Y%C4%B1ld%C4%B1zkent+Ortaokulu/@41.3201698,27.9670334,18z',
};

export const PRESET_SPECIMEN_IMAGES = {
  ladybug: ladybugImg,
  butterfly: butterflyImg,
  greatTit: greatTitImg,
  harvesterAnt: harvesterAntImg,
};

export const YILDIZKENT_CAMPUS_ZONES: CampusZone[] = [
  {
    id: 'zone-a',
    code: 'BÖLGE A',
    name: 'Güney Çiçekli Bahçe & 73. Sokak Giriş Tarhı',
    streetAddressNote: 'Yıldızkent Mah. 73. Sokak No:7 Güney Giriş Cephesi, Kapaklı/Tekirdağ',
    lat: 41.31996,
    lng: 27.96694,
    vegetationDensity: 88,
    dominantFlora: 'Lavandula angustifolia (Lavanta), Biberiye, Mevsimlik Nektarlı Çiçekler, Gül',
    microClimateNote: 'Güney cephe güneşlenme süresi yüksek; Trakya rüzgârlarına karşı korunaklı sıcak nektar koridoru.',
    avgAutumnTemp: 18.8,
    avgSpringTemp: 21.4,
    polygonPoints: '140,390 430,390 450,560 120,560',
    geoPolygon: [
      [41.32005, 27.96665],
      [41.32005, 27.96718],
      [41.31982, 27.96718],
      [41.31982, 27.96665],
    ],
    centerX: 285,
    centerY: 475,
    soilType: 'Humuslu, yüksek organik maddeli bahçe toprağı',
  },
  {
    id: 'zone-b',
    code: 'BÖLGE B',
    name: 'Kuzey Çam Korusu & İğne Yapraklı Ağaçlık',
    streetAddressNote: 'Yıldızkent Ortaokulu Kuzey Cephe Ağaçlık Kuşağı, Kapaklı/Tekirdağ',
    lat: 41.32044,
    lng: 27.96688,
    vegetationDensity: 82,
    dominantFlora: 'Pinus nigra (Karaçam), Sedir, Ardıç ve Alt Örtü Yosun Katmanı',
    microClimateNote: 'Yıl boyu yaprak dökmeyen koruluk; Kapaklı poyraz rüzgârlarını kesen kuş yuvalanma ve kışlama sığınağı.',
    avgAutumnTemp: 14.5,
    avgSpringTemp: 16.2,
    polygonPoints: '120,55 520,55 500,205 140,205',
    geoPolygon: [
      [41.32058, 27.9666],
      [41.32058, 27.96722],
      [41.32032, 27.96722],
      [41.32032, 27.9666],
    ],
    centerX: 320,
    centerY: 130,
    soilType: 'İğne yaprak döküntülü, hafif asidik nemli toprak',
  },
  {
    id: 'zone-c',
    code: 'BÖLGE C',
    name: 'Doğu Meyve Ağaçları & Çalı Kuşağı',
    streetAddressNote: '73. Sokak Doğu Bahçe Sınırı ve Çalı Çitleri, Kapaklı/Tekirdağ',
    lat: 41.32024,
    lng: 27.96752,
    vegetationDensity: 74,
    dominantFlora: 'Elma, Erik, Ihlamur Ağaçları, Kuşburnu ve Ateş Dikeni Çalıları',
    microClimateNote: 'Yaprak biti ve tırtıl popülasyonu yüksek; uğur böceği ve baştankaralar için ana av-avcı alanı.',
    avgAutumnTemp: 16.9,
    avgSpringTemp: 19.3,
    polygonPoints: '560,70 890,70 910,330 570,310',
    geoPolygon: [
      [41.32048, 27.96726],
      [41.32048, 27.96782],
      [41.32006, 27.96782],
      [41.32006, 27.96726],
    ],
    centerX: 735,
    centerY: 195,
    soilType: 'Killi-tınlı, derin kök destekli Trakya toprağı',
  },
  {
    id: 'zone-d',
    code: 'BÖLGE D',
    name: 'Batı Çim Saha & Toprak Gözlem Şeridi',
    streetAddressNote: 'Yıldızkent Ortaokulu Batı Bahçe Şeridi, Kapaklı/Tekirdağ',
    lat: 41.32015,
    lng: 27.96638,
    vegetationDensity: 48,
    dominantFlora: 'Çayır Üçgülü (Trifolium), Karahindiba, Yabani Buğdaygiller',
    microClimateNote: 'Açık güneşli zemin; toprak sıcaklığı hızlı yükselir, hasatçı karınca kolonileri için ideal.',
    avgAutumnTemp: 17.8,
    avgSpringTemp: 20.0,
    polygonPoints: '55,225 270,225 265,375 50,375',
    geoPolygon: [
      [41.3203, 27.96612],
      [41.3203, 27.9666],
      [41.31995, 27.9666],
      [41.31995, 27.96612],
    ],
    centerX: 160,
    centerY: 300,
    soilType: 'Gevşek dokulu, karınca yuvalarına uygun kumlu-tınlı toprak',
  },
  {
    id: 'zone-e',
    code: 'BÖLGE E',
    name: 'Okul Binası Çevresi & Taşlık Mikro-Habitat',
    streetAddressNote: 'Yıldızkent Ortaokulu Ana Bina & Tören Alanı Kenarı (No:7), Kapaklı',
    lat: 41.32017,
    lng: 27.96703,
    vegetationDensity: 24,
    dominantFlora: 'Duvar Sarmaşığı, Taş Arası Damkoruğu (Sedum), Seyrek Çimen',
    microClimateNote: 'Beton ve taş yüzeylerin ısı tutma etkisiyle Mart ve Ekim sabahlarında erken ısınan mikro-habitat.',
    avgAutumnTemp: 16.4,
    avgSpringTemp: 18.2,
    polygonPoints: '295,220 545,220 545,370 295,370',
    geoPolygon: [
      [41.32028, 27.96678],
      [41.32028, 27.96724],
      [41.32006, 27.96724],
      [41.32006, 27.96678],
    ],
    centerX: 420,
    centerY: 295,
    soilType: 'Taşlı, sıkışmış kentsel kenar zemini',
  },
  {
    id: 'zone-f',
    code: 'BÖLGE F',
    name: 'Yıldızkent Mahalle Parkı & 73. Sokak Ekolojik Koridoru',
    streetAddressNote: 'Yıldızkent Mah. 73. Sokak & Çevre Yeşil Alan Koridoru, Kapaklı/Tekirdağ',
    lat: 41.31972,
    lng: 27.96765,
    vegetationDensity: 68,
    dominantFlora: 'Akçaağaç, Çınar, Yabani Papatya, Böğürtlen Çalıları',
    microClimateNote: 'Okul bahçesi ile Kapaklı Yıldızkent Mahallesi yeşil alanlarını birleştiren biyoçeşitlilik geçiş koridoru.',
    avgAutumnTemp: 16.7,
    avgSpringTemp: 18.9,
    polygonPoints: '485,355 915,355 930,565 475,565',
    geoPolygon: [
      [41.31998, 27.96728],
      [41.31998, 27.96805],
      [41.31952, 27.96805],
      [41.31952, 27.96728],
    ],
    centerX: 700,
    centerY: 460,
    soilType: 'Karma alüvyal ve organik park toprağı',
  },
];

export const INITIAL_OBSERVATIONS: SpeciesObservation[] = [
  {
    id: 'obs-101',
    commonNameTr: 'Yedi Noktalı Uğur Böceği',
    scientificName: 'Coccinella septempunctata',
    family: 'Coccinellidae',
    taxonomicGroup: 'Uğur Böceği',
    ecologicalRole: 'Zararlı Kontrolcüsü (Biyolojik Mücadele)',
    seasonTransition: 'Mart-Mayıs (İlkbahar Geçişi)',
    month: 'Nisan',
    observedDate: '2026-04-18',
    temperatureC: 21.4,
    humidityPercent: 54,
    vegetationDensityPercent: 74,
    zoneId: 'zone-c',
    zoneName: 'BÖLGE C · Doğu Meyve Ağaçları & Çalı Kuşağı',
    locationLabel: '73. Sokak Doğu Bahçe Elma Ağaçları, Kapaklı/Tekirdağ',
    lat: 41.32028,
    lng: 27.96748,
    mapX: 695,
    mapY: 175,
    individualCount: 9,
    observerStudent: 'Elif Kaya',
    studentClass: '7-A',
    imageUrl: ladybugImg,
    iucnStatus: 'LC (Asgari Endişe - Soyu Tehlikede Değil)',
    extinctionRiskNote:
      'Küresel ölçekte soyu tehlikede değildir (LC); ancak Trakya’da tarımsal ilaçlama (pestisit) ve istilacı Asya uğur böceği (Harmonia axyridis) rekabeti nedeniyle yerel popülasyonları korunmalıdır.',
    safetyClassification: 'İnsana Zararsız · Biyolojik Mücadele Ajanı',
    safetyAndHumanImpact:
      'İnsanlara ve öğrencilere tamamen zararsızdır; ısırmaz veya sokmaz. Bitki özsuyunu emerek ağaçları kurutan yaprak bitlerini yediği için çiftçi ve bahçe dostu en önemli faydalı böcektir.',
    whereItLives:
      'Türkiye’nin tüm bölgelerinde, Trakya’da (Tekirdağ/Kapaklı) meyve bahçelerinde, gül ve ıhlamur yapraklarında yaşar. Kışı taş altlarında, ağaç kabuğu çatlaklarında ve kuru yaprak kümelerinde geçirir.',
    whatItEats:
      'Etçil (Avcı / Karnivor): Başlıca besini yaprak bitleri (Aphidoidea), unlu bitler, koşniller ve küçük bitki akarlarıdır. Çiçek poleniyle de takviye besin alır.',
    similarSpecies: [
      {
        commonNameTr: 'Asya Uğur Böceği (Alacalı Uğur Böceği)',
        scientificName: 'Harmonia axyridis',
        distinguishingFeature:
          'Kanat üzerinde 7 yerine 0 ile 19 arasında değişen sayıda siyah nokta bulunur; başın arkasındaki beyaz alanda siyah bir "M" veya "W" harfi izi vardır.',
        whereItLives:
          'Doğu Asya kökenlidir; günümüzde Avrupa ve Trakya kentsel alanlarında, bina cephelerinde yaygınlaşmıştır.',
      },
      {
        commonNameTr: 'İki Noktalı Uğur Böceği',
        scientificName: 'Adalia bipunctata',
        distinguishingFeature:
          'Boyutu daha küçüktür (4-5 mm) ve kırmızı kanatları üzerinde yalnızca 2 adet siyah benek bulunur.',
        whereItLives:
          'Marmara ve Karadeniz başta olmak üzere ağaçlık park ve okul bahçelerinde, yüksek dallarda yaşar.',
      },
    ],
    verificationChecklist: [
      'Kırmızı üst kanatlar (elitra) üzerinde toplam 7 adet siyah benek sayılıyor mu?',
      'Siyah göğüs kalkanının (pronotum) iki ön köşesinde beyaz üçgenimsi leke var mı?',
      'Yaprak biti kolonilerinin bulunduğu bir dal veya yaprak üzerinde mi gözlemlendi?',
    ],
    verifiedByStudent: true,
    curriculumAlignment: {
      grade5Biocenosis:
        '5. Sınıf (F.5.6.1): Biyoçeşitlilikteki her canlının doğal denge için vazgeçilmez olduğunu ve kimyasal ilaçların yararlı böceklerin yaşam alanını (habitatını) tehdit ettiğini gösterir.',
      grade8FoodWeb:
        '8. Sınıf (F.8.6.1): Besin zincirinde 2. Derece Tüketici (Etçil Avcı) basamağındadır. Av (Yaprak biti) – Avcı (Uğur böceği) ilişkisiyle üretici bitkilerin aşırı tüketilmesini engeller.',
    },
    foodChain: {
      producerSource: 'Elma, Gül ve Ihlamur Ağacı Özsuyu (Üretici Bitki)',
      lowerTrophic: 'Av: Yaprak Bitleri (Aphidoidea) ve Koşniller (1. Derece Otçul Tüketici)',
      speciesNode: 'Avcı: Yedi Noktalı Uğur Böceği (2. Derece Etçil Tüketici)',
      upperTrophic: 'Üst Avcı: Büyük Baştankara Kuşu, Örümcekler ve Yarasalar (3. Derece Tüketici)',
      trophicLevel: '2. Derece Tüketici (Etçil / Böcekçil Avcı)',
      predatorPreySummary:
        'Klasik Av–Avcı (Predatör–Av) dengesi: Uğur böceği (avcı) azalırsa yaprak bitleri (av) aşırı çoğalarak okul bahçesindeki ağaçları kurutur.',
      ecosystemServiceSummary:
        'Bir birey yaşamı boyunca ~5.000 yaprak biti tüketerek Yıldızkent Ortaokulu bahçesindeki meyve ağaçlarını kimyasal ilaçsız korur.',
    },
    temperatureToleranceRange: '14°C – 28°C (12°C altında kış uykusu / diyapoz davranışına geçer)',
    vegetationRelationship:
      'Bitki örtüsü yoğunluğu %65 üzeri olan çalı ve meyve ağacı yaprak altlarında av yoğunluğuna paralel olarak kümelenir.',
    morphologicalNotes:
      'Parlak kırmızı elitra (üst kanat) üzerinde 7 adet simetrik siyah benek; pronotum kenarlarında beyaz lekeler.',
    conservationTip:
      'Sonbahar sonunda (Kasım) taş altları ve kuru yaprak kümeleri temizlenmeyerek kışlama sığınakları korunmalıdır.',
    confidenceScore: 98,
  },
  {
    id: 'obs-102',
    commonNameTr: 'Diken Kelebeği',
    scientificName: 'Vanessa cardui',
    family: 'Nymphalidae',
    taxonomicGroup: 'Kelebek',
    ecologicalRole: 'Tozlaştırıcı (Polinatör)',
    seasonTransition: 'Mart-Mayıs (İlkbahar Geçişi)',
    month: 'Mayıs',
    observedDate: '2026-05-09',
    temperatureC: 24.6,
    humidityPercent: 46,
    vegetationDensityPercent: 88,
    zoneId: 'zone-a',
    zoneName: 'BÖLGE A · Güney Çiçekli Bahçe & 73. Sokak Giriş Tarhı',
    locationLabel: '73. Sokak No:7 Güney Lavanta Tarhı, Kapaklı/Tekirdağ',
    lat: 41.31994,
    lng: 27.96691,
    mapX: 255,
    mapY: 465,
    individualCount: 7,
    observerStudent: 'Kerem Demir',
    studentClass: '8-B',
    imageUrl: butterflyImg,
    iucnStatus: 'LC (Asgari Endişe - Soyu Tehlikede Değil)',
    extinctionRiskNote:
      'Soyu tehlikede değildir (LC); ancak uzun mesafeli göçmen bir tür olduğu için iklim değişikliği kaynaklı kuraklık ve nektarlı çiçek alanlarının betonlaşması göç başarısını tehdit etmektedir.',
    safetyClassification: 'Tamamen Zararsız & Ekosistem Dostu',
    safetyAndHumanImpact:
      'İnsana ve evcil hayvanlara %100 zararsızdır; iğnesi veya ısırıcı ağız yapısı yoktur. Çiçeklerin tozlaşmasını sağlayarak bitkilerin meyve ve tohum vermesini sağlayan faydalı bir türdür.',
    whereItLives:
      'Kıtalararası göçmen bir kelebektir; ilkbaharda Afrika ve Akdeniz’den Trakya’ya (Tekirdağ/Kapaklı) ulaşır. Güneşli çayırlar, okul bahçeleri, lavanta ve devedikeni tarhlarında yaşar.',
    whatItEats:
      'Otçul / Nektarivor (1. Derece Tüketici): Ergin kelebekler hortumlarıyla lavanta, devedikeni, yonca ve meyve çiçeklerinin nektarını içer. Tırtıl evresinde ise ebegümeci ve devedikeni yapraklarını yer.',
    similarSpecies: [
      {
        commonNameTr: 'Atalanta Kelebeği (Kızıl Amiral)',
        scientificName: 'Vanessa atalanta',
        distinguishingFeature:
          'Kanat zemini turuncu değil kadifemsi koyu siyahtır; ortasında parlak kırmızı-turuncu düz bir şerit geçer.',
        whereItLives:
          'Trakya ve tüm Türkiye’de nemli koruluk kenarlarında, ısırgan otu bulunan bahçelerde ve meyve ağaçlarında yaşar.',
      },
      {
        commonNameTr: 'Kraliçe İspanyol Kelebeği',
        scientificName: 'Issoria lathonia',
        distinguishingFeature:
          'Üst kanatlarında çok sayıda yuvarlak siyah benek ve arka kanat altında parlak sedefli gümüş lekeler bulunur.',
        whereItLives:
          'Trakya’da açık tarım alanları, kuru çayırlar ve orman açıklıklarında yaşar.',
      },
    ],
    verificationChecklist: [
      'Kanatların üst yüzeyi kiremit turuncusu ve siyah alacalı desenli mi?',
      'Ön kanatların siyah uç kısmında 5-6 adet belirgin beyaz benek görülüyor mu?',
      'Lavanta veya çiçekli bitkiler üzerinde hortumuyla nektar emerken mi gözlemlendi?',
    ],
    verifiedByStudent: true,
    curriculumAlignment: {
      grade5Biocenosis:
        '5. Sınıf (F.5.6.1): Çiçekli bitkilerin üremesi için böcek biyoçeşitliliğinin şart olduğunu ve yeşil koridorların göçmen türler için önemini örnekler.',
      grade8FoodWeb:
        '8. Sınıf (F.8.6.1): Üretici bitkilerden güneş enerjisini nektar yoluyla alan 1. Derece Tüketici (Otçul) basamağındadır ve böcekçil kuşların avıdır.',
    },
    foodChain: {
      producerSource: 'Lavanta, Devedikeni ve Ebegümeci Çiçekleri (Üretici Bitkiler)',
      lowerTrophic: 'Besin Kaynağı: Çiçek Nektarı ve Ebegümeci Yaprakları (Üretici)',
      speciesNode: 'Av (1. Derece Tüketici): Diken Kelebeği (Vanessa cardui)',
      upperTrophic: 'Avcılar: Böcekçil Kuşlar (Baştankara, Serçe), Peygamber Devesi ve Örümcekler',
      trophicLevel: '1. Derece Tüketici (Otçul / Nektarivor / Tohumcul)',
      predatorPreySummary:
        'Üretici bitkiler ile etçil kuşlar arasında enerji köprüsüdür; tırtıl ve ergin evresinde kuşların ve peygamber develerinin avıdır.',
      ecosystemServiceSummary:
        'Uzun hortumu (proboscis) ile çiçekler arası polen taşıyarak okul bahçesindeki çiçekli bitkilerin tohum bağlama oranını artırır.',
    },
    temperatureToleranceRange: '17°C – 32°C (Uçuş kaslarının çalışması için minimum 16°C güneşlenme gerekir)',
    vegetationRelationship:
      'Nektar kaynağı sağlayan çiçekli bitki örtüsü yoğunluğu (%80+) ile doğrudan pozitif korelasyon gösterir.',
    morphologicalNotes:
      'Turuncu-kahverengi kanatlar üzerinde siyah desenler ve ön kanat uçlarında belirgin beyaz benekler.',
    conservationTip:
      'İlkbahar göç koridorunda nektar bulabilmeleri için okul bahçesinde lavanta ve biberiye tarhları genişletilmelidir.',
    confidenceScore: 97,
  },
  {
    id: 'obs-103',
    commonNameTr: 'Büyük Baştankara',
    scientificName: 'Parus major',
    family: 'Paridae',
    taxonomicGroup: 'Kuş',
    ecologicalRole: 'Zararlı Kontrolcüsü (Biyolojik Mücadele)',
    seasonTransition: 'Eylül-Kasım (Sonbahar Geçişi)',
    month: 'Ekim',
    observedDate: '2026-10-03',
    temperatureC: 16.2,
    humidityPercent: 62,
    vegetationDensityPercent: 82,
    zoneId: 'zone-b',
    zoneName: 'BÖLGE B · Kuzey Çam Korusu & İğne Yapraklı Ağaçlık',
    locationLabel: 'Yıldızkent Ortaokulu Kuzey Çam Korusu, Kapaklı/Tekirdağ',
    lat: 41.32046,
    lng: 27.96682,
    mapX: 340,
    mapY: 125,
    individualCount: 5,
    observerStudent: 'Zeynep Aydın',
    studentClass: '7-C',
    imageUrl: greatTitImg,
    iucnStatus: 'LC (Asgari Endişe - Soyu Tehlikede Değil)',
    extinctionRiskNote:
      'Soyu tehlikede değildir (LC) ve Avrupa ile Türkiye’de popülasyonu stabildir; ancak yaşlı kovuklu ağaçların kesilmesi yuvalanma başarısını azaltmaktadır.',
    safetyClassification: 'İnsana Zararsız · Biyolojik Mücadele Ajanı',
    safetyAndHumanImpact:
      'İnsana tamamen zararsız, ötücü ve faydalı bir kuştur. Çam kese böceği tırtıllarını ve elma iç kurdunu avladığı için orman ve okul bahçesi ağaçlarının doğal koruyucusudur.',
    whereItLives:
      'Trakya’da (Tekirdağ/Kapaklı) çam korulukları, meyve bahçeleri, parklar ve okul bahçelerindeki ağaç kovuklarında veya asılı ahşap kuş evlerinde yaşar.',
    whatItEats:
      'Hem Etçil Hem Otçul (Omnivor): İlkbahar ve yazın tırtıllar, yaprak bitleri, örümcekler ve böcek larvalarıyla (etçil); sonbahar ve kışın ise ayçiçeği, çam tohumu ve ceviz/fındık kırıntılarıyla (otçul) beslenir.',
    similarSpecies: [
      {
        commonNameTr: 'Mavi Baştankara',
        scientificName: 'Cyanistes caeruleus',
        distinguishingFeature:
          'Başının tepesi siyah değil parlak kobalt mavisidir; boyutu Büyük Baştankara’dan daha küçüktür ve karın çizgisi çok incedir.',
        whereItLives:
          'Trakya ve Marmara’daki geniş yapraklı meşe, çınar ve meyve ağaçlıklarında yaşar.',
      },
      {
        commonNameTr: 'Çam Baştankarası',
        scientificName: 'Periparus ater',
        distinguishingFeature:
          'Karnı sarı değil kirli krem rengindedir ve ensesinde belirgin beyaz bir leke bulunur.',
        whereItLives:
          'İğne yapraklı çam ve köknar ormanlarında yaşar.',
      },
    ],
    verificationChecklist: [
      'Sarı göğsünün tam ortasından aşağı uzanan siyah bir "kravat" çizgisi var mı?',
      'Siyah başının iki yanında parlak beyaz yanak lekeleri seçiliyor mu?',
      'Ağaç dalları arasında hareketli şekilde böcek veya tohum ararken mi görüldü?',
    ],
    verifiedByStudent: true,
    curriculumAlignment: {
      grade5Biocenosis:
        '5. Sınıf (F.5.6.1): Kuşların barınma ve üreme için ağaçlık yaşam alanlarına (habitatlara) nasıl ihtiyaç duyduğunu ve yuvalama kutularının biyoçeşitliliği nasıl desteklediğini gösterir.',
      grade8FoodWeb:
        '8. Sınıf (F.8.6.1): Besin zincirinde 2. ve 3. Derece Tüketici (Avcı) konumundadır; tırtıl popülasyonunu avlayarak üretici çam ve meyve ağaçlarını korur.',
    },
    foodChain: {
      producerSource: 'Karaçam İbreleri, Meşe Yaprakları ve Tohumlar (Üretici)',
      lowerTrophic: 'Av: Çam Kese Böceği Tırtılları, Yaprak Bitleri ve Çam Tohumları',
      speciesNode: 'Avcı: Büyük Baştankara (Parus major - 2./3. Derece Tüketici)',
      upperTrophic: 'Üst Avcı: Atmaca (Accipiter nisus), Kerkenez ve Sokak Kedileri',
      trophicLevel: 'Hem Etçil Hem Otçul (Omnivor Tüketici)',
      predatorPreySummary:
        'Bir çift Büyük Baştankara, yavrularını büyütürken yaklaşık 7.000–10.000 adet tırtıl avlar; ortamdan yok olursa tırtıllar ağaçların tüm yapraklarını tüketir.',
      ecosystemServiceSummary:
        'İlkbaharda yavrularını binlerce tırtılla besleyerek ağaçları korur; sonbaharda ise tohum dağılımına katkıda bulunur.',
    },
    temperatureToleranceRange:
      '-5°C – 30°C (Sıcakkanlı endoterm; soğuk sonbahar günlerinde de aktif beslenir)',
    vegetationRelationship:
      'Ağaçlık kanopi yoğunluğu yüksek (%75+) bölgelerde yuvalanma ve tünek güvenliği nedeniyle yoğunlaşır.',
    morphologicalNotes:
      'Parlak sarı karın ortasında siyah kravat çizgisi, parlak siyah baş ve belirgin beyaz yanak yamaları.',
    conservationTip:
      'Kuzey Çam Korusu’ndaki ağaçlara kış öncesi ahşap kuş yuvaları ve tohum yemlikleri asılmalıdır.',
    confidenceScore: 99,
  },
  {
    id: 'obs-104',
    commonNameTr: 'Anadolu Hasatçı Karıncası',
    scientificName: 'Messor structor',
    family: 'Formicidae',
    taxonomicGroup: 'Karınca',
    ecologicalRole: 'Ayrıştırıcı & Toprak Mühendisi',
    seasonTransition: 'Eylül-Kasım (Sonbahar Geçişi)',
    month: 'Eylül',
    observedDate: '2026-09-22',
    temperatureC: 22.8,
    humidityPercent: 48,
    vegetationDensityPercent: 48,
    zoneId: 'zone-d',
    zoneName: 'BÖLGE D · Batı Çim Saha & Toprak Gözlem Şeridi',
    locationLabel: 'Yıldızkent Ortaokulu Batı Çim Saha Yürüyüş Kenarı, Kapaklı',
    lat: 41.32013,
    lng: 27.96642,
    mapX: 165,
    mapY: 295,
    individualCount: 38,
    observerStudent: 'Mert Yılmaz',
    studentClass: '6-A',
    imageUrl: harvesterAntImg,
    iucnStatus: 'LC (Asgari Endişe - Soyu Tehlikede Değil)',
    extinctionRiskNote:
      'Soyu tehlikede değildir (LC); Trakya ve Anadolu bozkır/çayır ekosistemlerinde yaygındır. Toprak sıkışması ve betonlaşma yuvalarını tehdit eder.',
    safetyClassification: 'Tamamen Zararsız & Ekosistem Dostu',
    safetyAndHumanImpact:
      'İnsana zararsızdır; sokucu zehir iğnesi yoktur, yalnızca yuvası kurcalandığında savunma amaçlı çenesiyle hafifçe sıkabilir. Toprağı havalandıran ve tohum yayan çok faydalı bir toprak mühendisidir.',
    whereItLives:
      'Trakya (Tekirdağ/Kapaklı), İç Anadolu ve Ege’de güneş alan açık çim sahalarda, okul bahçesi patikalarında ve taş kenarlarında 1-2 metre derinliğe inen toprak altı yuvalarında yaşar.',
    whatItEats:
      'Tohumcul (Granivor) & Ayrıştırıcı: Yabani çim ve çayır otlarının tohumlarını toplayıp yeraltı ambarlarında depolar ("karınca ekmeği" yapar); ayrıca ölü böcek kırıntılarını temizler.',
    similarSpecies: [
      {
        commonNameTr: 'Siyah Bahçe Karıncası',
        scientificName: 'Lasius niger',
        distinguishingFeature:
          'Boyutu çok daha küçüktür (3-4 mm), tohum taşımaz; daha çok yaprak bitlerinin salgıladığı tatlı özsuyu (bal çiği) için ağaçlara tırmanır.',
        whereItLives:
          'Kaldırım taşları altında, bina kenarlarında ve nemli bahçe topraklarında yaşar.',
      },
      {
        commonNameTr: 'Kırmızı Orman Karıncası',
        scientificName: 'Formica rufa',
        distinguishingFeature:
          'Baş ve göğüs kısmı belirgin pas kırmızısı, karnı siyahtır; çam ibrelerinden yüksek tepecik yuvalar yapar.',
        whereItLives:
          'Kuzey Trakya (Istranca/Yıldız Dağları) ve Karadeniz’in yaşlı ormanlarında yaşar (VU/NT koruma statüsüne yakındır).',
      },
    ],
    verificationChecklist: [
      'İşçi karıncalar arasında büyük başlı (asker/kırıcı) ve küçük başlı bireyler birlikte yürüyor mu?',
      'Çenelerinde (mandibula) çim veya yabani ot tohumu taşıdıkları görülüyor mu?',
      'Yuva girişinin etrafında ayrıştırılmış tohum kabuklarından oluşan küçük bir halka var mı?',
    ],
    verifiedByStudent: true,
    curriculumAlignment: {
      grade5Biocenosis:
        '5. Sınıf (F.5.6.1): Toprak altı yaşam alanının (habitatın) yüzlerce canlıya ev sahipliği yaptığını ve karıncaların tohum dağılımıyla bitki çeşitliliğini artırdığını gösterir.',
      grade8FoodWeb:
        '8. Sınıf (F.8.6.1): Madde döngüsünde organik atıkları parçalayan ve tohum tüketen kilit halka olarak toprak ekosisteminin enerji ve besin akışını düzenler.',
    },
    foodChain: {
      producerSource: 'Yabani Buğdaygiller, Üçgül ve Karahindiba Tohumları (Üretici)',
      lowerTrophic: 'Besin Kaynağı: Bitki Tohumları ve Organik Kırıntılar',
      speciesNode: 'Av / Toprak Mühendisi: Hasatçı Karınca (Messor structor)',
      upperTrophic: 'Avcılar: Serçeler, Kertenkeleler, Örümcekler ve Karınca Aslanı',
      trophicLevel: '1. Derece Tüketici (Otçul / Nektarivor / Tohumcul)',
      predatorPreySummary:
        'Bitki tohumlarını yeraltına taşıyarak bir kısmının çimlenmesini sağlar; kendisi ise bahçedeki kuş ve kertenkelelerin önemli protein avıdır.',
      ecosystemServiceSummary:
        'Toprak altında açtığı galerilerle toprağı havalandırır, yağmur suyunun emilimini artırır ve tohumları taşıyarak çimlenmeyi destekler.',
    },
    temperatureToleranceRange:
      '15°C – 34°C (Toprak sıcaklığı 13°C altına düştüğünde koloni yeraltı odalarına çekilir)',
    vegetationRelationship:
      'Çok sık gölgelik yerine güneş alan orta yoğunluklu (%40-%60) çim ve açık toprak şeritlerini tercih eder.',
    morphologicalNotes:
      'Koyu kızıl-kahverengi gövde, tohum kırmaya uyumlu güçlü mandibula (çene) yapısı ve polimorfik işçi bireyler.',
    conservationTip:
      'Eylül-Ekim aylarında kışlık tohum depolama patikalarının üzerine sentetik pestisit uygulanmamalıdır.',
    confidenceScore: 96,
  },
  {
    id: 'obs-105',
    commonNameTr: 'Avrupa Kızılgerdanı',
    scientificName: 'Erithacus rubecula',
    family: 'Muscicapidae',
    taxonomicGroup: 'Kuş',
    ecologicalRole: 'Tohum Dağıtıcı & Böcekçil',
    seasonTransition: 'Eylül-Kasım (Sonbahar Geçişi)',
    month: 'Kasım',
    observedDate: '2026-11-11',
    temperatureC: 11.4,
    humidityPercent: 74,
    vegetationDensityPercent: 82,
    zoneId: 'zone-b',
    zoneName: 'BÖLGE B · Kuzey Çam Korusu & İğne Yapraklı Ağaçlık',
    locationLabel: 'Yıldızkent Ortaokulu Kuzey Çam ve Çalı Altı, Kapaklı/Tekirdağ',
    lat: 41.32041,
    lng: 27.96672,
    mapX: 230,
    mapY: 145,
    individualCount: 3,
    observerStudent: 'Defne Çelik',
    studentClass: '8-A',
    iucnStatus: 'LC (Asgari Endişe - Soyu Tehlikede Değil)',
    extinctionRiskNote:
      'Küresel ölçekte soyu tehlikede değildir (LC). Trakya’da özellikle sonbahar-kış aylarında yaygın görülür; alt çalı örtüsünün yok edilmesi kışlama alanlarını daraltır.',
    safetyClassification: 'Tamamen Zararsız & Ekosistem Dostu',
    safetyAndHumanImpact:
      'İnsana tamamen zararsız, meraklı ve bahçe dostu bir ötücü kuştur. Toprak yüzeyindeki zararlı böcek larvalarını temizler ve çalı tohumlarını yayar.',
    whereItLives:
      'Avrupa, Kuzeybatı Anadolu ve Trakya’da (Tekirdağ/Kapaklı) nemli ağaçlıklar, çalı dipleri, parklar ve okul bahçelerinin yaprak döküntülü kuytu köşelerinde yaşar.',
    whatItEats:
      'Hem Etçil Hem Otçul (Omnivor): Toprak solucanları, küçük kınkanatlı böcekler, örümcekler, kırkayaklar ve sonbahar/kışın kuşburnu, ateş dikeni ve sarmaşık meyvelerini yer.',
    similarSpecies: [
      {
        commonNameTr: 'Kara Kızılkuyruk',
        scientificName: 'Phoenicurus ochruros',
        distinguishingFeature:
          'Göğsü değil yalnızca kuyruk sokumu ve kuyruğu pas kızılıdır; gövdesi koyu duman grisidir.',
        whereItLives:
          'Kayalık alanlar ve okul/apartman çatıları çevresinde yaşar.',
      },
    ],
    verificationChecklist: [
      'Alnından göğsüne kadar uzanan parlak turuncu-kızıl leke net görülüyor mu?',
      'Gövdesi yuvarlak hatlı ve çalı/toprak seviyesine yakın mı zıplıyor?',
    ],
    verifiedByStudent: true,
    curriculumAlignment: {
      grade5Biocenosis:
        '5. Sınıf (F.5.6.1): Mevsim geçişlerinde (Kasım) kuşların besin ve barınak bulmak için çalı örtüsüne nasıl bağımlı olduğunu gösterir.',
      grade8FoodWeb:
        '8. Sınıf (F.8.6.1): Soğuk havalarda böceklerin azalmasıyla besin ağında böcekçillikten meyve/tohum tüketimine geçerek enerji akışını sürdürür.',
    },
    foodChain: {
      producerSource: 'Kuşburnu, Ateş Dikeni Meyveleri ve Çürüyen Yaprak Örtüsü',
      lowerTrophic: 'Av: Toprak Solucanları, Küçük Böcekler ve Çalı Meyveleri',
      speciesNode: 'Avcı: Avrupa Kızılgerdanı (Erithacus rubecula)',
      upperTrophic: 'Üst Avcı: Atmaca (Accipiter nisus) ve Baykuşlar',
      trophicLevel: 'Hem Etçil Hem Otçul (Omnivor Tüketici)',
      predatorPreySummary:
        'Toprak üstü omurgasızların avcısıdır; aynı zamanda yediği kuşburnu ve ateş dikeni meyvelerinin tohumlarını dışkısıyla bahçeye yayar.',
      ecosystemServiceSummary:
        'Böceklerin kış uykusuna çekildiği soğuk Kasım günlerinde toprak üstü omurgasız dengesini ve çalı tohumu dağılımını sürdürür.',
    },
    temperatureToleranceRange:
      '-8°C – 24°C (Sonbahar sonu ve kış başlangıcında okul bahçesinde en aktif kuş türlerindendir)',
    vegetationRelationship:
      'Alt çalı katmanı ve dökülmüş yaprak örtüsü bulunan nemli, sık ağaçlık (%70+) alanları tercih eder.',
    morphologicalNotes:
      'Yüz ve göğüs bölgesinde karakteristik parlak turuncu-kızıl leke, zeytin kahverengi sırt.',
    conservationTip:
      'Çalı diplerindeki yaprak döküntüsü örtüsü, kızılgerdanların besin bulması için doğal halinde bırakılmalıdır.',
    confidenceScore: 95,
  },
  {
    id: 'obs-106',
    commonNameTr: 'Bal Arısı',
    scientificName: 'Apis mellifera',
    family: 'Apidae',
    taxonomicGroup: 'Diğer Böcek',
    ecologicalRole: 'Tozlaştırıcı (Polinatör)',
    seasonTransition: 'Mart-Mayıs (İlkbahar Geçişi)',
    month: 'Nisan',
    observedDate: '2026-04-24',
    temperatureC: 22.5,
    humidityPercent: 50,
    vegetationDensityPercent: 88,
    zoneId: 'zone-a',
    zoneName: 'BÖLGE A · Güney Çiçekli Bahçe & 73. Sokak Giriş Tarhı',
    locationLabel: '73. Sokak No:7 Güney Bahçe Lavanta ve Biberiye Tarhı, Kapaklı',
    lat: 41.31998,
    lng: 27.96708,
    mapX: 365,
    mapY: 495,
    individualCount: 24,
    observerStudent: 'Arda Şahin',
    studentClass: '7-B',
    iucnStatus: 'NT (Tehdide Yakın - Koruma Gerektiren)',
    extinctionRiskNote:
      'Doğal/yabani kolonileri küresel ölçekte tarım ilaçları (neonikotinoidler), Varroa paraziti ve habitat kaybı nedeniyle "Tehdide Yakın (NT)" düzeyinde hassasiyet taşımaktadır.',
    safetyClassification: 'Dikkatli Gözlemlenmeli (Savunma / Alerji Riski)',
    safetyAndHumanImpact:
      'Doğaya ve tarıma en faydalı tozlaştırıcıdır. Çiçek üzerinde nektar toplarken saldırgan değildir; ancak sıkıştırılırsa veya üzerine basılırsa kendini savunmak için iğnesini kullanabilir. Öğrenciler dokunmadan 1 metre mesafeden gözlemlemelidir.',
    whereItLives:
      'Trakya’da (Tekirdağ/Kapaklı) ayçiçeği ve kanola tarlaları, meyve bahçeleri, ağaç kovukları ve aroluklarda koloni halinde yaşar; okul bahçesinin çiçekli tarhlarını beslenme koridoru olarak kullanır.',
    whatItEats:
      'Otçul / Nektarivor & Polinivor: Yalnızca çiçek nektarı (karbonhidrat kaynağı) ve çiçek poleni (protein kaynağı) ile beslenir.',
    similarSpecies: [
      {
        commonNameTr: 'Çiçek Sineği (Arı Sineği)',
        scientificName: 'Episyrphus balteatus',
        distinguishingFeature:
          'İğnesi yoktur, 4 yerine 2 kanadı vardır, gözleri çok büyüktür ve helikopter gibi havada asılı durabilir.',
        whereItLives:
          'Tüm Türkiye ve Trakya’da çiçekli bahçelerde ve parklarda yaşar.',
      },
      {
        commonNameTr: 'Alman Yaban Arısı (Sarıca Arı)',
        scientificName: 'Vespula germanica',
        distinguishingFeature:
          'Tüysüz, parlak limon sarısı ve siyah keskin çizgilidir; ince bellidir ve polen sepeti yoktur.',
        whereItLives:
          'Toprak altı yuvalarda ve çatı saçaklarında yaşar.',
      },
    ],
    verificationChecklist: [
      'Gövdesi ince tüylü ve kehribar-kahverengi halkalı mı?',
      'Arka bacaklarında sarı-turuncu top şeklinde polen birikimi (polen sepeti) var mı?',
    ],
    verifiedByStudent: true,
    curriculumAlignment: {
      grade5Biocenosis:
        '5. Sınıf (F.5.6.1): Arıların neslinin azalmasının meyve ve sebze üretimini doğrudan tehdit ettiğini, biyoçeşitliliğin insan beslenmesi için hayati olduğunu kanıtlar.',
      grade8FoodWeb:
        '8. Sınıf (F.8.6.1): Üretici bitkilerin çoğalmasını sağlayan 1. Derece Tüketici olarak besin piramidinin tabanındaki üretici sürekliliğini güvence altına alır.',
    },
    foodChain: {
      producerSource: 'Meyve Ağacı Çiçekleri, Lavanta ve Üçgül (Üretici Bitkiler)',
      lowerTrophic: 'Besin Kaynağı: Çiçek Nektarı ve Poleni',
      speciesNode: 'Tozlaştırıcı (1. Derece Tüketici): Bal Arısı (Apis mellifera)',
      upperTrophic: 'Avcılar: Arı Kuşları (Merops apiaster), Örümcekler ve Eşek Arıları',
      trophicLevel: '1. Derece Tüketici (Otçul / Nektarivor / Tohumcul)',
      predatorPreySummary:
        'Bitkilerle karşılıklı fayda (mutualizm) içindedir; arı kuşları ve bahçe örümceklerinin ise avıdır.',
      ecosystemServiceSummary:
        'Okul bahçesi ve Kapaklı çevresindeki çiçekli bitkilerin %80’inden fazlasının birincil tozlaştırıcısıdır.',
    },
    temperatureToleranceRange: '14°C – 35°C (12°C altında uçuş aktivitesi durma noktasına gelir)',
    vegetationRelationship:
      'Çiçeklenme yoğunluğu en yüksek olan Bölge A (%88) ve Bölge C (%74) arasında yoğun polen koridoru oluşturur.',
    morphologicalNotes:
      'Altın sarısı-kahverengi bantlı abdomen, arka bacaklarda polen sepetçiği (corbicula).',
    conservationTip:
      'Bahar aylarında arıların su ihtiyacı için çiçek tarhı yanına çakıl taşlı sığ su kapları yerleştirilmelidir.',
    confidenceScore: 99,
  },
  {
    id: 'obs-107',
    commonNameTr: 'Lahana Kelebeği',
    scientificName: 'Pieris brassicae',
    family: 'Pieridae',
    taxonomicGroup: 'Kelebek',
    ecologicalRole: 'Tozlaştırıcı (Polinatör)',
    seasonTransition: 'Eylül-Kasım (Sonbahar Geçişi)',
    month: 'Eylül',
    observedDate: '2026-09-16',
    temperatureC: 23.2,
    humidityPercent: 52,
    vegetationDensityPercent: 68,
    zoneId: 'zone-f',
    zoneName: 'BÖLGE F · Yıldızkent Mahalle Parkı & 73. Sokak Ekolojik Koridoru',
    locationLabel: '73. Sokak & Yıldızkent Park Koridoru, Kapaklı/Tekirdağ',
    lat: 41.31975,
    lng: 27.96758,
    mapX: 640,
    mapY: 440,
    individualCount: 6,
    observerStudent: 'Beren Koç',
    studentClass: '6-B',
    iucnStatus: 'LC (Asgari Endişe - Soyu Tehlikede Değil)',
    extinctionRiskNote: 'Soyu tehlikede değildir (LC); Türkiye ve Trakya genelinde yaygın görülür.',
    safetyClassification: 'Tamamen Zararsız & Ekosistem Dostu',
    safetyAndHumanImpact:
      'İnsana tamamen zararsızdır. Ergin kelebekler faydalı tozlaştırıcıdır; ancak tırtıl evresinde lahana ve turpgil yapraklarını yoğun tüketebilir (doğal olarak kuşlar tarafından dengelenir).',
    whereItLives:
      'Trakya’da (Tekirdağ/Kapaklı) sebze bahçeleri, parklar, çayırlar ve okul bahçesi çiçek şeritlerinde yaşar.',
    whatItEats:
      'Otçul: Erginleri yabani çiçek nektarlarıyla; tırtılları ise yabani hardal, turp ve lahana yapraklarıyla beslenir.',
    similarSpecies: [
      {
        commonNameTr: 'Küçük Beyaz Melek (Şalgam Kelebeği)',
        scientificName: 'Pieris rapae',
        distinguishingFeature:
          'Boyutu daha küçüktür ve ön kanat ucundaki siyah leke orak şeklinde aşağı kadar inmez, daha soluktur.',
        whereItLives: 'Tüm Türkiye ve Avrupa’da açık bahçelerde ve parklarda yaşar.',
      },
    ],
    verificationChecklist: [
      'Krem-beyaz kanatların ön köşesinde belirgin siyah orak biçimli leke var mı?',
      'Kanat altında sarımsı-yeşilimsi hafif tozlu bir renk tonu görülüyor mu?',
    ],
    verifiedByStudent: true,
    curriculumAlignment: {
      grade5Biocenosis:
        '5. Sınıf (F.5.6.1): Başkalaşım (metamorfoz) geçiren böceklerin yaşam döngüsünü ve bitki-böcek etkileşimini somutlaştırır.',
      grade8FoodWeb:
        '8. Sınıf (F.8.6.1): Tırtılları kuşlar için temel av (1. derece tüketici -> 2. derece tüketici enerji aktarımı) oluşturur.',
    },
    foodChain: {
      producerSource: 'Turpgiller (Brassicaceae) ve Yabani Çiçekler (Üretici)',
      lowerTrophic: 'Besin Kaynağı: Yabani Hardal Yaprakları ve Çiçek Nektarları',
      speciesNode: 'Av (1. Derece Tüketici): Lahana Kelebeği (Pieris brassicae)',
      upperTrophic: 'Avcılar: Büyük Baştankara, Ev Serçesi ve Parazitoid Yaban Arıları',
      trophicLevel: '1. Derece Tüketici (Otçul / Nektarivor / Tohumcul)',
      predatorPreySummary:
        'Baştankara ve serçeler bu kelebeğin tırtıllarını avlayarak sebze ve bahçe bitkilerinin aşırı yenmesini doğal yoldan engeller.',
      ecosystemServiceSummary:
        'Hem ergin birey olarak sonbahar çiçeklerini tozlaştırır hem de tırtıl evresinde kuşlar için kritik protein kaynağı oluşturur.',
    },
    temperatureToleranceRange:
      '15°C – 30°C (Eylül ortasından sonra sıcaklık düşüşüyle krizalit/pupa evresine geçer)',
    vegetationRelationship:
      'Mahalle parkı ile okul bahçesi arasındaki orta-yüksek bitki örtülü (%68) açık koridorlarda yoğunlaşır.',
    morphologicalNotes: 'Krem-beyaz kanatlar, ön kanat köşelerinde siyah orak biçimli leke.',
    conservationTip:
      'Doğal besin zinciri dengesi için yabani hardal ve turp otları tamamen biçilmemelidir.',
    confidenceScore: 95,
  },
  {
    id: 'obs-108',
    commonNameTr: 'Siyah Bahçe Karıncası',
    scientificName: 'Lasius niger',
    family: 'Formicidae',
    taxonomicGroup: 'Karınca',
    ecologicalRole: 'Ayrıştırıcı & Toprak Mühendisi',
    seasonTransition: 'Mart-Mayıs (İlkbahar Geçişi)',
    month: 'Mart',
    observedDate: '2026-03-27',
    temperatureC: 15.8,
    humidityPercent: 58,
    vegetationDensityPercent: 24,
    zoneId: 'zone-e',
    zoneName: 'BÖLGE E · Okul Binası Çevresi & Taşlık Mikro-Habitat',
    locationLabel: 'Yıldızkent Ortaokulu Ana Bina Tören Alanı Taş Kenarı, Kapaklı',
    lat: 41.32018,
    lng: 27.96705,
    mapX: 425,
    mapY: 310,
    individualCount: 29,
    observerStudent: 'Efe Polat',
    studentClass: '7-A',
    iucnStatus: 'LC (Asgari Endişe - Soyu Tehlikede Değil)',
    extinctionRiskNote: 'Soyu tehlikede değildir (LC); kentsel ve kırsal ekosistemlere yüksek uyum sağlamıştır.',
    safetyClassification: 'Tamamen Zararsız & Ekosistem Dostu',
    safetyAndHumanImpact:
      'İnsana tamamen zararsızdır; sokucu iğnesi yoktur. Topraktaki ölü böcekleri temizler ve kaldırım/bahçe toprağını havalandırır.',
    whereItLives:
      'Trakya ve tüm Türkiye’de kaldırım taşları altında, okul bahçesi duvar diplerinde ve çim kenarlarında yaşar.',
    whatItEats:
      'Omnivor & Ayrıştırıcı: Ölü böcek kalıntıları, dökülen meyve şekerleri, tohumlar ve yaprak bitlerinin tatlı salgılarıyla beslenir.',
    similarSpecies: [
      {
        commonNameTr: 'Anadolu Hasatçı Karıncası',
        scientificName: 'Messor structor',
        distinguishingFeature:
          'Boyutu daha büyüktür (5-10 mm), rengi kızıl-kahverengiye çalar ve uzun sıralar halinde tohum taşır.',
        whereItLives: 'Açık çim ve bozkır topraklarında yaşar.',
      },
    ],
    verificationChecklist: [
      'Boyutu 3-5 mm civarında ve tek tip koyu siyah-kahverengi mi?',
      'Taş veya kaldırım derzleri arasındaki küçük toprak tepeciklerinden mi çıkıyor?',
    ],
    verifiedByStudent: true,
    curriculumAlignment: {
      grade5Biocenosis:
        '5. Sınıf (F.5.6.1): Taşlık ve kentsel mikro-habitatlarda bile biyoçeşitliliğin nasıl devam ettiğini gösterir.',
      grade8FoodWeb:
        '8. Sınıf (F.8.6.1): Ölü organik maddeleri parçalayarak madde döngüsünün toprağa geri dönüşünü hızlandırır.',
    },
    foodChain: {
      producerSource: 'Bitkisel Özsu ve Organik Kırıntılar',
      lowerTrophic: 'Besin Kaynağı: Ölü Böcek Kalıntıları, Nektar ve Tohumlar',
      speciesNode: 'Ayrıştırıcı & Tüketici: Siyah Bahçe Karıncası (Lasius niger)',
      upperTrophic: 'Avcılar: Örümcekler, Serçeler ve Kertenkeleler',
      trophicLevel: 'Ayrıştırıcı & Detritivor (Madde Döngüsü Mühendisi)',
      predatorPreySummary:
        'Doğadaki ölü böcekleri hızla temizler; kendisi ise örümcekler ve ötücü kuşların besinidir.',
      ecosystemServiceSummary:
        'Mart ayında güneşle erken ısınan taşlık yüzeylerde organik atıkları hızla ayrıştırarak toprak döngüsünü başlatır.',
    },
    temperatureToleranceRange:
      '12°C – 32°C (Taşlık yüzeylerin ısı tutması sayesinde Mart ayında ilk aktifleşen böceklerdendir)',
    vegetationRelationship:
      'Düşük bitki örtüsü (%24) olan taşlık kenarlarda bile ısı avantajı sayesinde yüksek koloni aktivitesi gösterir.',
    morphologicalNotes:
      '3-5 mm boyunda, koyu siyah-kahverengi parlak kitin kabuklu çevik işçi karıncalar.',
    conservationTip:
      'Okul bahçesi yürüyüş taşları arasındaki doğal derz boşlukları ekolojik mikro-habitat olarak korunmalıdır.',
    confidenceScore: 94,
  },
  {
    id: 'obs-109',
    commonNameTr: 'Ev Serçesi',
    scientificName: 'Passer domesticus',
    family: 'Passeridae',
    taxonomicGroup: 'Kuş',
    ecologicalRole: 'Tohum Dağıtıcı & Böcekçil',
    seasonTransition: 'Eylül-Kasım (Sonbahar Geçişi)',
    month: 'Ekim',
    observedDate: '2026-10-19',
    temperatureC: 15.1,
    humidityPercent: 64,
    vegetationDensityPercent: 68,
    zoneId: 'zone-f',
    zoneName: 'BÖLGE F · Yıldızkent Mahalle Parkı & 73. Sokak Ekolojik Koridoru',
    locationLabel: 'Yıldızkent Mah. 73. Sokak Çalı Kuşağı, Kapaklı/Tekirdağ',
    lat: 41.31968,
    lng: 27.96782,
    mapX: 790,
    mapY: 485,
    individualCount: 11,
    observerStudent: 'Yağmur Aksoy',
    studentClass: '8-C',
    iucnStatus: 'LC (Asgari Endişe - Soyu Tehlikede Değil)',
    extinctionRiskNote:
      'Küresel statüsü LC olmakla birlikte, son 30 yılda modern binalarda çatı boşluklarının kapanması ve böcek ilaçları nedeniyle Avrupa kentsel serçe popülasyonlarında %50’ye varan azalma gözlenmektedir.',
    safetyClassification: 'Tamamen Zararsız & Ekosistem Dostu',
    safetyAndHumanImpact:
      'İnsana tamamen zararsızdır; insan yerleşimleriyle binlerce yıldır uyum içinde yaşayan sosyal bir kuştur. Yavru döneminde binlerce zararlı böceği toplar.',
    whereItLives:
      'Tekirdağ/Kapaklı dahil tüm yerleşim yerlerinde, okul bahçesi çalılarında, çatı kiremit altlarında ve park ağaçlarında sürü halinde yaşar.',
    whatItEats:
      'Omnivor (Tohumcul ve Böcekçil): Yabani ot ve tahıl tohumları, tomurcuklar; ilkbaharda ise yavrularını büyütmek için tırtıl, çekirge ve yaprak bitleriyle beslenir.',
    similarSpecies: [
      {
        commonNameTr: 'Ağaç Serçesi (Dağ Serçesi)',
        scientificName: 'Passer montanus',
        distinguishingFeature:
          'Tepesi gri değil tamamen kestane kahverengidir ve beyaz yanağının ortasında belirgin siyah bir benek vardır.',
        whereItLives: 'Trakya’da kırsal tarım arazileri ve koruluk kenarlarında yaşar.',
      },
    ],
    verificationChecklist: [
      'Erkek bireylerde tepe kısmı gri, ense yanları kestane rengi ve gerdanı siyah mı?',
      'Çalılar ile çim zemin arasında küçük sürü halinde zıplayarak mı besleniyor?',
    ],
    verifiedByStudent: true,
    curriculumAlignment: {
      grade5Biocenosis:
        '5. Sınıf (F.5.6.1): Sık görülen türlerin bile şehirleşme ve ilaçlama nedeniyle azalabileceğini, çalı çitlerin korunmasının önemini öğretir.',
      grade8FoodWeb:
        '8. Sınıf (F.8.6.1): Hem birincil tüketici (tohum) hem ikincil tüketici (böcek) olarak besin ağında çok yönlü denge sağlar; yırtıcı kuşların (atmaca/kerkenez) avıdır.',
    },
    foodChain: {
      producerSource: 'Çayır Otları, Tahıl Tohumları ve Ağaç Tomurcukları',
      lowerTrophic: 'Besin / Av: Yabani Tohumlar, Küçük Çekirge ve Tırtıllar',
      speciesNode: 'Tüketici: Ev Serçesi (Passer domesticus)',
      upperTrophic: 'Avcılar: Kerkenez (Falco tinnunculus) ve Atmaca (Accipiter nisus)',
      trophicLevel: 'Hem Etçil Hem Otçul (Omnivor Tüketici)',
      predatorPreySummary:
        'Okul bahçesindeki çekirge ve tırtılları avlar; kendisi ise gökyüzündeki yırtıcı kuşların (atmaca ve kerkenez) besin halkasını oluşturur.',
      ecosystemServiceSummary:
        'Kentsel okul ekosistemi ile doğal bitki örtüsü arasında tohum taşınımını ve böcek popülasyonu dengesini sağlar.',
    },
    temperatureToleranceRange: '-10°C – 35°C (Mevsim geçişlerinde sürü halinde yüksek adaptasyon gösterir)',
    vegetationRelationship:
      'Çalı kuşağı ile açık çim alanların kesiştiği kenar (ekoton) bölgelerinde sürüler halinde beslenir.',
    morphologicalNotes:
      'Erkeklerde gri tepe, kestane rengi ense ve siyah gerdan; dişilerde boz-kahverengi kamuflaj tüyleri.',
    conservationTip:
      'Kentsel serçe popülasyonlarının azalmasını önlemek için çalı çitler (Bölge C ve F) budama mevsimi dışında korunmalıdır.',
    confidenceScore: 98,
  },
  {
    id: 'obs-110',
    commonNameTr: 'İki Noktalı Uğur Böceği',
    scientificName: 'Adalia bipunctata',
    family: 'Coccinellidae',
    taxonomicGroup: 'Uğur Böceği',
    ecologicalRole: 'Zararlı Kontrolcüsü (Biyolojik Mücadele)',
    seasonTransition: 'Eylül-Kasım (Sonbahar Geçişi)',
    month: 'Ekim',
    observedDate: '2026-10-08',
    temperatureC: 17.6,
    humidityPercent: 59,
    vegetationDensityPercent: 74,
    zoneId: 'zone-c',
    zoneName: 'BÖLGE C · Doğu Meyve Ağaçları & Çalı Kuşağı',
    locationLabel: '73. Sokak Doğu Bahçe Ihlamur ve Erik Ağaçları, Kapaklı',
    lat: 41.32021,
    lng: 27.96759,
    mapX: 775,
    mapY: 225,
    individualCount: 4,
    observerStudent: 'Cemre Yıldız',
    studentClass: '6-C',
    iucnStatus: 'NT (Tehdide Yakın - Koruma Gerektiren)',
    extinctionRiskNote:
      'Avrupa’nın birçok bölgesinde istilacı tür rekabeti ve ilaçlama nedeniyle yerel düşüşler gösterdiği için ekolojik izleme altındadır.',
    safetyClassification: 'İnsana Zararsız · Biyolojik Mücadele Ajanı',
    safetyAndHumanImpact:
      'İnsana tamamen zararsızdır. Ağaçlardaki yaprak bitlerini temizleyen çok değerli bir biyolojik mücadele böceğidir.',
    whereItLives:
      'Trakya’da (Tekirdağ/Kapaklı) özellikle yüksek boylu ıhlamur, elma, erik ağaçlarında ve çalı çitlerde yaşar.',
    whatItEats: 'Etçil (Avcı): Ağaç yaprak bitleri, kabuklu bitler ve tomurcuk akarlarını yer.',
    similarSpecies: [
      {
        commonNameTr: 'Yedi Noktalı Uğur Böceği',
        scientificName: 'Coccinella septempunctata',
        distinguishingFeature: '2 yerine 7 adet siyah beneği vardır ve gövdesi daha iridir (7-8 mm).',
        whereItLives: 'Alçak otsu bitkiler ve çalılarda tüm Türkiye’de yaşar.',
      },
    ],
    verificationChecklist: [
      'Kırmızı kanat örtüsü üzerinde yalnızca 2 adet simetrik siyah nokta mı var?',
      'Ağaç yaprağı veya gövde kabuğu üzerinde mi gözlemlendi?',
    ],
    verifiedByStudent: true,
    curriculumAlignment: {
      grade5Biocenosis:
        '5. Sınıf (F.5.6.1): Farklı uğur böceği türlerinin (7 noktalı ve 2 noktalı) aynı bahçede farklı ağaç katmanlarını paylaşarak biyoçeşitlilik zenginliği oluşturduğunu gösterir.',
      grade8FoodWeb:
        '8. Sınıf (F.8.6.1): 2. Derece Tüketici (Avcı) olarak ağaç zararlısı yaprak bitlerini baskılar.',
    },
    foodChain: {
      producerSource: 'Ihlamur ve Elma Ağacı Yaprak Özsuyu (Üretici)',
      lowerTrophic: 'Av: Ağaç Yaprak Bitleri ve Tomurcuk Akarları (1. Derece Tüketici)',
      speciesNode: 'Avcı: İki Noktalı Uğur Böceği (Adalia bipunctata - 2. Derece Tüketici)',
      upperTrophic: 'Üst Avcı: Örümcekler ve Baştankara Kuşları',
      trophicLevel: '2. Derece Tüketici (Etçil / Böcekçil Avcı)',
      predatorPreySummary:
        'Ağaç dallarındaki yaprak bitlerini avlayarak ağaçların yaprak dökmesini önler.',
      ecosystemServiceSummary:
        'Özellikle elma ve ıhlamur ağaçlarındaki sonbahar yaprak biti kolonilerini baskılayarak ağaç sağlığını korur.',
    },
    temperatureToleranceRange:
      '13°C – 27°C (Ekim ortasından sonra ağaç kabuğu çatlaklarında kışlamaya çekilir)',
    vegetationRelationship:
      'Çok yıllık odunsu ağaç ve çalı dokusunun yoğun olduğu (%74) Bölge C’de yüksek yoğunluk gösterir.',
    morphologicalNotes:
      'Kırmızı kanat örtüsü üzerinde 2 adet belirgin siyah nokta; 4-5 mm boyunda oval gövde.',
    conservationTip:
      'Ağaç gövdelerine kireç sürülmemeli, kabuk aralarındaki kışlama alanları korunmalıdır.',
    confidenceScore: 96,
  },
  {
    id: 'obs-111',
    commonNameTr: 'Çiçek Sineği (Syrphid)',
    scientificName: 'Episyrphus balteatus',
    family: 'Syrphidae',
    taxonomicGroup: 'Diğer Böcek',
    ecologicalRole: 'Tozlaştırıcı (Polinatör)',
    seasonTransition: 'Mart-Mayıs (İlkbahar Geçişi)',
    month: 'Mart',
    observedDate: '2026-03-29',
    temperatureC: 16.4,
    humidityPercent: 57,
    vegetationDensityPercent: 88,
    zoneId: 'zone-a',
    zoneName: 'BÖLGE A · Güney Çiçekli Bahçe & 73. Sokak Giriş Tarhı',
    locationLabel: '73. Sokak No:7 Güney Bahçe Papatya ve Lavanta Tarhı, Kapaklı',
    lat: 41.31991,
    lng: 27.96685,
    mapX: 195,
    mapY: 485,
    individualCount: 8,
    observerStudent: 'Kaan Özkan',
    studentClass: '7-A',
    iucnStatus: 'LC (Asgari Endişe - Soyu Tehlikede Değil)',
    extinctionRiskNote: 'Soyu tehlikede değildir (LC); Avrupa ve Trakya’da önemli bir göçmen tozlaştırıcıdır.',
    safetyClassification: 'Tamamen Zararsız & Ekosistem Dostu',
    safetyAndHumanImpact:
      'Arıya benzeyen sarı-siyah çizgileri yalnızca kuşlardan korunmak için taklittir (mimikri); iğnesi yoktur, ısırmaz ve sokmaz, %100 zararsızdır.',
    whereItLives:
      'Trakya’da (Tekirdağ/Kapaklı) çiçekli okul bahçeleri, parklar ve meyve bahçelerinde yaşar.',
    whatItEats:
      'Çift Yönlü Beslenme: Ergin bireyler çiçek poleni ve nektarı yer (Otçul/Tozlaştırıcı); larvaları ise yaprak bitlerini avlar (Etçil/Avcı).',
    similarSpecies: [
      {
        commonNameTr: 'Yaban Arısı (Sarıca Arı)',
        scientificName: 'Vespula germanica',
        distinguishingFeature:
          'Yaban arısının 4 kanadı, uzun antenleri ve ince beli vardır; Çiçek Sineği ise kısa antenlidir, 2 kanatlıdır ve havada helikopter gibi sabit durur.',
        whereItLives: 'Tüm Türkiye’de bahçe ve yerleşim alanlarında yaşar.',
      },
    ],
    verificationChecklist: [
      'Çiçek önünde havada helikopter gibi asılı (sabit) durarak mı uçuyor?',
      'Karnındaki siyah şeritler çift çizgi (bıyık deseni) şeklinde mi?',
    ],
    verifiedByStudent: true,
    curriculumAlignment: {
      grade5Biocenosis:
        '5. Sınıf (F.5.6.1): Canlıların düşmanlarından korunmak için geliştirdiği adaptasyonları (Batesian mimikri / arı taklidi) gösterir.',
      grade8FoodWeb:
        '8. Sınıf (F.8.6.1): Yaşam döngüsünde hem 1. derece tüketici (ergin nektarivor) hem 2. derece tüketici (larva avcı) olarak besin ağında çift rol üstlenir.',
    },
    foodChain: {
      producerSource: 'Erken İlkbahar Çiçekleri ve Meyve Ağaçları (Üretici)',
      lowerTrophic: 'Ergin: Çiçek Polen/Nektarı · Larva Avı: Yaprak Bitleri',
      speciesNode: 'Çiçek Sineği (Episyrphus balteatus)',
      upperTrophic: 'Avcılar: Ötücü Kuşlar ve Yusufçuklar',
      trophicLevel: 'Hem Etçil Hem Otçul (Omnivor Tüketici)',
      predatorPreySummary:
        'Tek bir çiçek sineği larvası gelişimi boyunca 400’den fazla yaprak bitini avlar; ergin olduğunda ise çiçekleri tozlaştırır.',
      ecosystemServiceSummary:
        'Çift yönlü ekosistem kahramanı: Erginleri ilkbaharda erken tozlaşma yapar, larvaları ise yüzlerce yaprak biti tüketir.',
    },
    temperatureToleranceRange:
      '10°C – 28°C (Kelebeklerden daha düşük sıcaklıklarda da uçabildiği için Mart ayında kritik tozlaştırıcıdır)',
    vegetationRelationship:
      'Çiçekli bahçe (%88) ile meyve ağaçları (%74) arasında hem nektar hem yumurtlama alanı bulur.',
    morphologicalNotes:
      'Arı benzeri sarı-siyah çift bantlı karın deseni (Batesian mimikri), havada asılı kalarak uçuş yeteneği.',
    conservationTip:
      'Papatya ve nergis gibi erken ilkbahar çiçekleri Mart ayı tozlaştırıcıları için ekilmelidir.',
    confidenceScore: 95,
  },
  {
    id: 'obs-112',
    commonNameTr: 'Avrupa Sakası',
    scientificName: 'Carduelis carduelis',
    family: 'Fringillidae',
    taxonomicGroup: 'Kuş',
    ecologicalRole: 'Tohum Dağıtıcı & Böcekçil',
    seasonTransition: 'Mart-Mayıs (İlkbahar Geçişi)',
    month: 'Mayıs',
    observedDate: '2026-05-14',
    temperatureC: 23.1,
    humidityPercent: 49,
    vegetationDensityPercent: 68,
    zoneId: 'zone-f',
    zoneName: 'BÖLGE F · Yıldızkent Mahalle Parkı & 73. Sokak Ekolojik Koridoru',
    locationLabel: 'Yıldızkent Mahalle Parkı Koridoru, Kapaklı/Tekirdağ',
    lat: 41.31964,
    lng: 27.96745,
    mapX: 545,
    mapY: 445,
    individualCount: 6,
    observerStudent: 'Selin Arslan',
    studentClass: '8-B',
    iucnStatus: 'VU (Duyarlı / Hassas Tür)',
    extinctionRiskNote:
      'Küresel ölçekte LC olsa da Türkiye’de yasadışı kafes avcılığı ve tohumlu çayırların yok edilmesi nedeniyle koruma altındadır ve yerel olarak "Duyarlı / Hassas (VU)" dikkat gerektiren bir türdür.',
    safetyClassification: 'Tamamen Zararsız & Ekosistem Dostu',
    safetyAndHumanImpact:
      'İnsana tamamen zararsız, melodik ötüşlü ve renkli tüylü çok değerli bir doğa kuşudur. Yabani ot tohumlarının kontrolünü ve yayılımını sağlar.',
    whereItLives:
      'Trakya’da (Tekirdağ/Kapaklı) meyve bahçeleri, çınar ve akçaağaç tepeleri, devedikeni ve karahindiba bulunan açık parklarda yaşar.',
    whatItEats:
      'Tohumcul (Granivor) & Böcekçil: Devedikeni, karahindiba, ayçiçeği ve çınar tohumları; üreme döneminde yavruları için yaprak bitleri ve küçük tırtıllar.',
    similarSpecies: [
      {
        commonNameTr: 'Florya Kuşu (Yeşil İspinoz)',
        scientificName: 'Chloris chloris',
        distinguishingFeature:
          'Yüzünde kırmızı maske yoktur; gövdesi tamamen zeytin yeşili-sarı tonlarındadır ve gagası daha kalındır.',
        whereItLives: 'Trakya ve tüm Türkiye’de ağaçlık park ve bahçelerde yaşar.',
      },
    ],
    verificationChecklist: [
      'Gagasının etrafında parlak kırmızı yüz maskesi ve siyah-beyaz baş deseni var mı?',
      'Kanatlarında uçarken parlayan geniş altın sarısı şerit görülüyor mu?',
    ],
    verifiedByStudent: true,
    curriculumAlignment: {
      grade5Biocenosis:
        '5. Sınıf (F.5.6.1): Yasadışı avcılığın ve yaşam alanı tahribatının ötücü kuş biyoçeşitliliğini nasıl tehdit ettiğini vurgular.',
      grade8FoodWeb:
        '8. Sınıf (F.8.6.1): 1. Derece Tüketici (Tohumcul) olarak dikenli bitkilerin tohumlarını tüketir ve atmaca gibi üst avcıların besin ağında yer alır.',
    },
    foodChain: {
      producerSource: 'Devedikeni, Karahindiba ve Çınar Ağaçları (Üretici)',
      lowerTrophic: 'Besin Kaynağı: Kompozit Çiçek Tohumları ve Küçük Böcekler',
      speciesNode: 'Tüketici: Avrupa Sakası (Carduelis carduelis)',
      upperTrophic: 'Avcılar: Atmaca (Accipiter nisus) ve Kerkenez (Falco tinnunculus)',
      trophicLevel: '1. Derece Tüketici (Otçul / Nektarivor / Tohumcul)',
      predatorPreySummary:
        'İnce cımbız gagasıyla dikenli tohumlarla beslenir; yırtıcı kuşların avı olarak enerji akışına katılır.',
      ecosystemServiceSummary:
        'İnce ve cımbız benzeri gagasıyla kompozit çiçeklerin tohumlarını çıkarırken rüzgârla yayılmasını hızlandırır.',
    },
    temperatureToleranceRange: '-5°C – 32°C',
    vegetationRelationship:
      'Tohum bağlayan otsu bitkiler ile yüksek ağaç tepelerinin bir arada bulunduğu (%65+) alanları seçer.',
    morphologicalNotes:
      'Kırmızı yüz maskesi, siyah-beyaz baş ve uçuşta parlayan altın sarısı kanat şeridi.',
    conservationTip:
      'Bahçe kenarlarındaki karahindiba ve devedikeni kümeleri tohum kaynağı olarak korunmalıdır.',
    confidenceScore: 98,
  },
];

export const SEASONAL_CLIMATE_SERIES = [
  // Eylül - Kasım (Sonbahar Geçişi)
  {
    period: 'Eylül-Kasım (Sonbahar Geçişi)',
    month: 'Eylül',
    weekLabel: 'Eylül 1. Yarısı',
    avgTempC: 23.4,
    vegetationIndex: 76,
    insectRichness: 14,
    birdRichness: 6,
    pollinatorActivity: 84,
    pestControlActivity: 78,
  },
  {
    period: 'Eylül-Kasım (Sonbahar Geçişi)',
    month: 'Eylül',
    weekLabel: 'Eylül 2. Yarısı',
    avgTempC: 21.1,
    vegetationIndex: 72,
    insectRichness: 12,
    birdRichness: 7,
    pollinatorActivity: 72,
    pestControlActivity: 74,
  },
  {
    period: 'Eylül-Kasım (Sonbahar Geçişi)',
    month: 'Ekim',
    weekLabel: 'Ekim 1. Yarısı',
    avgTempC: 17.8,
    vegetationIndex: 64,
    insectRichness: 9,
    birdRichness: 8,
    pollinatorActivity: 51,
    pestControlActivity: 65,
  },
  {
    period: 'Eylül-Kasım (Sonbahar Geçişi)',
    month: 'Ekim',
    weekLabel: 'Ekim 2. Yarısı',
    avgTempC: 15.2,
    vegetationIndex: 55,
    insectRichness: 6,
    birdRichness: 9,
    pollinatorActivity: 34,
    pestControlActivity: 52,
  },
  {
    period: 'Eylül-Kasım (Sonbahar Geçişi)',
    month: 'Kasım',
    weekLabel: 'Kasım 1. Yarısı',
    avgTempC: 12.6,
    vegetationIndex: 46,
    insectRichness: 3,
    birdRichness: 8,
    pollinatorActivity: 16,
    pestControlActivity: 38,
  },
  {
    period: 'Eylül-Kasım (Sonbahar Geçişi)',
    month: 'Kasım',
    weekLabel: 'Kasım 2. Yarısı',
    avgTempC: 9.8,
    vegetationIndex: 38,
    insectRichness: 1,
    birdRichness: 7,
    pollinatorActivity: 8,
    pestControlActivity: 29,
  },
  // Mart - Mayıs (İlkbahar Geçişi)
  {
    period: 'Mart-Mayıs (İlkbahar Geçişi)',
    month: 'Mart',
    weekLabel: 'Mart 1. Yarısı',
    avgTempC: 11.9,
    vegetationIndex: 42,
    insectRichness: 4,
    birdRichness: 7,
    pollinatorActivity: 24,
    pestControlActivity: 35,
  },
  {
    period: 'Mart-Mayıs (İlkbahar Geçişi)',
    month: 'Mart',
    weekLabel: 'Mart 2. Yarısı',
    avgTempC: 15.4,
    vegetationIndex: 54,
    insectRichness: 8,
    birdRichness: 8,
    pollinatorActivity: 48,
    pestControlActivity: 54,
  },
  {
    period: 'Mart-Mayıs (İlkbahar Geçişi)',
    month: 'Nisan',
    weekLabel: 'Nisan 1. Yarısı',
    avgTempC: 18.6,
    vegetationIndex: 68,
    insectRichness: 13,
    birdRichness: 9,
    pollinatorActivity: 74,
    pestControlActivity: 76,
  },
  {
    period: 'Mart-Mayıs (İlkbahar Geçişi)',
    month: 'Nisan',
    weekLabel: 'Nisan 2. Yarısı',
    avgTempC: 21.2,
    vegetationIndex: 79,
    insectRichness: 16,
    birdRichness: 10,
    pollinatorActivity: 88,
    pestControlActivity: 86,
  },
  {
    period: 'Mart-Mayıs (İlkbahar Geçişi)',
    month: 'Mayıs',
    weekLabel: 'Mayıs 1. Yarısı',
    avgTempC: 23.5,
    vegetationIndex: 86,
    insectRichness: 19,
    birdRichness: 11,
    pollinatorActivity: 95,
    pestControlActivity: 92,
  },
  {
    period: 'Mart-Mayıs (İlkbahar Geçişi)',
    month: 'Mayıs',
    weekLabel: 'Mayıs 2. Yarısı',
    avgTempC: 25.4,
    vegetationIndex: 91,
    insectRichness: 21,
    birdRichness: 11,
    pollinatorActivity: 98,
    pestControlActivity: 94,
  },
];
