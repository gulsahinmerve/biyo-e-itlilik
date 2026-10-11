import React, { useState, useRef, useEffect } from 'react';
import {
  AIIdentificationResult,
  MonthName,
  SeasonTransition,
  SimilarSpeciesItem,
  SpeciesObservation,
} from '../types/biodiversity';
import {
  PRESET_SPECIMEN_IMAGES,
  YILDIZKENT_CAMPUS_ZONES,
  YILDIZKENT_SCHOOL_CENTER,
} from '../data/initialData';
import {
  Camera,
  Upload,
  CheckCircle2,
  ArrowRight,
  Loader2,
  MapPin,
  RefreshCw,
  AlertTriangle,
  Edit3,
  Navigation,
} from 'lucide-react';

interface SpeciesIdentifierLabProps {
  initialZoneId?: string;
  initialMapX?: number;
  initialMapY?: number;
  initialLat?: number;
  initialLng?: number;
  initialLocationLabel?: string;
  onSaveObservation: (newObs: SpeciesObservation) => void;
}

const SAMPLE_FIELD_SPECIMENS = [
  {
    id: 'sample-ladybug',
    label: 'Saha Örneği 1: Uğur Böceği (73. Sk. Doğu Bahçe)',
    imageUrl: PRESET_SPECIMEN_IMAGES.ladybug,
    zoneId: 'zone-c',
    tempC: 21.4,
    month: 'Nisan' as MonthName,
    season: 'Mart-Mayıs (İlkbahar Geçişi)' as SeasonTransition,
    hint: 'Meyve ağacı yaprağı üzerinde kırmızı kanatlı, siyah benekli böcek',
  },
  {
    id: 'sample-butterfly',
    label: 'Saha Örneği 2: Kelebek (Güney Lavanta Tarhı)',
    imageUrl: PRESET_SPECIMEN_IMAGES.butterfly,
    zoneId: 'zone-a',
    tempC: 24.2,
    month: 'Mayıs' as MonthName,
    season: 'Mart-Mayıs (İlkbahar Geçişi)' as SeasonTransition,
    hint: 'Lavanta çiçekleri üzerinde beslenen turuncu-siyah desenli kelebek',
  },
  {
    id: 'sample-bird',
    label: 'Saha Örneği 3: Bahçe Kuşu (Kuzey Çam Korusu)',
    imageUrl: PRESET_SPECIMEN_IMAGES.greatTit,
    zoneId: 'zone-b',
    tempC: 15.8,
    month: 'Ekim' as MonthName,
    season: 'Eylül-Kasım (Sonbahar Geçişi)' as SeasonTransition,
    hint: 'Çam dalında sarı göğüslü, siyah başlı ötücü kuş',
  },
  {
    id: 'sample-ant',
    label: 'Saha Örneği 4: Karınca (Batı Çim Saha)',
    imageUrl: PRESET_SPECIMEN_IMAGES.harvesterAnt,
    zoneId: 'zone-d',
    tempC: 22.5,
    month: 'Eylül' as MonthName,
    season: 'Eylül-Kasım (Sonbahar Geçişi)' as SeasonTransition,
    hint: 'Toprak zeminde tohum taşıyan koyu kızıl-kahverengi karınca',
  },
];

