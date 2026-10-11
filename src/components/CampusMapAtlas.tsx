import React, { useState, useMemo, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  CampusZone,
  SpeciesObservation,
  TaxonomicGroup,
  SeasonTransition,
} from '../types/biodiversity';
import {
  YILDIZKENT_CAMPUS_ZONES,
  YILDIZKENT_SCHOOL_CENTER,
} from '../data/initialData';
import { SpecimenImage } from './SpecimenImage';
import {
  Crosshair,
  Layers,
  MapPin,
  Plus,
  ArrowRight,
  Navigation,
  Globe,
  Map as MapIcon,
} from 'lucide-react';

interface CampusMapAtlasProps {
  observations: SpeciesObservation[];
  selectedObsId: string;
  onSelectObservation: (id: string) => void;
  onStartNewObservationAtPoint: (
    zoneId: string,
    mapX: number,
    mapY: number,
    lat: number,
    lng: number,
    locationLabel: string
  ) => void;
}

type MapEngineMode = 'street' | 'satellite' | 'schematic';
type SchematicLayerMode = 'observations' | 'vegetation' | 'temperature' | 'foodweb';

const GROUP_COLOR_MAP: Record<
  TaxonomicGroup,
  { fill: string; stroke: string; labelCode: string; textClass: string }
> = {
  'Kuş': {
    fill: '#0284C7',
    stroke: '#E0F2FE',
    labelCode: 'KUŞ',
    textClass: 'text-sky-700',
  },
  'Kelebek': {
    fill: '#D97706',
    stroke: '#FEF3C7',
    labelCode: 'KLB',
    textClass: 'text-amber-700',
  },
  'Uğur Böceği': {
    fill: '#E11D48',
    stroke: '#FFE4E6',
    labelCode: 'UĞR',
    textClass: 'text-rose-700',
  },
  'Karınca': {
    fill: '#78350F',
    stroke: '#FEF3C7',
    labelCode: 'KRN',
    textClass: 'text-amber-900',
  },
  'Diğer Böcek': {
    fill: '#059669',
    stroke: '#D1FAE5',
    labelCode: 'POL',
    textClass: 'text-emerald-700',
  },
};

