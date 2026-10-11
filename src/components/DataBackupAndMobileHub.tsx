import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { SpeciesObservation } from '../types/biodiversity';
import { INITIAL_OBSERVATIONS } from '../data/initialData';
import {
  Download,
  Upload,
  QrCode,
  Smartphone,
  CheckCircle2,
  Copy,
  RefreshCw,
  FileJson,
  Layers,
} from 'lucide-react';

interface DataBackupAndMobileHubProps {
  observations: SpeciesObservation[];
  onRestoreObservations: (
    restored: SpeciesObservation[],
    mode: 'merge' | 'replace'
  ) => void;
  onResetToDefaults: () => void;
  onExportCSV: () => void;
}

const DEFAULT_PUBLIC_APP_URL =
  'https://ais-pre-lqbawn52crmj6gogzljini-40331100281.europe-west2.run.app';

export const DataBackupAndMobileHub: React.FC<DataBackupAndMobileHubProps> = ({
  observations,
  onRestoreObservations,
  onResetToDefaults,
  onExportCSV,
}) => {
  const [qrUrl, setQrUrl] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.href.split('#')[0];
    }
    return DEFAULT_PUBLIC_APP_URL;
  });
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [restoreMode, setRestoreMode] = useState<'merge' | 'replace'>('merge');
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [pastedJson, setPastedJson] = useState<string>('');
  const [copiedBackup, setCopiedBackup] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let active = true;
    const targetUrl = qrUrl.trim() || DEFAULT_PUBLIC_APP_URL;
    QRCode.toDataURL(targetUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        if (active) setQrDataUrl(url);
      })
      .catch(() => {
        // Fallback if QR generation fails
      });
    return () => {
      active = false;
    };
  }, [qrUrl]);

  // 1. Export Full JSON Backup
  const handleDownloadJSONBackup = () => {
    const backupPayload = {
      project:
        'Yıldızkent Ortaokulu (Kapaklı/Tekirdağ) TÜBİTAK 4006-B Biyoçeşitlilik Dijital Atlası',
      version: '2.0',
      exportedAt: new Date().toISOString(),
      observationCount: observations.length,
      observations,
    };

    const jsonString = JSON.stringify(backupPayload, null, 2);
    const blob = new Blob([jsonString], {
      type: 'application/json;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.setAttribute(
      'download',
      `yildizkent_biyoatlas_yedek_${dateStr}.json`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setStatusMessage({
      type: 'success',
      text: `${observations.length} gözlem kaydı içeren tam veri yedeği (.json) başarıyla indirildi.`,
    });
  };

  // 2. Copy Backup JSON to Clipboard
  const handleCopyBackupToClipboard = async () => {
    try {
      const backupPayload = {
        project: 'Yıldızkent Ortaokulu TÜBİTAK 4006-B BiyoAtlas',
        exportedAt: new Date().toISOString(),
        observations,
      };
      await navigator.clipboard.writeText(JSON.stringify(backupPayload));
      setCopiedBackup(true);
      setStatusMessage({
        type: 'success',
        text: 'Yedek veri kodu panoya kopyalandı. Başka bir cihazda "Yedek Kodu Yapıştır" alanına yapıştırarak yükleyebilirsiniz.',
      });
      setTimeout(() => setCopiedBackup(false), 3000);
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Panoya kopyalama başarısız oldu. Lütfen JSON dosyası olarak indirin.',
      });
    }
  };

  // Validate and parse uploaded or pasted JSON
  const parseAndApplyBackup = (rawJsonText: string) => {
    try {
      const parsed = JSON.parse(rawJsonText);
      const list: SpeciesObservation[] = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed?.observations)
        ? parsed.observations
        : [];

      if (list.length === 0) {
        throw new Error(
          'Yüklenen dosyada geçerli gözlem kaydı bulunamadı.'
        );
      }

      // Normalize fields so older backups also work seamlessly
      const normalized: SpeciesObservation[] = list.map((item, idx) => ({
        ...INITIAL_OBSERVATIONS[0],
        ...item,
        id: item.id || `restored-${Date.now()}-${idx}`,
        commonNameTr: item.commonNameTr || 'Tanımlanan Tür',
        scientificName: item.scientificName || 'Species sp.',
        lat: Number(item.lat) || 41.32017,
        lng: Number(item.lng) || 27.96703,
        individualCount: Number(item.individualCount) || 1,
      }));

      onRestoreObservations(normalized, restoreMode);
      setStatusMessage({
        type: 'success',
        text:
          restoreMode === 'merge'
            ? `${normalized.length} kayıt mevcut verilerle başarıyla birleştirildi!`
            : `${normalized.length} kayıt yedekten geri yüklendi!`,
      });
      setPastedJson('');
    } catch (err: unknown) {
      setStatusMessage({
        type: 'error',
        text:
          err instanceof Error
            ? `Yedek yükleme hatası: ${err.message}`
            : 'Geçersiz JSON yedek dosyası formatı.',
      });
    }
  };

  // 3. Upload JSON Backup File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        parseAndApplyBackup(reader.result);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // 4. Download Printable QR Code Stand Card for TÜBİTAK 4006-B Booth
  const handleDownloadQRStandCard = () => {
    if (!qrDataUrl) return;
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 760;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // White Card Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 600, 760);

    // Emerald Header Banner
    ctx.fillStyle = '#047857';
    ctx.fillRect(0, 0, 600, 120);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('YILDIZKENT ORTAOKULU · KAPAKLI / TEKİRDAĞ', 300, 50);
    ctx.font = '16px sans-serif';
    ctx.fillText('TÜBİTAK 4006-B Biyoçeşitlilik Dijital Atlası', 300, 85);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 120, 155, 360, 360);

      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 2;
      ctx.strokeRect(115, 150, 370, 370);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('Cep Telefonunuzdan Kamerayla Okutun', 300, 570);

      ctx.fillStyle = '#475569';
      ctx.font = '14px sans-serif';
      ctx.fillText(
        'Okul bahçesindeki kuş ve böcekleri fotoğraflayın,',
        300,
        605
      );
      ctx.fillText(
        'yapay zekâ ile tanımlayın ve canlı haritaya kaydedin!',
        300,
        630
      );

      ctx.fillStyle = '#047857';
      ctx.font = '12px monospace';
      ctx.fillText('Yıldızkent Mah. 73. Sokak No:7 Kapaklı/Tekirdağ', 300, 705);

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.setAttribute('download', 'yildizkent_tubitak_karekod_karti.png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    img.src = qrDataUrl;
  };

  return (
    <div className="space-y-8">
      {/* Status Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl border text-xs font-medium flex items-center justify-between gap-3 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="underline text-xs shrink-0 cursor-pointer"
          >
            Kapat
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (7 Cols): Data Backup & Restore Center */}
        <div className="xl:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-semibold text-emerald-800">
              Saha Verisi Güvenliği ve Çoklu Cihaz Birleştirme
            </span>
            <h2 className="text-xl font-semibold text-slate-900 mt-1">
              Veri Yedekleme ve Yedekten Geri Yükleme Merkezi
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Öğrencilerin cep telefonlarıyla sahada kaydettiği gözlem verilerini <strong>JSON Yedek Dosyası</strong> olarak indirebilir, farklı telefonlardan toplanan yedekleri ana bilgisayarda birleştirebilir veya istediğiniz zaman geri yükleyebilirsiniz.
            </p>
          </div>

          {/* Step 1: Backup / Export Controls */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  1. Mevcut Verileri Yedekle (Dışa Aktar)
                </h3>
                <p className="text-xs text-slate-500">
                  Şu anda atlasta kayıtlı <strong>{observations.length} gözlem</strong> (fotoğraflar, koordinatlar ve AI analizleriyle birlikte) yedeklenir.
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-800">
                {observations.length} Aktif Kayıt
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={handleDownloadJSONBackup}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileJson className="w-4 h-4 shrink-0" />
                Tam Yedek İndir (.JSON)
              </button>

              <button
                type="button"
                onClick={onExportCSV}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 shrink-0" />
                Excel Tablosu İndir (.CSV)
              </button>

              <button
                type="button"
                onClick={handleCopyBackupToClipboard}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4 shrink-0 text-emerald-700" />
                {copiedBackup ? 'Kopyalandı!' : 'Yedek Kodunu Kopyala'}
              </button>
            </div>
          </div>

          {/* Step 2: Restore / Import Backup Controls */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                2. Yedeklenen Verileri Geri Yükle (İçe Aktar)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Daha önce indirdiğiniz <code>.json</code> yedek dosyasını seçerek veya yedek kodunu yapıştırarak verilerinizi geri yükleyin.
              </p>
            </div>

            {/* Restore Mode Selector: Merge vs Replace */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-700">
                Yükleme Yöntemi:
              </span>
              <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
                <button
                  type="button"
                  onClick={() => setRestoreMode('merge')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    restoreMode === 'merge'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Mevcut Kayıtlarla Birleştir (Üzerine Ekle)
                </button>
                <button
                  type="button"
                  onClick={() => setRestoreMode('replace')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    restoreMode === 'replace'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tüm Veri Setini Yedekle Değiştir
                </button>
              </div>
            </div>

            {/* Upload File Trigger */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Bilgisayardan / Telefondan Yedek Dosyası (.JSON) Seç ve Yükle
              </button>

              <button
                type="button"
                onClick={() => {
                  onResetToDefaults();
                  setStatusMessage({
                    type: 'success',
                    text: 'Veri seti başlangıçtaki 12 örnek Yıldızkent Ortaokulu gözlem kaydına sıfırlandı.',
                  });
                }}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Varsayılan Saha Verilerine Sıfırla
              </button>
            </div>

            {/* Paste Backup Code Box */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Veya Kopyalanan Yedek Kodunu (JSON) Buraya Yapıştırarak Yükleyin:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={pastedJson}
                  onChange={(e) => setPastedJson(e.target.value)}
                  placeholder='{"project":"Yıldızkent Ortaokulu...","observations":[...]}'
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-mono text-slate-800"
                />
                <button
                  type="button"
                  disabled={!pastedJson.trim()}
                  onClick={() => parseAndApplyBackup(pastedJson)}
                  className="min-h-[40px] px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  Yapıştırılan Veriyi Yükle
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): QR Code Mobile Access & TÜBİTAK Stand Card */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div className="border-b border-slate-200 pb-4 flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-emerald-800">
                TÜBİTAK 4006-B Standı · Cep Telefonundan Hızlı Erişim
              </span>
              <h2 className="text-xl font-semibold text-slate-900 mt-1">
                Karekod (QR) ile Cep Telefonundan Giriş
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Öğrenciler ve bilim fuarı ziyaretçileri telefon kamerasıyla bu karekodu okutarak uygulamayı doğrudan cep telefonlarında açabilir, bahçede fotoğraf çekip haritaya kaydedebilirler.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
          </div>

          {/* Scannable QR Code Display Card */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center text-center space-y-3">
            {qrDataUrl ? (
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <img
                  src={qrDataUrl}
                  alt="Yıldızkent BiyoAtlas Mobil Erişim Karekodu"
                  referrerPolicy="no-referrer"
                  className="w-52 h-52 object-contain mx-auto"
                />
              </div>
            ) : (
              <div className="w-52 h-52 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-xs text-slate-400">
                Karekod hazırlanıyor...
              </div>
            )}

            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">
                Yıldızkent Ortaokulu BiyoAtlas Mobil Erişim
              </p>
              <p className="text-xs text-slate-500">
                Telefon kameranızı karekoda tutun · Kurulum gerektirmez
              </p>
            </div>

            <div className="w-full pt-2">
              <label className="block text-[11px] font-medium text-slate-500 text-left mb-1">
                Karekod Bağlantı Adresi (Paylaşım Linki):
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={qrUrl}
                  onChange={(e) => setQrUrl(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-mono text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setQrUrl(DEFAULT_PUBLIC_APP_URL)}
                  className="px-2.5 py-1.5 text-[11px] font-medium bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg whitespace-nowrap cursor-pointer"
                >
                  Paylaşım URL
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadQRStandCard}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              TÜBİTAK Fuar Masası İçin Karekod Kartını İndir (.PNG)
            </button>
          </div>

          {/* Mobile Compatibility Highlights */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2 font-semibold text-emerald-950">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Cep Telefonu (Mobil Saha) Uyumluluk Özellikleri</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>
                <strong>Alt Başparmak Menüsü:</strong> Cep telefonlarında ekranın altında tek elle kolayca kullanılan 5’li mobil sekme çubuğu yer alır.
              </li>
              <li>
                <strong>Arka Kamera ve Canlı GPS:</strong> Sahada yürürken arka kamerayı doğrudan açar ve Kapaklı/Tekirdağ GPS koordinatını otomatik alır.
              </li>
              <li>
                <strong>Çevrimdışı & Yerel Hafıza + JSON Birleştirme:</strong> Telefonlarda kaydedilen veriler cihaz hafızasında tutulur ve JSON yedeğiyle ana bilgisayara aktarılır.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
