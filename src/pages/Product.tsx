import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { Luminaire } from '../components/Luminaire'
import { Button, Kelvin, Stock } from '../components/bits'
import { money, useStore } from '../lib/store'

export function ProductPage() {
  const { sku = '' } = useParams()
  const p = PRODUCTS.find((x) => x.sku === sku)
  const { add } = useStore()
  const navigate = useNavigate()
  const [finish, setFinish] = useState(p?.finishes[0] ?? '')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!p) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-xl text-ink">No product with that code</p>
        <Link to="/" className="mt-3 inline-block text-sm text-body underline underline-offset-4 hover:text-ink">
          Back to the catalogue
        </Link>
      </div>
    )
  }

  const siblings = PRODUCTS.filter((x) => x.name === p.name && x.sku !== p.sku)

  const specs: [string, string][] = [
    ['Colour temperature', `${p.cct}K`],
    ['Output', `${p.lumens.toLocaleString()} lm`],
    ['Power', `${p.watts} W`],
    ['Efficacy', `${Math.round(p.lumens / p.watts)} lm/W`],
    ['Colour rendering', `CRI ${p.cri}`],
    ['Beam angle', `${p.beam}°`],
    ['Ingress protection', `IP${p.ip}`],
    ['Mounting', p.mounting],
  ]

  return (
    <div>
      <Link to="/" className="text-sm text-body underline-offset-4 hover:text-ink hover:underline">
        Catalogue
      </Link>

      <div className="mt-5 grid gap-10 lg:grid-cols-2">
        <div className="h-fit border border-line lg:sticky lg:top-24">
          <Luminaire p={p} className="block w-full" />
          <p className="border-t border-line px-4 py-2.5 text-xs text-mute">
            Sectional drawing. Beam shown at {p.beam}° and rendered at {p.cct}K.
          </p>
        </div>

        <div>
          <h1 className="font-display text-3xl font-semibold leading-tight text-ink">{p.name}</h1>
          <p className="mt-1 text-sm text-mute">{p.sku} · {p.family}</p>

          <p className="mt-5 max-w-prose text-[0.9375rem] leading-relaxed">{p.blurb}</p>

          <div className="mt-6 flex items-center gap-5 border-y border-line py-4">
            <span className="font-display text-2xl font-semibold text-ink">{money(p.price)}</span>
            <span className="text-sm text-mute">per unit, trade</span>
            <span className="ml-auto"><Stock stock={p.stock} lead={p.lead} /></span>
          </div>

          {siblings.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-medium text-ink">Also available in</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {siblings.map((s) => (
                  <Link
                    key={s.sku}
                    to={`/product/${s.sku}`}
                    className="border border-line px-3 py-1.5 text-sm text-body transition-colors hover:border-ink hover:text-ink"
                  >
                    <Kelvin k={s.cct} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h2 className="text-sm font-medium text-ink">Finish</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.finishes.map((f) => (
                <button
                  key={f}
                  onClick={() => setFinish(f)}
                  className={`border px-3 py-1.5 text-sm transition-colors ${
                    finish === f ? 'border-ink text-ink' : 'border-line text-body hover:border-ink'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-body">
              Quantity
              <input
                type="number"
                min={1}
                max={999}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="w-20 border border-line bg-white px-3 py-2.5 text-[0.9375rem] text-ink focus:border-moss focus:outline-none"
              />
            </label>
            <Button
              onClick={() => { add(p.sku, finish, qty); setAdded(true); setTimeout(() => setAdded(false), 2200) }}
            >
              Add to order
            </Button>
            <Button variant="quiet" onClick={() => { add(p.sku, finish, qty); navigate('/cart') }}>
              Add and view order
            </Button>
          </div>
          {added && (
            <p role="status" className="mt-3 text-sm text-moss">
              Added {qty} × {p.name}, {finish.toLowerCase()}.
            </p>
          )}

          <dl className="mt-10 border-t border-line">
            {specs.map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-line py-2.5 text-sm">
                <dt className="text-body">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
