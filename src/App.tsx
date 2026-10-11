/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  INITIAL_OBSERVATIONS,
  YILDIZKENT_SCHOOL_CENTER,
} from './data/initialData';
import { SpeciesObservation } from './types/biodiversity';
import { CampusMapAtlas } from './components/CampusMapAtlas';
import { SpeciesIdentifierLab } from './components/SpeciesIdentifierLab';
import { TubitakResearchAnalytics } from './components/TubitakResearchAnalytics';
import { SpeciesCatalogView } from './components/SpeciesCatalogView';
import { DataBackupAndMobileHub } from './components/DataBackupAndMobileHub';
import {
  Download,
  Plus,
  Map as MapIcon,
  Camera,
  BarChart3,
  BookOpen,
  QrCode,
} from 'lucide-react';

type ActiveSection = 'atlas' | 'identify' | 'research' | 'catalog' | 'backup';

const STORAGE_KEY = 'yildizkent_bioatlas_kapakli_v2';
const DEFAULT_PUBLIC_APP_URL =
  'https://ais-pre-lqbawn52crmj6gogzljini-40331100281.europe-west2.run.app';

export default function App() {
  const [observations, setObservations] = useState<SpeciesObservation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          Array.isArray(parsed) &&
          parsed.length > 0 &&
          parsed[0].iucnStatus
        ) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial dataset
    }
    return INITIAL_OBSERVATIONS;
  });

  const [activeSection, setActiveSection] = useState<ActiveSection>('atlas');
  const [selectedObsId, setSelectedObsId] = useState<string>(
    INITIAL_OBSERVATIONS[0].id
  );
  const [miniQrDataUrl, setMiniQrDataUrl] = useState<string>('');
  const [draftPin, setDraftPin] = useState<{
    zoneId: string;
    mapX: number;
    mapY: number;
    lat: number;
    lng: number;
    locationLabel: string;
  }>({
    zoneId: 'zone-a',
    mapX: 285,
    mapY: 475,
    lat: YILDIZKENT_SCHOOL_CENTER.lat,
    lng: YILDIZKENT_SCHOOL_CENTER.lng,
    locationLabel: YILDIZKENT_SCHOOL_CENTER.address,
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(observations));
    } catch {
      // Ignore storage quota errors
    }
  }, [observations]);

  // Generate persistent mini QR code for the bottom access banner
  useEffect(() => {
    const targetUrl =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.href.split('#')[0]
        : DEFAULT_PUBLIC_APP_URL;

    QRCode.toDataURL(targetUrl, {
      width: 180,
      margin: 1,
      color: { dark: '#0F172A', light: '#FFFFFF' },
    })
      .then((url) => setMiniQrDataUrl(url))
      .catch(() => {});
  }, []);

  const handleStartNewObservationAtPoint = (
    zoneId: string,
    mapX: number,
    mapY: number,
    lat: number,
    lng: number,
    locationLabel: string
  ) => {
    setDraftPin({ zoneId, mapX, mapY, lat, lng, locationLabel });
    setActiveSection('identify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveObservation = (newObs: SpeciesObservation) => {
    setObservations((prev) => [newObs, ...prev]);
    setSelectedObsId(newObs.id);
    setTimeout(() => {
      setActiveSection('atlas');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 650);
  };

  const handleRestoreObservations = (
    restored: SpeciesObservation[],
    mode: 'merge' | 'replace'
  ) => {
    if (mode === 'replace') {
      setObservations(restored);
      if (restored[0]) setSelectedObsId(restored[0].id);
    } else {
      setObservations((prev) => {
        const existingIds = new Set(prev.map((o) => o.id));
        const newUnique = restored.filter((r) => !existingIds.has(r.id));
        return [...newUnique, ...prev];
      });
    }
  };

  const handleResetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setObservations(INITIAL_OBSERVATIONS);
    setSelectedObsId(INITIAL_OBSERVATIONS[0].id);
  };

  const handleLocateOnMap = (obsId: string) => {
    setSelectedObsId(obsId);
    setActiveSection('atlas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Turkce_Tur_Adi',
      'Bilimsel_Ad',
      'Familya',
      'Taksonomik_Grup',
      'IUCN_Nesil_Durumu',
      'Zararli_Zararsiz_Sinifi',
      'Besin_Zinciri_Rolu',
      'Trofik_Basamak',
      'Ne_Yer',
      'Nerede_Yasar',
      'Mevsim_Gecisi',
      'Ay',
      'Tarih',
      'Sicaklik_C',
      'Bitki_Ortusu_Yuzde',
      'Konum_Aciklamasi',
      'Enlem_Lat',
      'Boylam_Lng',
      'Birey_Sayisi',
      'Ogrenci_Gozlemci',
      'Sinif',
    ];

    const rows = observations.map((o) =>
      [
        o.id,
        `"${o.commonNameTr}"`,
        `"${o.scientificName}"`,
        `"${o.family}"`,
        `"${o.taxonomicGroup}"`,
        `"${o.iucnStatus}"`,
        `"${o.safetyClassification}"`,
        `"${o.ecologicalRole}"`,
        `"${o.foodChain.trophicLevel}"`,
        `"${o.whatItEats.replace(/"/g, '""')}"`,
        `"${o.whereItLives.replace(/"/g, '""')}"`,
        `"${o.seasonTransition}"`,
        o.month,
        o.observedDate,
        o.temperatureC,
        o.vegetationDensityPercent,
        `"${o.locationLabel}"`,
        o.lat,
        o.lng,
        o.individualCount,
        `"${o.observerStudent}"`,
        `"${o.studentClass}"`,
      ].join(',')
    );

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      'yildizkent_ortaokulu_kapakli_biyocesitlilik_veriseti.csv'
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalIndividuals = observations.reduce(
    (sum, o) => sum + o.individualCount,
    0
  );
  const uniqueSpecies = new Set(observations.map((o) => o.scientificName)).size;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] pb-20 md:pb-0">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#atlas"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('atlas');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 font-serif-display whitespace-nowrap shrink-0"
        >
          Yıldızkent BiyoAtlas
        </a>

        {/* Zone 2: 5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveSection('atlas')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'atlas'
                ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-slate-900'
            }`}
          >
            Dijital Atlas
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('identify')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'identify'
                ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-slate-900'
            }`}
          >
            Tür Tanımla
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('research')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'research'
                ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-slate-900'
            }`}
          >
            TÜBİTAK Analizi
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('catalog')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'catalog'
                ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-slate-900'
            }`}
          >
            Besin Ağı Rehberi
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('backup')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'backup'
                ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-slate-900'
            }`}
          >
            Yedekleme & Karekod
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSection('backup')}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">Yedek & Mobil QR</span>
            <span className="sm:hidden">QR / Yedek</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('identify')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Gözlem Ekle
          </button>
        </div>
      </header>

      {/* Institutional & Scientific Context Banner */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-emerald-800">
                Yıldızkent Ortaokulu (Yıldızkent Mah. 73. Sokak No:7, Kapaklı/Tekirdağ)
              </span>
              <span aria-hidden="true">·</span>
              <span>TÜBİTAK 4006-B Bilim Fuarı</span>
              <span aria-hidden="true">·</span>
              <span>5. & 8. Sınıf Kazanım Uyumlu</span>
            </div>

            <h1 className="text-xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Okul Çevresi Kuş ve Böcek Biyoçeşitliliği Dijital Atlası
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Kapaklı / Tekirdağ Yıldızkent Ortaokulu bahçesi ve çevresinde gözlemlenen canlıların <strong>nesli tükenme durumunu (IUCN)</strong>, <strong>zararlı/zararsız analizini</strong>, <strong>yaşam alanı ve beslenme şeklini</strong>, <strong>benzer türlerini</strong> ve <strong>Av–Avcı besin zinciri ilişkilerini</strong> mevsim geçişleriyle (Eylül–Kasım / Mart–Mayıs) inceleyen vatandaş bilimi platformu.
            </p>
          </div>

          {/* Unboxed Tabular Summary Readout */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
            <div>
              <span className="text-xs text-slate-500 block">Gözlem Kaydı</span>
              <span className="text-lg sm:text-xl font-mono font-bold tabular-nums text-slate-900">
                {observations.length}
              </span>
              <span className="text-xs text-slate-400 font-mono ml-1">nokta</span>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div>
              <span className="text-xs text-slate-500 block">Tanımlanan Tür</span>
              <span className="text-lg sm:text-xl font-mono font-bold tabular-nums text-slate-900">
                {uniqueSpecies}
              </span>
              <span className="text-xs text-slate-400 font-mono ml-1">takson</span>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div>
              <span className="text-xs text-slate-500 block">Sayılan Birey</span>
              <span className="text-lg sm:text-xl font-mono font-bold tabular-nums text-emerald-800">
                {totalIndividuals}
              </span>
              <span className="text-xs text-slate-400 font-mono ml-1">canlı</span>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div>
              <span className="text-xs text-slate-500 block">Merkez Koordinat</span>
              <span className="text-xs sm:text-sm font-mono font-bold tabular-nums text-slate-900">
                41.3202°K, 27.9670°D
              </span>
              <span className="text-[11px] text-slate-400 block">Kapaklı / Tekirdağ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeSection === 'atlas' && (
          <CampusMapAtlas
            observations={observations}
            selectedObsId={selectedObsId}
            onSelectObservation={(id) => setSelectedObsId(id)}
            onStartNewObservationAtPoint={handleStartNewObservationAtPoint}
          />
        )}

        {activeSection === 'identify' && (
          <SpeciesIdentifierLab
            initialZoneId={draftPin.zoneId}
            initialMapX={draftPin.mapX}
            initialMapY={draftPin.mapY}
            initialLat={draftPin.lat}
            initialLng={draftPin.lng}
            initialLocationLabel={draftPin.locationLabel}
            onSaveObservation={handleSaveObservation}
          />
        )}

        {activeSection === 'research' && (
          <TubitakResearchAnalytics observations={observations} />
        )}

        {activeSection === 'catalog' && (
          <SpeciesCatalogView
            observations={observations}
            onLocateOnMap={handleLocateOnMap}
          />
        )}

        {activeSection === 'backup' && (
          <DataBackupAndMobileHub
            observations={observations}
            onRestoreObservations={handleRestoreObservations}
            onResetToDefaults={handleResetToDefaults}
            onExportCSV={handleExportCSV}
          />
        )}

        {/* Always-Accessible Quick Mobile QR & Data Backup Strip (when not on the backup tab) */}
        {activeSection !== 'backup' && (
          <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              {miniQrDataUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection('backup');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2 bg-white border border-slate-200 rounded-xl shrink-0 hover:border-emerald-600 transition-colors cursor-pointer"
                  title="Büyütmek için tıklayın"
                >
                  <img
                    src={miniQrDataUrl}
                    alt="Cep Telefonu Erişim Karekodu"
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-contain"
                  />
                </button>
              )}
              <div className="space-y-1 max-w-xl">
                <span className="text-xs font-semibold text-emerald-800">
                  Cep Telefonundan Karekodla Erişim ve Veri Yedekleme Alanı
                </span>
                <h3 className="text-base font-semibold text-slate-900">
                  Karekodu Okutarak Cep Telefonunuzdan Canlı Takibi Yapın veya Verilerinizi Yedekleyin
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Öğrenciler telefon kamerasıyla karekodu okutup bahçede gördükleri canlıları kaydedebilir. Farklı telefonlardaki verileri <strong>JSON Yedeği İndir / Yükle</strong> özelliğiyle birleştirebilirsiniz.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveSection('backup');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                Yedekleme & Büyük Karekodu Aç
              </button>
              <button
                type="button"
                onClick={handleExportCSV}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Excel (CSV) İndir
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Fixed Bottom Thumb-Zone Navigation Bar (md:hidden) */}
      <nav
        aria-label="Mobil Alt Menü"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-5 items-center h-16 px-1"
      >
        {(
          [
            { id: 'atlas', label: 'Harita', Icon: MapIcon },
            { id: 'identify', label: 'Tanımla', Icon: Camera },
            { id: 'research', label: 'TÜBİTAK', Icon: BarChart3 },
            { id: 'catalog', label: 'Rehber', Icon: BookOpen },
            { id: 'backup', label: 'Yedek/QR', Icon: QrCode },
          ] as const
        ).map(({ id, label, Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                setActiveSection(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`min-h-[44px] flex flex-col items-center justify-center py-1 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? 'text-emerald-800 font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? 'text-emerald-700 stroke-[2.4]' : 'stroke-[1.8]'
                }`}
              />
              <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Quiet Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 mt-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            Yıldızkent Ortaokulu (Yıldızkent, 73. Sokağı No:7, 59510 Kapaklı/Tekirdağ) · TÜBİTAK 4006-B Bilim Fuarı Projesi
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                setActiveSection('backup');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-900 underline cursor-pointer"
            >
              Veri Yedekle / Yedekten Yükle (.JSON)
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={handleExportCSV}
              className="hover:text-slate-900 underline cursor-pointer"
            >
              Excel Tablosu İndir (.CSV)
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="hover:text-slate-900 underline cursor-pointer"
            >
              Örnek Saha Verilerini Sıfırla
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