export const CampusMapAtlas: React.FC<CampusMapAtlasProps> = ({
  observations,
  selectedObsId,
  onSelectObservation,
  onStartNewObservationAtPoint,
}) => {
  const [seasonFilter, setSeasonFilter] = useState<'ALL' | SeasonTransition>('ALL');
  const [groupFilter, setGroupFilter] = useState<'ALL' | TaxonomicGroup>('ALL');
  const [mapEngine, setMapEngine] = useState<MapEngineMode>('street');
  const [layerMode, setLayerMode] = useState<SchematicLayerMode>('observations');
  const [activeZoneId, setActiveZoneId] = useState<string>('zone-a');
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number } | null>(null);
  const [customPin, setCustomPin] = useState<{
    x: number;
    y: number;
    lat: number;
    lng: number;
    zoneId: string;
    locationLabel: string;
  } | null>(null);
  const [inspectorTab, setInspectorTab] = useState<'ecology' | 'foodweb' | 'similar'>('ecology');

  const leafletContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const filteredObservations = useMemo(() => {
    return observations.filter((obs) => {
      const matchesSeason =
        seasonFilter === 'ALL' || obs.seasonTransition === seasonFilter;
      const matchesGroup =
        groupFilter === 'ALL' || obs.taxonomicGroup === groupFilter;
      return matchesSeason && matchesGroup;
    });
  }, [observations, seasonFilter, groupFilter]);

  const selectedObservation = useMemo(() => {
    return (
      filteredObservations.find((o) => o.id === selectedObsId) ||
      filteredObservations[0] ||
      observations[0]
    );
  }, [filteredObservations, observations, selectedObsId]);

  const activeZone: CampusZone = useMemo(() => {
    if (selectedObservation) {
      const z = YILDIZKENT_CAMPUS_ZONES.find(
        (zone) => zone.id === selectedObservation.zoneId
      );
      if (z) return z;
    }
    return (
      YILDIZKENT_CAMPUS_ZONES.find((z) => z.id === activeZoneId) ||
      YILDIZKENT_CAMPUS_ZONES[0]
    );
  }, [selectedObservation, activeZoneId]);

  // Helper to convert lat/lng near Yıldızkent Ortaokulu to 0-1000 / 0-620 schematic coordinates
  const latLngToSchematic = (lat: number, lng: number) => {
    const x = Math.round(
      Math.max(60, Math.min(940, 420 + (lng - YILDIZKENT_SCHOOL_CENTER.lng) * 280000))
    );
    const y = Math.round(
      Math.max(60, Math.min(560, 295 - (lat - YILDIZKENT_SCHOOL_CENTER.lat) * 320000))
    );
    return { x, y };
  };

  const findClosestZoneByLatLng = (lat: number, lng: number): CampusZone => {
    let closest = YILDIZKENT_CAMPUS_ZONES[0];
    let minD = Infinity;
    for (const z of YILDIZKENT_CAMPUS_ZONES) {
      const d = Math.hypot(z.lat - lat, z.lng - lng);
      if (d < minD) {
        minD = d;
        closest = z;
      }
    }
    return closest;
  };

  // Initialize & Sync Interactive Real Leaflet Map (Kapaklı / Tekirdağ - Yıldızkent Mah. 73. Sokak No:7)
  useEffect(() => {
    if (mapEngine === 'schematic') {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      return;
    }

    if (!leafletContainerRef.current) return;

    if (!leafletMapRef.current) {
      const map = L.map(leafletContainerRef.current, {
        center: [YILDIZKENT_SCHOOL_CENTER.lat, YILDIZKENT_SCHOOL_CENTER.lng],
        zoom: 18,
        zoomControl: true,
      });

      const layerGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = layerGroup;
      leafletMapRef.current = map;

      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        const closestZone = findClosestZoneByLatLng(lat, lng);
        const { x, y } = latLngToSchematic(lat, lng);
        setActiveZoneId(closestZone.id);
        setCustomPin({
          x,
          y,
          lat: Number(lat.toFixed(5)),
          lng: Number(lng.toFixed(5)),
          zoneId: closestZone.id,
          locationLabel: `${closestZone.streetAddressNote} (${lat.toFixed(5)}°K, ${lng.toFixed(5)}°D)`,
        });
      });
    }

    // Update Tile Layer (Street vs Satellite)
    if (tileLayerRef.current && leafletMapRef.current) {
      leafletMapRef.current.removeLayer(tileLayerRef.current);
    }

    if (leafletMapRef.current) {
      if (mapEngine === 'satellite') {
        tileLayerRef.current = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          {
            maxZoom: 19,
            attribution: 'Esri World Imagery · Yıldızkent Ortaokulu Kapaklı/Tekirdağ',
          }
        ).addTo(leafletMapRef.current);
      } else {
        tileLayerRef.current = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 19,
            attribution: '© OpenStreetMap · Yıldızkent Ortaokulu 73. Sokak No:7 Kapaklı/Tekirdağ',
          }
        ).addTo(leafletMapRef.current);
      }
    }
  }, [mapEngine]);

  // Render Zones, School Marker, Observation Pins & Custom Pin on Leaflet Map
  useEffect(() => {
    if (mapEngine === 'schematic' || !leafletMapRef.current || !markersLayerRef.current) {
      return;
    }

    const group = markersLayerRef.current;
    group.clearLayers();

    // 1. Draw Campus Zone Polygons around Yıldızkent Ortaokulu
    YILDIZKENT_CAMPUS_ZONES.forEach((zone) => {
      const isSelected = activeZone.id === zone.id;
      const poly = L.polygon(zone.geoPolygon, {
        color: isSelected ? '#047857' : '#475569',
        weight: isSelected ? 2.5 : 1.5,
        dashArray: isSelected ? undefined : '5, 5',
        fillColor: zone.vegetationDensity >= 70 ? '#059669' : '#0284C7',
        fillOpacity: isSelected ? 0.24 : 0.12,
      });

      poly.bindTooltip(
        `<div style="font-family: Plus Jakarta Sans, sans-serif; font-size: 11px;">
          <strong>${zone.code}: ${zone.name}</strong><br/>
          Bitki Örtüsü: %${zone.vegetationDensity} · Ort. Sıcaklık: ${zone.avgSpringTemp}°C
        </div>`,
        { sticky: true }
      );

      poly.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        setActiveZoneId(zone.id);
      });

      poly.addTo(group);
    });

    // 2. School Center Landmark Pin (Yıldızkent Ortaokulu, 73. Sokak No:7, Kapaklı/Tekirdağ)
    const schoolIcon = L.divIcon({
      className: 'custom-school-marker',
      html: `<div style="background:#0F172A;color:#FFFFFF;padding:4px 8px;border-radius:6px;border:2px solid #FFFFFF;font-family:Plus Jakarta Sans,sans-serif;font-size:10px;font-weight:700;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.3);">
        🏫 YILDIZKENT ORTAOKULU (73. Sk. No:7)
      </div>`,
      iconSize: [210, 26],
      iconAnchor: [105, 13],
    });
    L.marker([YILDIZKENT_SCHOOL_CENTER.lat, YILDIZKENT_SCHOOL_CENTER.lng], {
      icon: schoolIcon,
    }).addTo(group);

    // 3. Observation Markers
    filteredObservations.forEach((obs) => {
      const isSelected = selectedObservation?.id === obs.id;
      const colorInfo =
        GROUP_COLOR_MAP[obs.taxonomicGroup] || GROUP_COLOR_MAP['Diğer Böcek'];

      const obsIcon = L.divIcon({
        className: 'custom-obs-marker',
        html: `<div style="display:flex;align-items:center;gap:4px;background:${
          isSelected ? '#0F172A' : colorInfo.fill
        };color:#FFFFFF;padding:3px 7px;border-radius:999px;border:2px solid #FFFFFF;font-family:IBM Plex Mono,monospace;font-size:10px;font-weight:700;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.28);transform:${
          isSelected ? 'scale(1.12)' : 'scale(1)'
        };">
          <span>${colorInfo.labelCode}</span>
          <span style="font-family:Plus Jakarta Sans,sans-serif;font-weight:600;">${obs.commonNameTr.slice(
            0,
            14
          )}</span>
        </div>`,
        iconSize: [130, 26],
        iconAnchor: [65, 13],
      });

      const marker = L.marker([obs.lat, obs.lng], { icon: obsIcon });
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectObservation(obs.id);
      });
      marker.addTo(group);
    });

    // 4. User Custom Clicked Pin
    if (customPin) {
      const pinIcon = L.divIcon({
        className: 'custom-new-pin',
        html: `<div style="background:#059669;color:#FFFFFF;padding:4px 8px;border-radius:6px;border:2px solid #FFFFFF;font-family:IBM Plex Mono,monospace;font-size:10px;font-weight:700;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.35);">
          + YENİ GÖZLEM NOKTASI (${customPin.lat.toFixed(4)}°K, ${customPin.lng.toFixed(4)}°D)
        </div>`,
        iconSize: [240, 26],
        iconAnchor: [120, 13],
      });
      L.marker([customPin.lat, customPin.lng], { icon: pinIcon }).addTo(group);
    }
  }, [
    mapEngine,
    filteredObservations,
    selectedObservation,
    activeZone,
    customPin,
    onSelectObservation,
  ]);

  const handleUseBrowserGeolocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(5));
        const lng = Number(pos.coords.longitude.toFixed(5));
        const closest = findClosestZoneByLatLng(lat, lng);
        const { x, y } = latLngToSchematic(lat, lng);
        setCustomPin({
          x,
          y,
          lat,
          lng,
          zoneId: closest.id,
          locationLabel: `Öğrenci Canlı GPS Konumu (${lat}°K, ${lng}°D) · Kapaklı/Tekirdağ`,
        });
        if (leafletMapRef.current) {
          leafletMapRef.current.setView([lat, lng], 18);
        }
      },
      () => {
        // Fallback to school gate on 73. Sokak No:7 if permission denied
        setCustomPin({
          x: 285,
          y: 475,
          lat: YILDIZKENT_SCHOOL_CENTER.lat,
          lng: YILDIZKENT_SCHOOL_CENTER.lng,
          zoneId: 'zone-a',
          locationLabel: 'Yıldızkent Mah. 73. Sokak No:7 Okul Girişi, Kapaklı/Tekirdağ',
        });
      }
    );
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 1000);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 620);
    setHoverCoords({
      x: Math.max(0, Math.min(1000, x)),
      y: Math.max(0, Math.min(620, y)),
    });
  };

  const handleSchematicClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 1000);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 620);

    let closestZone = YILDIZKENT_CAMPUS_ZONES[0];
    let minDist = Infinity;
    for (const z of YILDIZKENT_CAMPUS_ZONES) {
      const dist = Math.hypot(z.centerX - x, z.centerY - y);
      if (dist < minDist) {
        minDist = dist;
        closestZone = z;
      }
    }

    const lat = Number(
      (YILDIZKENT_SCHOOL_CENTER.lat + (295 - y) / 320000).toFixed(5)
    );
    const lng = Number(
      (YILDIZKENT_SCHOOL_CENTER.lng + (x - 420) / 280000).toFixed(5)
    );

    setActiveZoneId(closestZone.id);
    setCustomPin({
      x,
      y,
      lat,
      lng,
      zoneId: closestZone.id,
      locationLabel: `${closestZone.streetAddressNote} (${lat}°K, ${lng}°D)`,
    });
  };

  const getZoneFillByLayer = (zone: CampusZone, isSelectedZone: boolean) => {
    if (layerMode === 'vegetation') {
      if (zone.vegetationDensity >= 80) return 'rgba(5, 150, 105, 0.34)';
      if (zone.vegetationDensity >= 65) return 'rgba(16, 185, 129, 0.24)';
      if (zone.vegetationDensity >= 45) return 'rgba(132, 204, 22, 0.20)';
      return 'rgba(148, 163, 184, 0.22)';
    }
    if (layerMode === 'temperature') {
      const temp =
        seasonFilter === 'Eylül-Kasım (Sonbahar Geçişi)'
          ? zone.avgAutumnTemp
          : zone.avgSpringTemp;
      if (temp >= 20.5) return 'rgba(217, 119, 6, 0.32)';
      if (temp >= 18.5) return 'rgba(245, 158, 11, 0.24)';
      return 'rgba(2, 132, 199, 0.24)';
    }
    return isSelectedZone
      ? 'rgba(5, 150, 105, 0.18)'
      : 'rgba(15, 23, 42, 0.04)';
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Map Mode Control Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-slate-500">Mevsim Geçişi:</span>
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setSeasonFilter('ALL')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                seasonFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tüm Dönemler ({observations.length})
            </button>
            <button
              type="button"
              onClick={() => setSeasonFilter('Eylül-Kasım (Sonbahar Geçişi)')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                seasonFilter === 'Eylül-Kasım (Sonbahar Geçişi)'
                  ? 'bg-white text-amber-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Eylül–Kasım Sonbahar
            </button>
            <button
              type="button"
              onClick={() => setSeasonFilter('Mart-Mayıs (İlkbahar Geçişi)')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                seasonFilter === 'Mart-Mayıs (İlkbahar Geçişi)'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mart–Mayıs İlkbahar
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Tür Grubu:</span>
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(['ALL', 'Kuş', 'Kelebek', 'Uğur Böceği', 'Karınca', 'Diğer Böcek'] as const).map(
              (group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setGroupFilter(group)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    groupFilter === group
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {group === 'ALL' ? 'Tümü' : group}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Main Split Workspace: Left Interactive Map (7 Cols) + Right Comprehensive Biological Inspector (5 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT STAGE: Interactive Kapaklı/Tekirdağ Map & Campus Schematic */}
        <div className="xl:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden">
          {/* Map Top Header & Mode Switcher */}
          <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Yıldızkent Ortaokulu ve Çevresi Canlı Takip Haritası (Kapaklı / Tekirdağ)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Adres: <strong>Yıldızkent, 73. Sokağı No:7, 59510 Kapaklı/Tekirdağ</strong> · Haritada gördüğünüz noktaya tıklayarak canlıyı tam konumuna kaydedin.
              </p>
            </div>

            {/* Map Engine Switcher: Street Map vs Satellite vs Campus Schematic */}
            <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
              <button
                type="button"
                onClick={() => setMapEngine('street')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  mapEngine === 'street'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-emerald-700" />
                73. Sokak Haritası
              </button>
              <button
                type="button"
                onClick={() => setMapEngine('satellite')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  mapEngine === 'satellite'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-sky-700" />
                Uydu Görünümü
              </button>
              <button
                type="button"
                onClick={() => setMapEngine('schematic')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  mapEngine === 'schematic'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-700" />
                Parsel Krokisi
              </button>
            </div>
          </div>

          {/* Sub-bar when in Schematic Mode */}
          {mapEngine === 'schematic' && (
            <div className="px-5 py-2 bg-slate-100/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-600 font-medium">
                Kroki Katmanı Seçimi:
              </span>
              <div className="flex items-center gap-1">
                {(
                  [
                    { id: 'observations', label: 'Gözlem Noktaları' },
                    { id: 'vegetation', label: 'Bitki Örtüsü (%)' },
                    { id: 'temperature', label: 'Sıcaklık (°C)' },
                    { id: 'foodweb', label: 'Av–Avcı Besin Ağı' },
                  ] as const
                ).map((layer) => (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setLayerMode(layer.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      layerMode === layer.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {layer.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MAP VIEWPORT: Either Real Leaflet Map (Kapaklı/Tekirdağ) OR Ecological Campus Schematic */}
          <div className="relative bg-[#F3F6F4]">
            {mapEngine !== 'schematic' ? (
              <div
                ref={leafletContainerRef}
                className="w-full h-[500px] z-10 cursor-crosshair"
              />
            ) : (
              <svg
                viewBox="0 0 1000 620"
                className="w-full h-auto block cursor-crosshair select-none"
                onMouseMove={handleSvgMouseMove}
                onMouseLeave={() => setHoverCoords(null)}
                onClick={handleSchematicClick}
              >
                <defs>
                  <pattern
                    id="campus-topo-grid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="#CBD5E1"
                      strokeWidth="0.6"
                      strokeDasharray="2,2"
                    />
                  </pattern>
                  <pattern
                    id="canopy-dots"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="6" cy="6" r="1.5" fill="#059669" fillOpacity="0.22" />
                    <circle cx="16" cy="14" r="2" fill="#047857" fillOpacity="0.18" />
                  </pattern>
                  <marker
                    id="trophic-arrow"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669" />
                  </marker>
                </defs>

                <rect width="1000" height="620" fill="url(#campus-topo-grid)" />

                <rect
                  x="30"
                  y="35"
                  width="940"
                  height="555"
                  rx="14"
                  fill="#EBF1EC"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeDasharray="6,4"
                />
                <text
                  x="48"
                  y="24"
                  fill="#64748B"
                  fontSize="11"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  YILDIZKENT ORTAOKULU · 73. SOKAK NO:7 KAPAKLI / TEKİRDAĞ · 41.32017°K 27.96703°D
                </text>

                <path
                  d="M 285 475 L 420 295 L 320 130 M 420 295 L 735 195 M 420 295 L 160 300 M 420 295 L 700 460"
                  stroke="#CBD5E1"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.65"
                />

                {YILDIZKENT_CAMPUS_ZONES.map((zone) => {
                  const isSelectedZone = activeZone.id === zone.id;
                  return (
                    <g
                      key={zone.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveZoneId(zone.id);
                      }}
                      className="cursor-pointer transition-opacity"
                    >
                      <polygon
                        points={zone.polygonPoints}
                        fill={getZoneFillByLayer(zone, isSelectedZone)}
                        stroke={isSelectedZone ? '#047857' : '#64748B'}
                        strokeWidth={isSelectedZone ? '2.2' : '1.2'}
                        strokeDasharray={isSelectedZone ? 'none' : '4,3'}
                      />
                      {zone.vegetationDensity >= 65 && (
                        <polygon
                          points={zone.polygonPoints}
                          fill="url(#canopy-dots)"
                          pointerEvents="none"
                        />
                      )}

                      <g transform={`translate(${zone.centerX}, ${zone.centerY - 38})`}>
                        <rect
                          x="-95"
                          y="-14"
                          width="190"
                          height="34"
                          rx="4"
                          fill="#FFFFFF"
                          fillOpacity="0.92"
                          stroke="#CBD5E1"
                          strokeWidth="1"
                        />
                        <text
                          x="0"
                          y="0"
                          textAnchor="middle"
                          fill="#0F172A"
                          fontSize="10.5"
                          fontWeight="600"
                          fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                          {zone.code} · Bitki Örtüsü %{zone.vegetationDensity}
                        </text>
                        <text
                          x="0"
                          y="13"
                          textAnchor="middle"
                          fill="#475569"
                          fontSize="9.5"
                          fontFamily="IBM Plex Mono, monospace"
                        >
                          {zone.lat.toFixed(4)}°K · {zone.lng.toFixed(4)}°D
                        </text>
                      </g>
                    </g>
                  );
                })}

                <g transform="translate(330, 238)">
                  <rect
                    x="0"
                    y="0"
                    width="180"
                    height="96"
                    rx="6"
                    fill="#1E293B"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />
                  <rect x="10" y="10" width="160" height="24" rx="2" fill="#334155" />
                  <rect x="10" y="42" width="65" height="44" rx="2" fill="#334155" />
                  <rect x="105" y="42" width="65" height="44" rx="2" fill="#334155" />
                  <text
                    x="90"
                    y="26"
                    textAnchor="middle"
                    fill="#F8FAFC"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    YILDIZKENT ORTAOKULU
                  </text>
                  <text
                    x="90"
                    y="68"
                    textAnchor="middle"
                    fill="#94A3B8"
                    fontSize="9.5"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    73. SOKAK NO:7 KAPAKLI
                  </text>
                </g>

                {layerMode === 'foodweb' && (
                  <g opacity="0.85">
                    <path
                      d="M 255 465 Q 450 310 695 175"
                      stroke="#059669"
                      strokeWidth="2"
                      strokeDasharray="5,4"
                      fill="none"
                      markerEnd="url(#trophic-arrow)"
                    />
                    <path
                      d="M 695 175 Q 520 140 340 125"
                      stroke="#0284C7"
                      strokeWidth="2"
                      strokeDasharray="5,4"
                      fill="none"
                      markerEnd="url(#trophic-arrow)"
                    />
                  </g>
                )}

                {filteredObservations.map((obs) => {
                  const isSelected = selectedObservation?.id === obs.id;
                  const style =
                    GROUP_COLOR_MAP[obs.taxonomicGroup] ||
                    GROUP_COLOR_MAP['Diğer Böcek'];

                  return (
                    <g
                      key={obs.id}
                      transform={`translate(${obs.mapX}, ${obs.mapY})`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectObservation(obs.id);
                      }}
                      className="cursor-pointer"
                    >
                      {isSelected && (
                        <circle
                          cx="0"
                          cy="0"
                          r="24"
                          fill={style.fill}
                          fillOpacity="0.22"
                          stroke={style.fill}
                          strokeWidth="1.5"
                        />
                      )}
                      <circle
                        cx="0"
                        cy="0"
                        r={isSelected ? '14' : '11'}
                        fill={style.fill}
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="7.5"
                        fontWeight="700"
                        fontFamily="IBM Plex Mono, monospace"
                      >
                        {style.labelCode}
                      </text>
                    </g>
                  );
                })}

                {customPin && (
                  <g transform={`translate(${customPin.x}, ${customPin.y})`}>
                    <circle
                      cx="0"
                      cy="0"
                      r="16"
                      fill="#0F172A"
                      fillOpacity="0.15"
                      stroke="#0F172A"
                      strokeWidth="1.5"
                      strokeDasharray="3,2"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="6"
                      fill="#0F172A"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </g>
                )}
              </svg>
            )}

            {/* Bottom Map HUD Bar: Live Coordinates, GPS Locator & Custom Pin Trigger */}
            <div className="px-5 py-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5 font-mono tabular-nums text-slate-800">
                  <Crosshair className="w-3.5 h-3.5 text-emerald-700" />
                  {customPin
                    ? `SEÇİLİ NOKTA: ${customPin.lat}°K, ${customPin.lng}°D`
                    : hoverCoords
                    ? `KROKİ: ${hoverCoords.x}D · ${hoverCoords.y}K`
                    : `MERKEZ: ${YILDIZKENT_SCHOOL_CENTER.lat}°K, ${YILDIZKENT_SCHOOL_CENTER.lng}°D (73. Sk. No:7)`}
                </span>

                <button
                  type="button"
                  onClick={handleUseBrowserGeolocation}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
                >
                  <Navigation className="w-3 h-3" />
                  Mevcut GPS Konumumu Kullan
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                {customPin ? (
                  <button
                    type="button"
                    onClick={() =>
                      onStartNewObservationAtPoint(
                        customPin.zoneId,
                        customPin.x,
                        customPin.y,
                        customPin.lat,
                        customPin.lng,
                        customPin.locationLabel
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Seçili Noktaya ({customPin.lat.toFixed(4)}°K) Canlı Kaydet
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onStartNewObservationAtPoint(
                        activeZone.id,
                        activeZone.centerX,
                        activeZone.centerY,
                        activeZone.lat,
                        activeZone.lng,
                        activeZone.streetAddressNote
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    {activeZone.code} Konumuna Gözlem Ekle
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Observation List Below Map */}
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-semibold text-slate-900">
                Kapaklı / Yıldızkent Ortaokulu Çevresinde Kaydedilen Canlılar ({filteredObservations.length})
              </h4>
              <span className="text-[11px] text-slate-500 font-mono">
                Tıklayarak Haritada ve Sağ Panelde İnceleyin
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {filteredObservations.map((obs) => {
                const isSelected = selectedObservation?.id === obs.id;
                return (
                  <button
                    key={obs.id}
                    type="button"
                    onClick={() => {
                      onSelectObservation(obs.id);
                      if (leafletMapRef.current && mapEngine !== 'schematic') {
                        leafletMapRef.current.panTo([obs.lat, obs.lng]);
                      }
                    }}
                    className={`text-left p-2.5 rounded-lg border transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/90 border-emerald-700 text-slate-900'
                        : 'bg-white border-slate-200 hover:bg-slate-100/70 text-slate-700'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">
                        {obs.commonNameTr}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {obs.taxonomicGroup} · {obs.month} · {obs.temperatureC}°C
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {obs.lat.toFixed(4)}°K
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT INSPECTOR DECK (5 Cols): Comprehensive Biological, Safety, Extinction, Food Web & Curriculum Card */}
        <div className="xl:col-span-5 space-y-5">
          {selectedObservation ? (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <SpecimenImage
                src={selectedObservation.imageUrl}
                alt={selectedObservation.commonNameTr}
                taxonomicGroup={selectedObservation.taxonomicGroup}
                scientificName={selectedObservation.scientificName}
                className="w-full h-52"
              />

              <div className="p-5 space-y-4">
                {/* Unboxed Clean Metadata Header (Zero-Pill Discipline) */}
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                    <span className="font-semibold text-emerald-800">
                      {selectedObservation.taxonomicGroup}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Familya: {selectedObservation.family}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      {selectedObservation.lat.toFixed(4)}°K, {selectedObservation.lng.toFixed(4)}°D
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mt-1">
                    {selectedObservation.commonNameTr}
                  </h3>
                  <p className="text-sm italic text-slate-600 font-serif">
                    {selectedObservation.scientificName}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Konum: <strong className="text-slate-700">{selectedObservation.locationLabel}</strong>
                  </p>
                </div>

                {/* Segmented Inspector Sub-Tabs for Clean Progressive Disclosure */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setInspectorTab('ecology')}
                    className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      inspectorTab === 'ecology'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Yaşam, Beslenme & Nesil
                  </button>
                  <button
                    type="button"
                    onClick={() => setInspectorTab('foodweb')}
                    className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      inspectorTab === 'foodweb'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Besin Zinciri & Av–Avcı
                  </button>
                  <button
                    type="button"
                    onClick={() => setInspectorTab('similar')}
                    className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      inspectorTab === 'similar'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Benzerleri & 5-8. Sınıf
                  </button>
                </div>

                {/* TAB 1: Nesli Tükenme Durumu, Zararlı/Zararsız, Nerelerde Yaşar, Ne Yer */}
                {inspectorTab === 'ecology' && (
                  <div className="space-y-3.5 text-xs leading-relaxed text-slate-700">
                    <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                      <span className="text-[11px] font-semibold text-slate-500 block">
                        Neslinin Tükenme Durumu (IUCN Kırmızı Liste Statüsü):
                      </span>
                      <p className="font-semibold text-slate-900">
                        {selectedObservation.iucnStatus}
                      </p>
                      <p className="text-slate-600">
                        {selectedObservation.extinctionRiskNote}
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50/60 rounded-lg space-y-1">
                      <span className="text-[11px] font-semibold text-emerald-800 block">
                        Zararlı mı, Zararsız mı? (İnsan ve Bahçe Etkisi):
                      </span>
                      <p className="font-semibold text-emerald-950">
                        {selectedObservation.safetyClassification}
                      </p>
                      <p className="text-slate-700">
                        {selectedObservation.safetyAndHumanImpact}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 space-y-2.5">
                      <div>
                        <strong className="text-slate-900 block">
                          Nerelerde Yaşar? (Yaşam Alanı & Coğrafi Yayılış):
                        </strong>
                        <span>{selectedObservation.whereItLives}</span>
                      </div>

                      <div>
                        <strong className="text-slate-900 block">
                          Ne Yer? (Beslenme Şekli ve Diyeti):
                        </strong>
                        <span>{selectedObservation.whatItEats}</span>
                      </div>

                      <div>
                        <strong className="text-slate-900 block">
                          Sıcaklık ({selectedObservation.temperatureC}°C) ve Bitki Örtüsü (%{selectedObservation.vegetationDensityPercent}) İlişkisi:
                        </strong>
                        <span>
                          {selectedObservation.temperatureToleranceRange} ·{' '}
                          {selectedObservation.vegetationRelationship}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: Besin Zincirindeki Yeri ve Av–Avcı İlişkisi */}
                {inspectorTab === 'foodweb' && (
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                      <span className="text-slate-500">Trofik Basamağı:</span>
                      <span className="font-semibold text-emerald-800 text-right">
                        {selectedObservation.foodChain.trophicLevel}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 bg-slate-50 rounded-lg">
                        <span className="text-[11px] text-slate-500 block">
                          1. Üretici Basamağı (Bitkisel Kaynak):
                        </span>
                        <span className="font-semibold text-slate-900">
                          {selectedObservation.foodChain.producerSource}
                        </span>
                      </div>

                      <div className="flex justify-center text-emerald-700">
                        <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-lg">
                        <span className="text-[11px] text-slate-500 block">
                          2. Av / Besin Kaynağı (Ne İle Beslenir?):
                        </span>
                        <span className="font-semibold text-slate-900">
                          {selectedObservation.foodChain.lowerTrophic}
                        </span>
                      </div>

                      <div className="flex justify-center text-emerald-700">
                        <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                      </div>

                      <div className="p-2.5 bg-emerald-50/80 rounded-lg">
                        <span className="text-[11px] text-emerald-800 block">
                          3. Gözlemlenen Tür ({selectedObservation.ecologicalRole}):
                        </span>
                        <span className="font-bold text-emerald-950">
                          {selectedObservation.foodChain.speciesNode}
                        </span>
                      </div>

                      <div className="flex justify-center text-emerald-700">
                        <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-lg">
                        <span className="text-[11px] text-slate-500 block">
                          4. Avcıları (Predatörler — Kimler Onu Avlar?):
                        </span>
                        <span className="font-semibold text-slate-900">
                          {selectedObservation.foodChain.upperTrophic}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50/70 rounded-lg text-slate-800 space-y-1">
                      <strong className="text-slate-900 block">
                        Av–Avcı Dengesi (Bu Tür Yok Olursa Ne Olur?):
                      </strong>
                      <p>{selectedObservation.foodChain.predatorPreySummary}</p>
                    </div>
                  </div>
                )}

                {/* TAB 3: Benzerleri Nerede Yaşar & 5. ve 8. Sınıf MEB Kazanımları */}
                {inspectorTab === 'similar' && (
                  <div className="space-y-4 text-xs leading-relaxed text-slate-700">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Karıştırılabilecek Benzer Türler ve Yaşadıkları Yerler
                      </h4>
                      <div className="space-y-2.5">
                        {selectedObservation.similarSpecies.map((sim, idx) => (
                          <div key={idx} className="p-3 bg-slate-50 rounded-lg space-y-1">
                            <p className="font-semibold text-slate-900">
                              {sim.commonNameTr}{' '}
                              <span className="italic font-normal text-slate-500 font-serif">
                                ({sim.scientificName})
                              </span>
                            </p>
                            <p>
                              <strong className="text-slate-800">Ayırt Edici Farkı: </strong>
                              {sim.distinguishingFeature}
                            </p>
                            <p>
                              <strong className="text-slate-800">Nerede Yaşar?: </strong>
                              {sim.whereItLives}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 space-y-2.5">
                      <h4 className="font-semibold text-slate-900">
                        5. ve 8. Sınıf MEB Fen Bilimleri Kazanım Bağlantısı
                      </h4>
                      <div className="p-3 bg-emerald-50/60 rounded-lg space-y-1">
                        <strong className="text-emerald-950 block">
                          5. Sınıf (Ünite 6: İnsan ve Çevre — Biyoçeşitlilik):
                        </strong>
                        <p>{selectedObservation.curriculumAlignment.grade5Biocenosis}</p>
                      </div>
                      <div className="p-3 bg-sky-50/70 rounded-lg space-y-1">
                        <strong className="text-sky-950 block">
                          8. Sınıf (Ünite 6: Besin Zinciri, Av–Avcı ve Enerji Akışı):
                        </strong>
                        <p>{selectedObservation.curriculumAlignment.grade8FoodWeb}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
