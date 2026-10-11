import React, { useState, useMemo } from 'react';
import {
  EcologicalRole,
  SpeciesObservation,
  TaxonomicGroup,
} from '../types/biodiversity';
import { SpecimenImage } from './SpecimenImage';
import { Search, MapPin } from 'lucide-react';

interface SpeciesCatalogViewProps {
  observations: SpeciesObservation[];
  onLocateOnMap: (obsId: string) => void;
}

export const SpeciesCatalogView: React.FC<SpeciesCatalogViewProps> = ({
  observations,
  onLocateOnMap,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | EcologicalRole>('ALL');
  const [groupFilter, setGroupFilter] = useState<'ALL' | TaxonomicGroup>('ALL');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(
    observations[0]?.id || null
  );

  const filteredList = useMemo(() => {
    return observations.filter((obs) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        obs.commonNameTr.toLowerCase().includes(q) ||
        obs.scientificName.toLowerCase().includes(q) ||
        obs.observerStudent.toLowerCase().includes(q) ||
        obs.locationLabel.toLowerCase().includes(q) ||
        obs.whatItEats.toLowerCase().includes(q) ||
        obs.whereItLives.toLowerCase().includes(q);
      const matchesRole =
        roleFilter === 'ALL' || obs.ecologicalRole === roleFilter;
      const matchesGroup =
        groupFilter === 'ALL' || obs.taxonomicGroup === groupFilter;

      return matchesSearch && matchesRole && matchesGroup;
    });
  }, [observations, searchQuery, roleFilter, groupFilter]);

  return (
    <div className="space-y-6">
      {/* Search & Ecological Role Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tür adı, ne yer, nerede yaşar, 73. Sokak konumu veya öğrenci ara..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(['ALL', 'Kuş', 'Kelebek', 'Uğur Böceği', 'Karınca', 'Diğer Böcek'] as const).map(
              (grp) => (
                <button
                  key={grp}
                  type="button"
                  onClick={() => setGroupFilter(grp)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    groupFilter === grp
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {grp === 'ALL' ? 'Tüm Gruplar' : grp}
                </button>
              )
            )}
          </div>
        </div>

        {/* Ecological Role Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium">
            Besin Zinciri Rolü:
          </span>
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(
              [
                { id: 'ALL', label: 'Tüm Roller' },
                { id: 'Tozlaştırıcı (Polinatör)', label: 'Tozlaştırıcı (Polinatör)' },
                {
                  id: 'Zararlı Kontrolcüsü (Biyolojik Mücadele)',
                  label: 'Zararlı Kontrolcüsü',
                },
                {
                  id: 'Ayrıştırıcı & Toprak Mühendisi',
                  label: 'Ayrıştırıcı & Toprak Mühendisi',
                },
                {
                  id: 'Tohum Dağıtıcı & Böcekçil',
                  label: 'Tohum Dağıtıcı & Böcekçil',
                },
              ] as const
            ).map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setRoleFilter(role.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  roleFilter === role.id
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Species Observation Cards Grid */}
      {filteredList.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <p className="text-sm font-medium text-slate-700">
            Arama kriterlerinize uygun tür gözlem kaydı bulunamadı.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setRoleFilter('ALL');
              setGroupFilter('ALL');
            }}
            className="mt-3 px-4 py-2 text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredList.map((obs) => {
            const isExpanded = expandedCardId === obs.id;
            return (
              <article
                key={obs.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <SpecimenImage
                    src={obs.imageUrl}
                    alt={obs.commonNameTr}
                    taxonomicGroup={obs.taxonomicGroup}
                    scientificName={obs.scientificName}
                    className="w-full h-52"
                  />

                  <div className="p-5 space-y-3.5 text-xs leading-relaxed">
                    {/* Unboxed Clean Metadata Kicker (Zero-Pill Discipline) */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-semibold text-emerald-800">
                        {obs.taxonomicGroup}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{obs.month}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {obs.temperatureC}°C
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {obs.lat.toFixed(4)}°K, {obs.lng.toFixed(4)}°D
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {obs.commonNameTr}
                      </h3>
                      <p className="text-xs italic text-slate-500 font-serif">
                        {obs.scientificName} — Familya: {obs.family} · Konum: {obs.locationLabel}
                      </p>
                    </div>

                    {/* IUCN Extinction Status & Harmful/Harmless Summary */}
                    <div className="pt-2.5 border-t border-slate-100 space-y-2 text-slate-700">
                      <p>
                        <strong className="text-slate-900">
                          Nesli Tükenme Durumu (IUCN):{' '}
                        </strong>
                        <span className="font-semibold text-amber-900">
                          {obs.iucnStatus}
                        </span>{' '}
                        — {obs.extinctionRiskNote}
                      </p>
                      <p>
                        <strong className="text-slate-900">
                          Zararlı mı, Zararsız mı?:{' '}
                        </strong>
                        <span className="font-semibold text-emerald-800">
                          {obs.safetyClassification}
                        </span>{' '}
                        — {obs.safetyAndHumanImpact}
                      </p>
                      <p>
                        <strong className="text-slate-900">Nerelerde Yaşar?: </strong>
                        {obs.whereItLives}
                      </p>
                      <p>
                        <strong className="text-slate-900">Ne Yer?: </strong>
                        {obs.whatItEats}
                      </p>
                    </div>

                    {/* Food Chain & Predator-Prey (Av-Avcı) Summary */}
                    <div className="pt-2.5 border-t border-slate-100 space-y-1.5 text-slate-700">
                      <p>
                        <strong className="text-slate-900">
                          Besin Zinciri Basamağı:{' '}
                        </strong>
                        <span className="text-emerald-800 font-semibold">
                          {obs.foodChain.trophicLevel}
                        </span>
                      </p>
                      <p>
                        <strong className="text-slate-900">
                          Üretici → Av → Avcı Akışı:{' '}
                        </strong>
                        {obs.foodChain.producerSource} → {obs.foodChain.lowerTrophic} →{' '}
                        <strong>{obs.commonNameTr}</strong> → {obs.foodChain.upperTrophic}
                      </p>
                      <p>
                        <strong className="text-slate-900">Av–Avcı Dengesi: </strong>
                        {obs.foodChain.predatorPreySummary}
                      </p>
                    </div>

                    {/* Expandable Similar Species & 5th/8th Grade MEB Curriculum Alignment */}
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedCardId(isExpanded ? null : obs.id)
                        }
                        className="text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
                      >
                        {isExpanded
                          ? 'Benzer Türleri ve 5. & 8. Sınıf Kazanımlarını Gizle ↑'
                          : 'Benzer Türleri (Nerede Yaşar?) ve 5. & 8. Sınıf Kazanımlarını Gör ↓'}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-100 space-y-3 text-slate-700">
                          <div>
                            <strong className="text-slate-900 block mb-1">
                              Benzer Türler ve Yaşadıkları Yerler:
                            </strong>
                            <div className="space-y-2">
                              {obs.similarSpecies.map((sim, idx) => (
                                <div key={idx} className="p-2.5 bg-slate-50 rounded-lg">
                                  <p className="font-semibold text-slate-900">
                                    {sim.commonNameTr} ({sim.scientificName})
                                  </p>
                                  <p>
                                    <strong>Farkı:</strong> {sim.distinguishingFeature}
                                  </p>
                                  <p>
                                    <strong>Nerede Yaşar?:</strong> {sim.whereItLives}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div className="p-2.5 bg-emerald-50/60 rounded-lg">
                              <strong className="text-emerald-950 block">
                                5. Sınıf (Biyoçeşitlilik):
                              </strong>
                              <p>{obs.curriculumAlignment.grade5Biocenosis}</p>
                            </div>
                            <div className="p-2.5 bg-sky-50/70 rounded-lg">
                              <strong className="text-sky-950 block">
                                8. Sınıf (Besin Zinciri & Av–Avcı):
                              </strong>
                              <p>{obs.curriculumAlignment.grade8FoodWeb}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500 truncate">
                    Gözlemci: <strong className="text-slate-800">{obs.observerStudent} ({obs.studentClass})</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => onLocateOnMap(obs.id)}
                    className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Kapaklı Haritasında Göster
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