export const SpeciesIdentifierLab: React.FC<SpeciesIdentifierLabProps> = ({
  initialZoneId = 'zone-a',
  initialMapX,
  initialMapY,
  initialLat,
  initialLng,
  initialLocationLabel,
  onSaveObservation,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(initialZoneId);
  const selectedZone =
    YILDIZKENT_CAMPUS_ZONES.find((z) => z.id === selectedZoneId) ||
    YILDIZKENT_CAMPUS_ZONES[0];

  const [mapX, setMapX] = useState<number>(initialMapX ?? selectedZone.centerX);
  const [mapY, setMapY] = useState<number>(initialMapY ?? selectedZone.centerY);
  const [lat, setLat] = useState<number>(initialLat ?? selectedZone.lat);
  const [lng, setLng] = useState<number>(initialLng ?? selectedZone.lng);
  const [locationLabel, setLocationLabel] = useState<string>(
    initialLocationLabel ?? selectedZone.streetAddressNote
  );

  const [seasonTransition, setSeasonTransition] = useState<SeasonTransition>(
    'Mart-Mayıs (İlkbahar Geçişi)'
  );
  const [month, setMonth] = useState<MonthName>('Nisan');
  const [temperatureC, setTemperatureC] = useState<number>(21.0);
  const [humidityPercent] = useState<number>(52);
  const [individualCount, setIndividualCount] = useState<number>(4);
  const [observerStudent, setObserverStudent] = useState<string>('Ayşe Yılmaz');
  const [studentClass, setStudentClass] = useState<string>('7-A');
  const [studentNotes, setStudentNotes] = useState<string>('');

  const [previewImageUrl, setPreviewImageUrl] = useState<string>(
    PRESET_SPECIMEN_IMAGES.ladybug
  );
  const [imageBase64, setImageBase64] = useState<string>('');
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');

  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AIIdentificationResult | null>(null);

  // Student Verification & Confirmation States ("Sorsun, onaylama istesin")
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [isUserConfirmed, setIsUserConfirmed] = useState<boolean>(false);
  const [selectedAlternativeIndex, setSelectedAlternativeIndex] = useState<number | null>(
    null
  );
  const [isManualEditOpen, setIsManualEditOpen] = useState<boolean>(false);
  const [manualCommonName, setManualCommonName] = useState<string>('');
  const [manualScientificName, setManualScientificName] = useState<string>('');

  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (initialZoneId) {
      setSelectedZoneId(initialZoneId);
      const z = YILDIZKENT_CAMPUS_ZONES.find((zone) => zone.id === initialZoneId);
      if (z) {
        setMapX(initialMapX ?? z.centerX);
        setMapY(initialMapY ?? z.centerY);
        setLat(initialLat ?? z.lat);
        setLng(initialLng ?? z.lng);
        setLocationLabel(initialLocationLabel ?? z.streetAddressNote);
      }
    }
  }, [initialZoneId, initialMapX, initialMapY, initialLat, initialLng, initialLocationLabel]);

  const convertImageUrlToBase64 = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageBase64(reader.result);
          setImageMimeType(blob.type || 'image/jpeg');
        }
      };
      reader.readAsDataURL(blob);
    } catch {
      // Keep preview URL
    }
  };

  useEffect(() => {
    convertImageUrlToBase64(PRESET_SPECIMEN_IMAGES.ladybug);
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handleZoneChange = (newZoneId: string) => {
    setSelectedZoneId(newZoneId);
    const z = YILDIZKENT_CAMPUS_ZONES.find((zone) => zone.id === newZoneId);
    if (z) {
      const offsetX = Math.round((Math.random() - 0.5) * 36);
      const offsetY = Math.round((Math.random() - 0.5) * 32);
      const latOffset = Number(((Math.random() - 0.5) * 0.00018).toFixed(5));
      const lngOffset = Number(((Math.random() - 0.5) * 0.00022).toFixed(5));
      setMapX(z.centerX + offsetX);
      setMapY(z.centerY + offsetY);
      setLat(Number((z.lat + latOffset).toFixed(5)));
      setLng(Number((z.lng + lngOffset).toFixed(5)));
      setLocationLabel(z.streetAddressNote);
    }
  };

  const handleGetLiveGPS = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const liveLat = Number(pos.coords.latitude.toFixed(5));
        const liveLng = Number(pos.coords.longitude.toFixed(5));
        setLat(liveLat);
        setLng(liveLng);
        setLocationLabel(
          `Öğrenci Canlı GPS Konumu (${liveLat}°K, ${liveLng}°D) · Kapaklı/Tekirdağ`
        );
      },
      () => {
        setLat(YILDIZKENT_SCHOOL_CENTER.lat);
        setLng(YILDIZKENT_SCHOOL_CENTER.lng);
        setLocationLabel(YILDIZKENT_SCHOOL_CENTER.address);
      }
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopCamera();
    setAiResult(null);
    setIsUserConfirmed(false);
    setSelectedAlternativeIndex(null);
    setSaveSuccess(false);

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setPreviewImageUrl(reader.result);
        setImageBase64(reader.result);
        setImageMimeType(file.type || 'image/jpeg');
      }
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      setIsCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 50);
    } catch {
      setCameraError(
        'Kamera erişimi sağlanamadı. Lütfen fotoğraf yükleme seçeneğini veya hazır saha örneklerini kullanın.'
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureCameraFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 800;
    canvas.height = videoRef.current.videoHeight || 600;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setPreviewImageUrl(dataUrl);
      setImageBase64(dataUrl);
      setImageMimeType('image/jpeg');
      setAiResult(null);
      setIsUserConfirmed(false);
      setSelectedAlternativeIndex(null);
      setSaveSuccess(false);
      stopCamera();
    }
  };

  const handleSelectPresetSample = (sample: (typeof SAMPLE_FIELD_SPECIMENS)[0]) => {
    stopCamera();
    setPreviewImageUrl(sample.imageUrl);
    convertImageUrlToBase64(sample.imageUrl);
    handleZoneChange(sample.zoneId);
    setTemperatureC(sample.tempC);
    setMonth(sample.month);
    setSeasonTransition(sample.season);
    setStudentNotes(sample.hint);
    setAiResult(null);
    setIsUserConfirmed(false);
    setSelectedAlternativeIndex(null);
    setSaveSuccess(false);
    setAnalysisError(null);
  };

  const handleRunAIIdentification = async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setSaveSuccess(false);
    setIsUserConfirmed(false);
    setSelectedAlternativeIndex(null);
    setCheckedQuestions({});
    setIsManualEditOpen(false);

    try {
      const response = await fetch('/api/identify-species', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          mimeType: imageMimeType,
          zoneName: `${selectedZone.code} · ${locationLabel}`,
          temperatureC,
          vegetationDensityPercent: selectedZone.vegetationDensity,
          seasonTransition: `${seasonTransition} (${month})`,
          studentNotes,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Yapay zekâ analizi tamamlanamadı.');
      }

      const result = data as AIIdentificationResult;
      setAiResult(result);
      setManualCommonName(result.commonNameTr);
      setManualScientificName(result.scientificName);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Tür tanımlama sırasında bağlantı hatası oluştu.';
      setAnalysisError(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSwitchToSimilarSpecies = (sim: SimilarSpeciesItem, idx: number) => {
    if (!aiResult) return;
    setSelectedAlternativeIndex(idx);
    setManualCommonName(sim.commonNameTr);
    setManualScientificName(sim.scientificName);
    setIsUserConfirmed(true);
  };

  const handleConfirmPrimaryDiagnosis = () => {
    if (!aiResult) return;
    setSelectedAlternativeIndex(null);
    setManualCommonName(aiResult.commonNameTr);
    setManualScientificName(aiResult.scientificName);
    setIsUserConfirmed(true);
  };

  const handleSaveToAtlas = () => {
    if (!aiResult || !isUserConfirmed) return;

    const finalCommonName = manualCommonName.trim() || aiResult.commonNameTr;
    const finalScientificName =
      manualScientificName.trim() || aiResult.scientificName;

    const chosenAlternative =
      selectedAlternativeIndex !== null
        ? aiResult.similarSpecies[selectedAlternativeIndex]
        : null;

    const newObservation: SpeciesObservation = {
      id: `obs-${Date.now()}`,
      commonNameTr: finalCommonName,
      scientificName: finalScientificName,
      family: aiResult.family,
      taxonomicGroup: aiResult.taxonomicGroup,
      ecologicalRole:
        chosenAlternative?.ecologicalRole || aiResult.ecologicalRole,
      seasonTransition,
      month,
      observedDate: new Date().toISOString().split('T')[0],
      temperatureC,
      humidityPercent,
      vegetationDensityPercent: selectedZone.vegetationDensity,
      zoneId: selectedZone.id,
      zoneName: `${selectedZone.code} · ${selectedZone.name}`,
      locationLabel,
      lat,
      lng,
      mapX,
      mapY,
      individualCount,
      observerStudent: observerStudent.trim() || 'Öğrenci Gözlemci',
      studentClass: studentClass.trim() || '7-A',
      imageUrl: previewImageUrl,
      iucnStatus: aiResult.iucnStatus,
      extinctionRiskNote: aiResult.extinctionRiskNote,
      safetyClassification: aiResult.safetyClassification,
      safetyAndHumanImpact: aiResult.safetyAndHumanImpact,
      whereItLives: chosenAlternative
        ? chosenAlternative.whereItLives
        : aiResult.whereItLives,
      whatItEats: aiResult.whatItEats,
      similarSpecies: aiResult.similarSpecies,
      verificationChecklist: aiResult.verificationChecklist,
      verifiedByStudent: true,
      curriculumAlignment: aiResult.curriculumAlignment,
      foodChain: {
        ...aiResult.foodChain,
        speciesNode: `${finalCommonName} (${finalScientificName})`,
      },
      temperatureToleranceRange: aiResult.temperatureToleranceRange,
      vegetationRelationship: aiResult.vegetationRelationship,
      morphologicalNotes: chosenAlternative
        ? chosenAlternative.distinguishingFeature
        : aiResult.morphologicalNotes,
      conservationTip: aiResult.conservationTip,
      confidenceScore: aiResult.confidenceScore,
    };

    setSaveSuccess(true);
    onSaveObservation(newObservation);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* LEFT PANEL (5 Cols): Photo Capture & Kapaklı/Tekirdağ Location Parameters */}
      <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Yapay Zekâ Tür Tanımlama ve Öğrenci Doğrulama Laboratuvarı
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Yıldızkent Ortaokulu (73. Sokak No:7, Kapaklı/Tekirdağ) bahçesinde veya çevrede gördüğünüz canlının fotoğrafını çekin; yapay zekâ türü, nesli tükenme durumunu, zararlı/zararsız analizini, benzerlerini ve av–avcı ilişkisini çıkarsın.
          </p>
        </div>

        {/* Preset Field Specimens */}
        <div>
          <label className="block text-xs font-semibold text-slate-800 mb-2">
            Hızlı Test İçin Yıldızkent Ortaokulu Saha Gözlem Fotoğrafları:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SAMPLE_FIELD_SPECIMENS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectPresetSample(sample)}
                className={`group text-left rounded-lg overflow-hidden border transition-all cursor-pointer ${
                  previewImageUrl === sample.imageUrl
                    ? 'border-emerald-700 ring-2 ring-emerald-700/20 bg-emerald-50/40'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="h-18 w-full overflow-hidden bg-slate-900">
                  <img
                    src={sample.imageUrl}
                    alt={sample.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-1.5">
                  <p className="text-[10.5px] font-medium text-slate-800 leading-tight line-clamp-2">
                    {sample.label}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Camera / Image Preview Stage */}
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 h-60 flex items-center justify-center">
            {isCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={previewImageUrl}
                alt="Gözlemlenen canlı fotoğrafı"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 bg-slate-950/80 backdrop-blur-xs px-3 py-1.5 rounded-lg text-[11px] text-white">
              <span className="font-mono tabular-nums truncate">
                {lat.toFixed(4)}°K, {lng.toFixed(4)}°D · {temperatureC}°C
              </span>
              {isCameraActive ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={captureCameraFrame}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-md transition-colors"
                  >
                    Fotoğrafı Çek
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors"
                  >
                    İptal
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {cameraError && (
            <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
              {cameraError}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-slate-700" />
              Fotoğraf Yükle
            </button>
            <button
              type="button"
              onClick={isCameraActive ? stopCamera : startCamera}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-700" />
              {isCameraActive ? 'Kamerayı Kapat' : 'Kamera ile Çek'}
            </button>
          </div>
        </div>

        {/* Location & Field Parameters */}
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              Gözlem Konumu (Kapaklı / Tekirdağ) ve Saha Verileri
            </h3>
            <button
              type="button"
              onClick={handleGetLiveGPS}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
            >
              <Navigation className="w-3 h-3" />
              GPS Konumumu Al
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Okul veya Mahalle Gözlem Bölgesi
            </label>
            <select
              value={selectedZoneId}
              onChange={(e) => handleZoneChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {YILDIZKENT_CAMPUS_ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.code} — {z.name} (Örtü: %{z.vegetationDensity})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Tam Sokak / Bahçe Noktası Açıklaması (Düzenlenebilir)
            </label>
            <input
              type="text"
              value={locationLabel}
              onChange={(e) => setLocationLabel(e.target.value)}
              placeholder="Örn: Yıldızkent Mah. 73. Sokak No:7 Bahçe Girişi, Kapaklı"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Enlem (Latitude °K)
              </label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(parseFloat(e.target.value) || 41.32017)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-mono tabular-nums text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Boylam (Longitude °D)
              </label>
              <input
                type="number"
                step="0.0001"
                value={lng}
                onChange={(e) => setLng(parseFloat(e.target.value) || 27.96703)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-mono tabular-nums text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Mevsim Geçiş Dönemi
              </label>
              <select
                value={seasonTransition}
                onChange={(e) => {
                  const val = e.target.value as SeasonTransition;
                  setSeasonTransition(val);
                  setMonth(
                    val === 'Eylül-Kasım (Sonbahar Geçişi)' ? 'Ekim' : 'Nisan'
                  );
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
              >
                <option value="Eylül-Kasım (Sonbahar Geçişi)">
                  Eylül–Kasım (Sonbahar Geçişi)
                </option>
                <option value="Mart-Mayıs (İlkbahar Geçişi)">
                  Mart–Mayıs (İlkbahar Geçişi)
                </option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-medium text-slate-700">
                  Hava Sıcaklığı (°C)
                </label>
                <span className="font-mono tabular-nums font-semibold text-emerald-800">
                  {temperatureC.toFixed(1)} °C
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={34}
                step={0.5}
                value={temperatureC}
                onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                className="w-full accent-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Öğrenci Adı Soyadı
              </label>
              <input
                type="text"
                value={observerStudent}
                onChange={(e) => setObserverStudent(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Sınıfı
                </label>
                <input
                  type="text"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Birey Sayısı
                </label>
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={individualCount}
                  onChange={(e) =>
                    setIndividualCount(Math.max(1, parseInt(e.target.value, 10) || 1))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-mono tabular-nums text-slate-900"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Öğrenci Gözlem İpucu (Ne yaparken gördünüz?)
            </label>
            <input
              type="text"
              value={studentNotes}
              onChange={(e) => setStudentNotes(e.target.value)}
              placeholder="Örn: Yaprak üzerinde yaprak bitlerini yerken veya çiçekte..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
            />
          </div>

          <button
            type="button"
            onClick={handleRunAIIdentification}
            disabled={isAnalyzing}
            className="w-full py-3 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Yapay Zekâ Türü, Nesil Durumunu ve Benzerlerini Analiz Ediyor...
              </>
            ) : (
              <>
                Yapay Zekâ ile Türü Tespit Et ve Doğrulama Başlat
              </>
            )}
          </button>

          {analysisError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800">
              {analysisError}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL (7 Cols): AI Diagnosis, Student Confirmation ("Sorsun Onaylama İstesin"), Similar Species, Conservation & Food Web */}
      <div className="xl:col-span-7 bg-white border border-slate-200 rounded-xl p-6">
        {aiResult ? (
          <div className="space-y-6">
            {/* Header with Primary AI Diagnosis */}
            <div className="border-b border-slate-200 pb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-emerald-800">
                    {aiResult.taxonomicGroup}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Familya: {aiResult.family}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums text-slate-700">
                    AI Güven Skoru: %{aiResult.confidenceScore}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mt-1">
                  {manualCommonName || aiResult.commonNameTr}
                </h3>
                <p className="text-sm italic text-slate-600 font-serif">
                  {manualScientificName || aiResult.scientificName}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">
                  Besin Zinciri Rolü
                </span>
                <span className="text-sm font-semibold text-emerald-800">
                  {aiResult.ecologicalRole}
                </span>
              </div>
            </div>

            {/* STEP 1: MANDATORY STUDENT VERIFICATION & CONFIRMATION BOX ("Bazen yanlış tür tespiti olabiliyor, sorsun onaylama istesin") */}
            <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/60 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Bilimsel Doğrulama ve Öğrenci Teşhis Onayı (Zorunlu Adım)
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Yapay zekâ ışık açısı veya benzerlik nedeniyle bazen yanılabilir. Haritaya kaydetmeden önce aşağıdaki özellikleri kontrol edin; doğruysa onaylayın veya benzer türlerden birini seçin:
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsManualEditOpen(!isManualEditOpen)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 shrink-0 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  Manuel Düzenle
                </button>
              </div>

              {/* Morphological Verification Checklist Questions */}
              <div className="space-y-1.5">
                {aiResult.verificationChecklist.map((question, qIdx) => (
                  <label
                    key={qIdx}
                    className="flex items-start gap-2.5 p-2 bg-white/90 rounded-lg border border-amber-200/80 text-xs text-slate-800 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedQuestions[qIdx]}
                      onChange={(e) =>
                        setCheckedQuestions((prev) => ({
                          ...prev,
                          [qIdx]: e.target.checked,
                        }))
                      }
                      className="mt-0.5 accent-emerald-700"
                    />
                    <span>{question}</span>
                  </label>
                ))}
              </div>

              {/* Manual Override Inputs if Teacher/Student wants to type exact species */}
              {isManualEditOpen && (
                <div className="p-3 bg-white rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Türün Türkçe Adını Düzenle
                    </label>
                    <input
                      type="text"
                      value={manualCommonName}
                      onChange={(e) => {
                        setManualCommonName(e.target.value);
                        setIsUserConfirmed(true);
                      }}
                      className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Bilimsel (Latince) Adını Düzenle
                    </label>
                    <input
                      type="text"
                      value={manualScientificName}
                      onChange={(e) => {
                        setManualScientificName(e.target.value);
                        setIsUserConfirmed(true);
                      }}
                      className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-xs italic"
                    />
                  </div>
                </div>
              )}

              {/* Similar Species Selection Cards ("Benzerleri nerede yaşıyor + yanlışsa seçebilsin") */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-800">
                  Karıştırılabilecek Benzer Türler ve Yaşadıkları Yerler:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {aiResult.similarSpecies.map((sim, idx) => {
                    const isChosenAlt = selectedAlternativeIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border text-xs flex flex-col justify-between gap-2 ${
                          isChosenAlt
                            ? 'bg-emerald-50 border-emerald-700'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-900">
                            {sim.commonNameTr}{' '}
                            <span className="italic font-normal text-slate-500 font-serif">
                              ({sim.scientificName})
                            </span>
                          </p>
                          <p className="text-slate-600">
                            <strong className="text-slate-800">Farkı: </strong>
                            {sim.distinguishingFeature}
                          </p>
                          <p className="text-slate-600">
                            <strong className="text-slate-800">Nerede Yaşar?: </strong>
                            {sim.whereItLives}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSwitchToSimilarSpecies(sim, idx)}
                          className={`w-full py-1.5 px-2.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                            isChosenAlt
                              ? 'bg-emerald-700 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          }`}
                        >
                          {isChosenAlt
                            ? '✓ Bu Benzer Tür Seçildi'
                            : 'Gördüğüm Canlı Bu Benzer Tür'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Confirmation Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-amber-200/80">
                <button
                  type="button"
                  onClick={handleConfirmPrimaryDiagnosis}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isUserConfirmed && selectedAlternativeIndex === null
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isUserConfirmed && selectedAlternativeIndex === null
                    ? `Teşhis Onaylandı: ${aiResult.commonNameTr}`
                    : `Evet, Yapay Zekâ Teşhisi Doğru (${aiResult.commonNameTr}) — Onayla`}
                </button>

                {isUserConfirmed && (
                  <span className="text-xs font-semibold text-emerald-800">
                    ✓ Seçilen Tür: {manualCommonName} ({manualScientificName})
                  </span>
                )}
              </div>
            </div>

            {/* STEP 2: Conservation Status (IUCN), Safety (Harmful/Harmless), Habitat & Diet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              <div className="p-4 bg-slate-50 rounded-xl space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Neslinin Tükenme Durumu (IUCN Kırmızı Liste):
                </span>
                <p className="font-bold text-slate-900">{aiResult.iucnStatus}</p>
                <p className="text-slate-600">{aiResult.extinctionRiskNote}</p>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-xl space-y-1.5">
                <span className="text-[11px] font-semibold text-emerald-800 block">
                  Zararlı mı, Zararsız mı? (İnsan ve Bahçe Etkisi):
                </span>
                <p className="font-bold text-emerald-950">
                  {aiResult.safetyClassification}
                </p>
                <p className="text-slate-700">{aiResult.safetyAndHumanImpact}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-1.5">
                <strong className="text-slate-900 block">
                  Nerelerde Yaşar? (Yaşam Alanı ve Coğrafi Dağılım):
                </strong>
                <p className="text-slate-700">{aiResult.whereItLives}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-1.5">
                <strong className="text-slate-900 block">
                  Ne Yer? (Beslenme Şekli ve Diyeti):
                </strong>
                <p className="text-slate-700">{aiResult.whatItEats}</p>
              </div>
            </div>

            {/* STEP 3: Food Chain & Predator-Prey (Av-Avcı) Relationship */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs font-semibold text-slate-900">
                  Besin Zincirindeki Yeri ve Av–Avcı İlişkisi
                </h4>
                <span className="text-xs font-semibold text-emerald-800">
                  {aiResult.foodChain.trophicLevel}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[11px] text-slate-500 block">
                    1. Üretici Basamağı
                  </span>
                  <p className="font-semibold text-slate-900 mt-1">
                    {aiResult.foodChain.producerSource}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[11px] text-slate-500 block">
                    2. Av / Besin Kaynağı
                  </span>
                  <p className="font-semibold text-slate-900 mt-1">
                    {aiResult.foodChain.lowerTrophic}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50/90 rounded-lg">
                  <span className="text-[11px] text-emerald-800 font-medium block">
                    3. Gözlemlenen Tür
                  </span>
                  <p className="font-bold text-emerald-950 mt-1">
                    {manualCommonName || aiResult.commonNameTr}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[11px] text-slate-500 block">
                    4. Avcıları (Predatörler)
                  </span>
                  <p className="font-semibold text-slate-900 mt-1">
                    {aiResult.foodChain.upperTrophic}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg text-xs text-slate-700 leading-relaxed space-y-1.5">
                <p>
                  <strong className="text-slate-900">Av–Avcı Dengesi: </strong>
                  {aiResult.foodChain.predatorPreySummary}
                </p>
                <p>
                  <strong className="text-slate-900">Ekosistem Hizmeti: </strong>
                  {aiResult.foodChain.ecosystemServiceSummary}
                </p>
              </div>
            </div>

            {/* STEP 4: 5. Sınıf ve 8. Sınıf MEB Fen Bilimleri Kazanım Uyumu */}
            <div className="pt-3 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
              <div className="p-3.5 bg-emerald-50/60 rounded-lg">
                <strong className="text-emerald-950 block mb-1">
                  5. Sınıf Kazanımı (İnsan ve Çevre — Biyoçeşitlilik):
                </strong>
                <p className="text-slate-700">
                  {aiResult.curriculumAlignment.grade5Biocenosis}
                </p>
              </div>
              <div className="p-3.5 bg-sky-50/70 rounded-lg">
                <strong className="text-sky-950 block mb-1">
                  8. Sınıf Kazanımı (Besin Zinciri ve Av–Avcı İlişkisi):
                </strong>
                <p className="text-slate-700">
                  {aiResult.curriculumAlignment.grade8FoodWeb}
                </p>
              </div>
            </div>

            {/* Save Button (Unlocked after student confirmation) */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 font-mono tabular-nums">
                Kaydedilecek Konum: {locationLabel} ({lat.toFixed(4)}°K, {lng.toFixed(4)}°D)
              </div>

              {saveSuccess ? (
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Onaylandı ve Kapaklı / Yıldızkent Ortaokulu Haritasına Kaydedildi!
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveToAtlas}
                  disabled={!isUserConfirmed}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isUserConfirmed
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  {isUserConfirmed
                    ? 'Onaylanan Türü Okul Haritasına Kaydet'
                    : 'Önce Yukarıdan Tür Teşhisini Onaylayın'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="py-16 px-4 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="max-w-lg mx-auto space-y-2">
              <h3 className="text-base font-semibold text-slate-900">
                Yapay Zekâ Biyoçeşitlilik Tanımlama ve Doğrulama Sistemi Hazır
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sol panelden bir kuş, kelebek, uğur böceği veya karınca fotoğrafı seçin ya da kendi fotoğrafınızı yükleyin. Yapay zekâ; türün nesli tükenme durumunu (IUCN), zararlı/zararsız analizini, nerede yaşayıp ne yediğini, benzer türlerin nerelerde yaşadığını ve 5. & 8. sınıf MEB kazanımlarına uygun Av–Avcı besin zincirini raporlayacak ve sizden teşhis onayı isteyecektir.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
