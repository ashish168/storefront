import { useMemo, useState } from 'react'
import { CCTS, FAMILIES, PRODUCTS, kelvinToHex, type Family } from '../data/products'
import { ProductCard } from '../components/bits'

type Sort = 'name' | 'price-asc' | 'price-desc' | 'output'

export function Catalogue() {
  const [q, setQ] = useState('')
  // On a phone the filter rail would push every product below the fold, so it
  // collapses behind a toggle there and is always open from lg up.
  const [showFilters, setShowFilters] = useState(false)
  const [families, setFamilies] = useState<Family[]>([])
  const [ccts, setCcts] = useState<number[]>([])
  const [inStock, setInStock] = useState(false)
  const [sort, setSort] = useState<Sort>('name')

  const toggle = <T,>(list: T[], v: T, set: (x: T[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const out = PRODUCTS.filter((p) => {
      if (needle && !`${p.name} ${p.sku} ${p.family} ${p.mounting}`.toLowerCase().includes(needle)) return false
      if (families.length && !families.includes(p.family)) return false
      if (ccts.length && !ccts.includes(p.cct)) return false
      if (inStock && p.stock === 0) return false
      return true
    })
    const by: Record<Sort, (a: typeof out[0], b: typeof out[0]) => number> = {
      name: (a, b) => a.name.localeCompare(b.name) || a.cct - b.cct,
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      output: (a, b) => b.lumens - a.lumens,
    }
    return [...out].sort(by[sort])
  }, [q, families, ccts, inStock, sort])

  const active = families.length + ccts.length + (inStock ? 1 : 0)

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[14rem_1fr] lg:gap-10">
      <div className="order-1 lg:hidden">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search catalogue"
          aria-label="Search catalogue"
          className="w-full border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-mute focus:border-moss focus:outline-none"
        />
        <button
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
          className="mt-3 w-full border border-line bg-white px-3 py-2.5 text-left text-sm text-ink"
        >
          Filters{active > 0 && <span className="ml-1.5 text-mute">{active} applied</span>}
          <span aria-hidden className="float-right text-mute">{showFilters ? '–' : '+'}</span>
        </button>
      </div>

      <aside className={`order-2 mb-8 lg:order-none lg:mb-0 lg:block ${showFilters ? 'block' : 'hidden'}`}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search catalogue"
          aria-label="Search catalogue"
          className="hidden w-full border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-mute focus:border-moss focus:outline-none lg:block"
        />

        <div className="mt-7 lg:mt-7">
          <h2 className="font-display text-base font-semibold text-ink">Family</h2>
          <div className="mt-2.5 space-y-1.5">
            {FAMILIES.map((f) => (
              <label key={f} className="flex cursor-pointer items-center gap-2.5 text-sm text-body hover:text-ink">
                <input
                  type="checkbox"
                  checked={families.includes(f)}
                  onChange={() => toggle(families, f, setFamilies)}
                  className="h-3.5 w-3.5 accent-bottle"
                />
                {f}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <h2 className="font-display text-base font-semibold text-ink">Colour temperature</h2>
          <div className="mt-2.5 space-y-1.5">
            {CCTS.map((k) => (
              <label key={k} className="flex cursor-pointer items-center gap-2.5 text-sm text-body hover:text-ink">
                <input
                  type="checkbox"
                  checked={ccts.includes(k)}
                  onChange={() => toggle(ccts, k, setCcts)}
                  className="h-3.5 w-3.5 accent-bottle"
                />
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10"
                  style={{ background: kelvinToHex(k) }}
                />
                {k}K
              </label>
            ))}
          </div>
        </div>

        <div className="mt-7 border-t border-line pt-5">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-body hover:text-ink">
            <input
              type="checkbox"
              checked={inStock}
              onChange={() => setInStock(!inStock)}
              className="h-3.5 w-3.5 accent-bottle"
            />
            Available now
          </label>
          {active > 0 && (
            <button
              onClick={() => { setFamilies([]); setCcts([]); setInStock(false) }}
              className="mt-4 text-sm text-body underline underline-offset-4 hover:text-ink"
            >
              Clear {active} filter{active > 1 ? 's' : ''}
            </button>
          )}
        </div>
      </aside>

      <div className="order-3 lg:order-none">
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4 lg:mt-0">
          <h1 className="font-display text-2xl font-semibold text-ink">
            Architectural lighting
            <span className="ml-3 text-base font-normal text-mute">{results.length} products</span>
          </h1>
          <label className="flex items-center gap-2 text-sm text-body">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border border-line bg-white px-2 py-1.5 text-sm text-ink focus:border-moss focus:outline-none"
            >
              <option value="name">Name</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
              <option value="output">Output</option>
            </select>
          </label>
        </div>

        {results.length === 0 ? (
          <div className="border border-line bg-white px-6 py-16 text-center">
            <p className="font-display text-lg text-ink">Nothing matches those filters</p>
            <p className="mt-1.5 text-sm text-body">Try widening the colour temperature, or clear the filters to start again.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((p) => <ProductCard key={p.sku} p={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
