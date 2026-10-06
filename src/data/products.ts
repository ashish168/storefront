export type Mounting = 'Recessed' | 'Surface' | 'Track' | 'Pendant' | 'Linear'
export type Family = 'Downlights' | 'Track' | 'Linear' | 'Decorative' | 'Exterior'

export interface Product {
  sku: string
  name: string
  family: Family
  mounting: Mounting
  /** Correlated colour temperature, in kelvin. */
  cct: number
  lumens: number
  watts: number
  cri: number
  beam: number
  ip: number
  /** Trade price, GBP, per unit. */
  price: number
  stock: number
  lead: string
  blurb: string
  finishes: string[]
}

/** Demo catalogue. Specifications are plausible but invented. */
export const PRODUCTS: Product[] = [
  { sku: 'KD-110-27', name: 'Mast Downlight 110', family: 'Downlights', mounting: 'Recessed', cct: 2700, lumens: 980, watts: 11, cri: 97, beam: 36, ip: 44, price: 68, stock: 240, lead: 'In stock', blurb: 'Deep-baffle downlight with a 97 CRI array. Specified where glare control matters more than raw output — galleries, hospitality, high-end retail.', finishes: ['Matt white', 'Anodised black', 'Brushed brass'] },
  { sku: 'KD-110-30', name: 'Mast Downlight 110', family: 'Downlights', mounting: 'Recessed', cct: 3000, lumens: 1040, watts: 11, cri: 97, beam: 36, ip: 44, price: 68, stock: 180, lead: 'In stock', blurb: 'The 3000K variant of the Mast 110. Warmer than neutral, cooler than domestic — the usual choice for workplace reception and circulation.', finishes: ['Matt white', 'Anodised black', 'Brushed brass'] },
  { sku: 'KD-140-40', name: 'Mast Downlight 140', family: 'Downlights', mounting: 'Recessed', cct: 4000, lumens: 2100, watts: 22, cri: 90, beam: 60, ip: 44, price: 94, stock: 86, lead: 'In stock', blurb: 'Larger aperture for floor-to-ceiling heights above 3.2m. Wide beam, neutral white, built for open-plan offices on a 2.4m grid.', finishes: ['Matt white', 'Anodised black'] },
  { sku: 'KD-065-27', name: 'Pin Downlight 65', family: 'Downlights', mounting: 'Recessed', cct: 2700, lumens: 420, watts: 5, cri: 95, beam: 24, ip: 20, price: 41, stock: 0, lead: '6 weeks', blurb: 'Miniature aperture for plasterboard soffits where the ceiling void is shallow. Narrow beam, intended for accent rather than ambient light.', finishes: ['Matt white', 'Matt black'] },
  { sku: 'KT-220-30', name: 'Rail Spot 220', family: 'Track', mounting: 'Track', cct: 3000, lumens: 1450, watts: 16, cri: 93, beam: 24, ip: 20, price: 112, stock: 54, lead: 'In stock', blurb: 'Adjustable head on three-circuit track. Tool-free lock at any angle through 355°, which matters when a gallery rehangs twice a year.', finishes: ['Matt white', 'Matt black', 'Silver'] },
  { sku: 'KT-220-40', name: 'Rail Spot 220', family: 'Track', mounting: 'Track', cct: 4000, lumens: 1520, watts: 16, cri: 93, beam: 24, ip: 20, price: 112, stock: 31, lead: 'In stock', blurb: 'Neutral-white Rail Spot. Specified in workshops and production spaces where colour judgement is part of the work.', finishes: ['Matt white', 'Matt black', 'Silver'] },
  { sku: 'KT-340-30', name: 'Rail Flood 340', family: 'Track', mounting: 'Track', cct: 3000, lumens: 2800, watts: 30, cri: 90, beam: 50, ip: 20, price: 158, stock: 22, lead: 'In stock', blurb: 'High-output flood for double-height volumes. Pairs with the 220 on the same circuit for layered retail schemes.', finishes: ['Matt white', 'Matt black'] },
  { sku: 'KL-1200-35', name: 'Datum Linear 1200', family: 'Linear', mounting: 'Linear', cct: 3500, lumens: 4200, watts: 36, cri: 90, beam: 110, ip: 20, price: 186, stock: 140, lead: 'In stock', blurb: 'Continuous-run linear with a 1200mm module and concealed joint. Opal diffuser rated UGR<19 for screen-based work.', finishes: ['Matt white', 'Anodised black'] },
  { sku: 'KL-1500-40', name: 'Datum Linear 1500', family: 'Linear', mounting: 'Linear', cct: 4000, lumens: 5400, watts: 45, cri: 90, beam: 110, ip: 20, price: 214, stock: 95, lead: 'In stock', blurb: 'The 1500mm module. Suspended on wire or surface-fixed; the end caps take a blank or a through-wire as supplied.', finishes: ['Matt white', 'Anodised black'] },
  { sku: 'KL-0600-30', name: 'Datum Linear 600', family: 'Linear', mounting: 'Surface', cct: 3000, lumens: 1900, watts: 18, cri: 90, beam: 110, ip: 20, price: 124, stock: 210, lead: 'In stock', blurb: 'Short module for over-joinery and corridor runs. Same diffuser and joint detail as the longer Datum lengths.', finishes: ['Matt white', 'Anodised black'] },
  { sku: 'KP-300-27', name: 'Weight Pendant 300', family: 'Decorative', mounting: 'Pendant', cct: 2700, lumens: 760, watts: 9, cri: 95, beam: 120, ip: 20, price: 240, stock: 38, lead: 'In stock', blurb: 'Spun-aluminium shade on a braided cable, drop adjustable to 3m. Warm and diffuse — specified over counters and long tables.', finishes: ['Chalk', 'Ink', 'Oxblood', 'Brushed brass'] },
  { sku: 'KP-480-27', name: 'Weight Pendant 480', family: 'Decorative', mounting: 'Pendant', cct: 2700, lumens: 1280, watts: 15, cri: 95, beam: 120, ip: 20, price: 325, stock: 12, lead: 'In stock', blurb: 'The larger Weight. At 480mm it reads as a single object rather than a cluster, which suits a lone position over an island.', finishes: ['Chalk', 'Ink', 'Oxblood', 'Brushed brass'] },
  { sku: 'KP-120-22', name: 'Bead Pendant 120', family: 'Decorative', mounting: 'Pendant', cct: 2200, lumens: 180, watts: 3, cri: 92, beam: 300, ip: 20, price: 96, stock: 0, lead: '4 weeks', blurb: 'Very warm, very low output. This is a decorative point of light, not a working one — hung in groups at varying drops.', finishes: ['Clear', 'Smoke', 'Opal'] },
  { sku: 'KE-200-30', name: 'Bollard 200', family: 'Exterior', mounting: 'Surface', cct: 3000, lumens: 620, watts: 9, cri: 80, beam: 180, ip: 65, price: 188, stock: 64, lead: 'In stock', blurb: 'Asymmetric bollard throwing light to the path rather than the sky. IP65 and marine-grade for coastal sites.', finishes: ['Graphite', 'Corten'] },
  { sku: 'KE-080-27', name: 'Step Light 80', family: 'Exterior', mounting: 'Recessed', cct: 2700, lumens: 140, watts: 2, cri: 80, beam: 110, ip: 67, price: 74, stock: 310, lead: 'In stock', blurb: 'Recessed into risers and retaining walls. Shielded so the source is never visible from standing height.', finishes: ['Graphite', 'Stainless'] },
  { sku: 'KE-450-40', name: 'Flood 450', family: 'Exterior', mounting: 'Surface', cct: 4000, lumens: 3800, watts: 40, cri: 80, beam: 70, ip: 66, price: 268, stock: 18, lead: '2 weeks', blurb: 'Facade and landscape flood with an integral glare shield. Neutral white holds planting colour better than warmer sources.', finishes: ['Graphite', 'Corten'] },
  { sku: 'KD-110-40', name: 'Mast Downlight 110', family: 'Downlights', mounting: 'Recessed', cct: 4000, lumens: 1100, watts: 11, cri: 90, beam: 36, ip: 44, price: 68, stock: 126, lead: 'In stock', blurb: 'Neutral-white Mast 110. Common in clinical and education work where a cooler appearance is specified by the brief.', finishes: ['Matt white', 'Anodised black'] },
  { sku: 'KT-150-27', name: 'Rail Spot 150', family: 'Track', mounting: 'Track', cct: 2700, lumens: 880, watts: 10, cri: 97, beam: 15, ip: 20, price: 94, stock: 72, lead: 'In stock', blurb: 'Tight 15° beam for picture lighting and merchandising. The 97 CRI array is the reason this one gets specified for artwork.', finishes: ['Matt white', 'Matt black', 'Silver'] },
  { sku: 'KL-2400-35', name: 'Datum Linear 2400', family: 'Linear', mounting: 'Linear', cct: 3500, lumens: 8600, watts: 72, cri: 90, beam: 110, ip: 20, price: 352, stock: 24, lead: '2 weeks', blurb: 'Longest single module before a joint is required. Shipped in a braced carton — check access before specifying on upper floors.', finishes: ['Matt white', 'Anodised black'] },
  { sku: 'KP-300-30', name: 'Weight Pendant 300', family: 'Decorative', mounting: 'Pendant', cct: 3000, lumens: 820, watts: 9, cri: 95, beam: 120, ip: 20, price: 240, stock: 26, lead: 'In stock', blurb: 'The Weight 300 at 3000K. Reads cleaner against pale joinery, where the 2700K version can look yellow.', finishes: ['Chalk', 'Ink', 'Oxblood', 'Brushed brass'] },
  { sku: 'KD-065-30', name: 'Pin Downlight 65', family: 'Downlights', mounting: 'Recessed', cct: 3000, lumens: 450, watts: 5, cri: 95, beam: 24, ip: 20, price: 41, stock: 420, lead: 'In stock', blurb: 'The volume aperture. Shallow enough for a 60mm void, which is why it ends up in most residential and hotel bedroom schemes.', finishes: ['Matt white', 'Matt black'] },
  { sku: 'KE-200-27', name: 'Bollard 200', family: 'Exterior', mounting: 'Surface', cct: 2700, lumens: 580, watts: 9, cri: 80, beam: 180, ip: 65, price: 188, stock: 41, lead: 'In stock', blurb: 'Warm-white bollard for domestic and hospitality landscapes, where 3000K can feel institutional after dark.', finishes: ['Graphite', 'Corten'] },
  { sku: 'KL-1200-27', name: 'Datum Linear 1200', family: 'Linear', mounting: 'Linear', cct: 2700, lumens: 3900, watts: 36, cri: 95, beam: 110, ip: 20, price: 198, stock: 58, lead: 'In stock', blurb: 'Warm linear with the high-CRI array. Specified in galleries and showrooms where linear light has to be flattering, not just even.', finishes: ['Matt white', 'Anodised black'] },
  { sku: 'KT-220-27', name: 'Rail Spot 220', family: 'Track', mounting: 'Track', cct: 2700, lumens: 1380, watts: 16, cri: 97, beam: 24, ip: 20, price: 112, stock: 0, lead: '3 weeks', blurb: 'Warm, high-CRI, adjustable. The default retail spot — which is also why it is the first thing to go out of stock.', finishes: ['Matt white', 'Matt black', 'Silver'] },
]

export const FAMILIES: Family[] = ['Downlights', 'Track', 'Linear', 'Decorative', 'Exterior']
export const CCTS = [2200, 2700, 3000, 3500, 4000]

/** Approximate the appearance of a black body at the given temperature. */
export function kelvinToHex(k: number): string {
  const stops: [number, string][] = [
    [2200, '#FF9F4A'], [2700, '#FFBE7A'], [3000, '#FFD2A1'],
    [3500, '#FFE6C9'], [4000, '#FFF3E4'], [5000, '#F2F6FF'],
  ]
  for (let i = 0; i < stops.length - 1; i++) {
    const [k1, c1] = stops[i], [k2, c2] = stops[i + 1]
    if (k >= k1 && k <= k2) {
      const t = (k - k1) / (k2 - k1)
      const mix = (a: string, b: string) => {
        const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
        const [r1, g1, b1] = p(a), [r2, g2, b2] = p(b)
        const ch = (x: number, y: number) => Math.round(x + (y - x) * t).toString(16).padStart(2, '0')
        return `#${ch(r1, r2)}${ch(g1, g2)}${ch(b1, b2)}`
      }
      return mix(c1, c2)
    }
  }
  return '#FFD2A1'
}
