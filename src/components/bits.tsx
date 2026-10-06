import { Link } from 'react-router-dom'
import { kelvinToHex, type Product } from '../data/products'
import { money } from '../lib/store'
import { Luminaire } from './Luminaire'

/** Colour temperature shown as the light it describes, not as a number alone. */
export function Kelvin({ k, size = 'sm' }: { k: number; size?: 'sm' | 'lg' }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className={`rounded-full ring-1 ring-black/10 ${size === 'lg' ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5'}`}
        style={{ background: kelvinToHex(k) }}
      />
      <span className={size === 'lg' ? 'text-sm' : 'text-xs'}>{k}K</span>
    </span>
  )
}

export function Stock({ stock, lead }: { stock: number; lead: string }) {
  if (stock > 0) return <span className="text-xs text-moss">{stock} in stock</span>
  return <span className="text-xs text-signal">Back order · {lead}</span>
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      to={`/product/${p.sku}`}
      className="group block border border-line bg-white transition-colors hover:border-ink"
    >
      <Luminaire p={p} className="block w-full border-b border-line" />
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[1.0625rem] font-semibold leading-tight text-ink">{p.name}</h3>
          <span className="shrink-0 font-display text-[1.0625rem] font-semibold text-ink">{money(p.price)}</span>
        </div>
        <p className="mt-0.5 text-xs text-mute">{p.sku}</p>
        <dl className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-body">
          <dd><Kelvin k={p.cct} /></dd>
          <dd>{p.lumens.toLocaleString()} lm</dd>
          <dd>{p.beam}°</dd>
          <dd>CRI {p.cri}</dd>
          <dd>IP{p.ip}</dd>
        </dl>
        <div className="mt-3 border-t border-line pt-2.5">
          <Stock stock={p.stock} lead={p.lead} />
        </div>
      </div>
    </Link>
  )
}

export function Field({
  label, hint, ...rest
}: { label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {hint && <span className="ml-2 text-xs text-mute">{hint}</span>}
      <input
        {...rest}
        className="mt-1.5 w-full border border-line bg-white px-3 py-2.5 text-[0.9375rem] text-ink placeholder:text-mute focus:border-moss focus:outline-none"
      />
    </label>
  )
}

export function Button({
  variant = 'solid', className = '', ...rest
}: { variant?: 'solid' | 'quiet' } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = 'px-5 py-2.5 text-[0.9375rem] font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
  const look =
    variant === 'solid'
      ? 'bg-bottle text-page hover:bg-moss'
      : 'border border-line text-ink hover:border-ink'
  return <button {...rest} className={`${base} ${look} ${className}`} />
}
