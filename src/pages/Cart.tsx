import { Link, useNavigate } from 'react-router-dom'
import { Button, Kelvin } from '../components/bits'
import { Luminaire } from '../components/Luminaire'
import { money, product, useStore } from '../lib/store'

export function Cart() {
  const { cart, setQty, remove, user } = useStore()
  const navigate = useNavigate()
  const subtotal = cart.reduce((s, l) => s + product(l.sku).price * l.qty, 0)
  const vat = subtotal * 0.2

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">Your order is empty</h1>
        <p className="mt-2 text-[0.9375rem]">Add products from the catalogue and they will collect here.</p>
        <Link to="/" className="mt-6 inline-block bg-bottle px-5 py-2.5 text-[0.9375rem] font-medium text-page hover:bg-moss">
          Browse the catalogue
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Your order</h1>

      <div className="mt-6 lg:grid lg:grid-cols-[1fr_20rem] lg:gap-10">
        <div className="border-t border-line">
          {cart.map((l) => {
            const p = product(l.sku)
            return (
              <div key={`${l.sku}-${l.finish}`} className="flex gap-4 border-b border-line py-5">
                <div className="w-28 shrink-0 self-start border border-line">
                  <Luminaire p={p} className="block w-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link to={`/product/${p.sku}`} className="font-display text-base font-semibold text-ink hover:underline">
                      {p.name}
                    </Link>
                    <span className="font-display text-base font-semibold text-ink">
                      {money(p.price * l.qty)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-mute">{p.sku} · {l.finish}</p>
                  <div className="mt-1.5 text-xs"><Kelvin k={p.cct} /></div>
                  <div className="mt-3 flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-body">
                      Qty
                      <input
                        type="number" min={1} max={999} value={l.qty}
                        onChange={(e) => setQty(l.sku, l.finish, Math.max(1, Number(e.target.value) || 1))}
                        className="w-16 border border-line bg-white px-2 py-1.5 text-sm text-ink focus:border-moss focus:outline-none"
                      />
                    </label>
                    <button
                      onClick={() => remove(l.sku, l.finish)}
                      className="text-sm text-body underline-offset-4 hover:text-signal hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <aside className="mt-8 h-fit border border-line bg-white p-5 lg:mt-0">
          <h2 className="font-display text-lg font-semibold text-ink">Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd className="text-ink">{money(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>VAT at 20%</dt><dd className="text-ink">{money(vat)}</dd></div>
            <div className="flex justify-between"><dt>Delivery</dt><dd className="text-ink">Calculated at dispatch</dd></div>
          </dl>
          <div className="mt-4 flex justify-between border-t border-line pt-4">
            <span className="font-display text-lg font-semibold text-ink">Total</span>
            <span className="font-display text-lg font-semibold text-ink">{money(subtotal + vat)}</span>
          </div>
          <Button className="mt-5 w-full" onClick={() => navigate(user ? '/checkout' : '/signin?next=/checkout')}>
            {user ? 'Continue to checkout' : 'Sign in to check out'}
          </Button>
          {!user && <p className="mt-2 text-xs text-mute">Trade pricing requires an account.</p>}
        </aside>
      </div>
    </div>
  )
}
