import React, { useState } from 'react';
import { TaxonomicGroup } from '../types/biodiversity';

interface SpecimenImageProps {
  src?: string;
  alt: string;
  taxonomicGroup: TaxonomicGroup;
  scientificName?: string;
  className?: string;
}

export const SpecimenImage: React.FC<SpecimenImageProps> = ({
  src,
  alt,
  taxonomicGroup,
  scientificName,
  className = 'w-full h-48',
}) => {
  const [hasError, setHasError] = useState(false);

  const renderBotanicalFallback = () => {
    const bgMap: Record<TaxonomicGroup, string> = {
      'Kuş': 'from-sky-900 via-slate-900 to-emerald-950',
      'Kelebek': 'from-amber-900 via-stone-900 to-emerald-950',
      'Uğur Böceği': 'from-rose-950 via-stone-900 to-emerald-950',
      'Karınca': 'from-stone-900 via-amber-950 to-neutral-900',
      'Diğer Böcek': 'from-emerald-950 via-teal-900 to-slate-900',
    };

    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${bgMap[taxonomicGroup] || bgMap['Diğer Böcek']} flex flex-col items-center justify-center p-4 text-white ${className}`}
      >
        {/* Subtle coordinate grid overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="specimen-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#specimen-grid)" />
        </svg>

        {/* Custom Scientific Vector Illustration per Taxonomic Group */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {taxonomicGroup === 'Kuş' && (
            <svg className="w-14 h-14 text-sky-300 mb-2" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 44c8-2 14-8 18-16 3-6 9-12 18-12 3 0 6 2 7 4l5 2-5 3c-2 8-8 16-17 20-8 3-17 3-26-1z" />
              <circle cx="48" cy="21" r="1.5" fill="currentColor" />
              <path d="M26 45l-6 11M34 45l-2 11" />
            </svg>
          )}
          {taxonomicGroup === 'Kelebek' && (
            <svg className="w-14 h-14 text-amber-300 mb-2" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M32 16v34" strokeWidth="2.5" />
              <path d="M32 22c-8-12-22-10-22 2 0 8 10 12 22 10" />
              <path d="M32 22c8-12 22-10 22 2 0 8-10 12-22 10" />
              <path d="M32 34c-10 0-18 6-16 14 2 6 12 4 16-4" />
              <path d="M32 34c10 0 18 6 16 14-2 6-12 4-16-4" />
              <path d="M32 16l-5-7M32 16l5-7" />
            </svg>
          )}
          {taxonomicGroup === 'Uğur Böceği' && (
            <svg className="w-14 h-14 text-rose-300 mb-2" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="32" cy="36" rx="16" ry="18" />
              <path d="M22 22c3-5 17-5 20 0" />
              <line x1="32" y1="18" x2="32" y2="54" />
              <circle cx="25" cy="30" r="2" fill="currentColor" />
              <circle cx="39" cy="30" r="2" fill="currentColor" />
              <circle cx="24" cy="40" r="2" fill="currentColor" />
              <circle cx="40" cy="40" r="2" fill="currentColor" />
              <circle cx="32" cy="25" r="2" fill="currentColor" />
            </svg>
          )}
          {taxonomicGroup === 'Karınca' && (
            <svg className="w-14 h-14 text-amber-200 mb-2" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="32" cy="16" r="5" />
              <ellipse cx="32" cy="28" rx="4" ry="6" />
              <ellipse cx="32" cy="45" rx="8" ry="10" />
              <path d="M28 26l-12-6M36 26l12-6M28 29l-14 2M36 29l14 2M29 33l-12 10M35 33l12 10" />
            </svg>
          )}
          {taxonomicGroup === 'Diğer Böcek' && (
            <svg className="w-14 h-14 text-emerald-300 mb-2" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="32" cy="36" rx="9" ry="14" />
              <circle cx="32" cy="18" r="5" />
              <path d="M28 26c-12-6-18 2-14 8s10 2 14-4" />
              <path d="M36 26c12-6 18 2 14 8s-10 2-14-4" />
              <line x1="25" y1="34" x2="39" y2="34" />
              <line x1="24" y1="40" x2="40" y2="40" />
            </svg>
          )}
          <span className="text-xs font-medium text-white/90 tracking-tight line-clamp-1">
            {alt}
          </span>
          {scientificName && (
            <span className="text-[11px] italic text-white/65 font-serif line-clamp-1">
              {scientificName}
            </span>
          )}
        </div>
      </div>
    );
  };

  if (!src || hasError) {
    return renderBotanicalFallback();
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-200 hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-2.5 left-3 right-3 text-white pointer-events-none">
        <p className="text-xs font-semibold leading-tight truncate">{alt}</p>
        {scientificName && (
          <p className="text-[11px] italic text-white/80 leading-tight truncate">
            {scientificName}
          </p>
        )}
      </div>
    </div>
  );
};
