import { kelvinToHex, type Mounting, type Product } from '../data/products'

/**
 * A sectional drawing of the fitting, in the idiom lighting trade catalogues
 * actually use — ceiling line, body, and the light it throws, with the beam
 * drawn at the product's own colour temperature and spread to its real angle.
 *
 * This is doing a job a photograph would not: two products that differ only in
 * colour temperature look identical in a photo, and obviously different here.
 */
export function Luminaire({ p, className = '' }: { p: Product; className?: string }) {
  const light = kelvinToHex(p.cct)
  const id = `beam-${p.sku}`
  // Beam half-width at the bottom of the frame, from the real beam angle.
  const spread = Math.min(96, Math.tan((Math.min(p.beam, 150) / 2) * (Math.PI / 180)) * 70)

  return (
    <svg viewBox="0 0 200 120" className={className} role="img" aria-label={`${p.name}, ${p.cct}K, ${p.beam} degree beam`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light} stopOpacity="0.85" />
          <stop offset="70%" stopColor={light} stopOpacity="0.16" />
          <stop offset="100%" stopColor={light} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="200" height="120" fill="#FDFCFA" />

      {/* Exterior fittings sit on the ground and throw light outward and down.
          Drawing them hanging from a ceiling would be wrong in a way anyone in
          the trade would notice immediately. */}
      {p.family === 'Exterior' ? (
        <>
          <path d={`M 100 ${p.mounting === 'Recessed' ? 74 : 46} L ${100 + spread * 1.4} 104 L ${100 - spread * 1.4} 104 Z`} fill={`url(#${id})`} />
          <g fill="none" stroke="#1A1F1C" strokeWidth="1.5" strokeLinecap="square">
            <path d="M 10 104 H 190" />
            {p.mounting === 'Surface' ? (
              <>
                {/* bollard: post with a shielded aperture near the top */}
                <path d="M 92 104 V 40 H 108 V 104" />
                <path d="M 92 48 H 108" strokeWidth="1" />
                <path d="M 93 46 H 107" stroke={light} strokeWidth="3" />
              </>
            ) : (
              <>
                {/* step light: recessed into a riser, shielded downward */}
                <path d="M 10 104 H 76 M 124 104 H 190 M 76 104 V 68 H 124 V 104" />
                <path d="M 82 74 H 118" strokeWidth="1" />
                <path d="M 84 76 H 116" stroke={light} strokeWidth="3" />
              </>
            )}
          </g>
        </>
      ) : (
      <>
      {/* the beam */}
      {p.mounting === 'Linear' ? (
        <path d={`M 56 30 L 144 30 L ${144 + spread} 120 L ${56 - spread} 120 Z`} fill={`url(#${id})`} />
      ) : (
        <path d={`M 100 ${beamOrigin(p.mounting)} L ${100 + spread} 120 L ${100 - spread} 120 Z`} fill={`url(#${id})`} />
      )}

      {/* the fitting */}
      <g fill="none" stroke="#1A1F1C" strokeWidth="1.5" strokeLinecap="square">
        {p.mounting === 'Recessed' && (
          <>
            <path d="M 10 28 H 78 M 122 28 H 190" />
            <path d="M 78 28 V 16 H 122 V 28" />
            <path d="M 84 28 H 116" stroke={light} strokeWidth="3" />
          </>
        )}
        {p.mounting === 'Surface' && (
          <>
            <path d="M 10 22 H 190" />
            <path d="M 82 22 V 38 H 118 V 22" />
            <path d="M 84 38 H 116" stroke={light} strokeWidth="3" />
          </>
        )}
        {p.mounting === 'Track' && (
          <>
            <path d="M 24 22 H 176" />
            <rect x="30" y="18" width="140" height="8" />
            <path d="M 100 26 V 34" />
            <g transform="rotate(14 100 34)">
              <rect x="88" y="34" width="24" height="26" rx="3" />
              <path d="M 90 60 H 110" stroke={light} strokeWidth="3" />
            </g>
          </>
        )}
        {p.mounting === 'Pendant' && (
          <>
            <path d="M 10 18 H 190" />
            <path d="M 100 18 V 44" />
            <path d="M 72 72 L 86 44 H 114 L 128 72 Z" />
            <path d="M 74 72 H 126" stroke={light} strokeWidth="3" />
          </>
        )}
        {p.mounting === 'Linear' && (
          <>
            <path d="M 10 18 H 190" />
            <path d="M 70 18 V 26 M 130 18 V 26" />
            <rect x="56" y="26" width="88" height="10" rx="1" />
            <path d="M 58 36 H 142" stroke={light} strokeWidth="3" />
          </>
        )}
      </g>
      </>
      )}
    </svg>
  )
}

function beamOrigin(m: Mounting): number {
  if (m === 'Recessed') return 28
  if (m === 'Surface') return 38
  if (m === 'Track') return 58
  return 72
}
