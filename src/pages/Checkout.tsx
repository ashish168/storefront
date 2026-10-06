import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Field } from '../components/bits'
import { money, product, useStore } from '../lib/store'

export function Checkout() {
  const { cart, user, placeOrder } = useStore()
  const navigate = useNavigate()
  const [reference, setReference] = useState('')
  const [site, setSite] = useState('')
  const [working, setWorking] = useState(false)
  // Placing an order empties the cart, which re-renders this page. Without
  // this flag the empty-cart guard below fires before the navigation does,
  // and the customer is bounced back to an empty cart having just paid.
  const [placed, setPlaced] = useState(false)

  if (!user) return <Navigate to="/signin?next=/checkout" replace />
  if (cart.length === 0 && !placed) return <Navigate to="/cart" replace />

  const subtotal = cart.reduce((s, l) => s + product(l.sku).price * l.qty, 0)
  const total = subtotal * 1.2

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setWorking(true)
    setPlaced(true)
    // A real checkout would hand off to a payment provider here.
    setTimeout(() => {
      const order = placeOrder(reference || 'No reference')
      navigate(`/orders?placed=${order.id}`, { replace: true })
    }, 700)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-semibold text-ink">Checkout</h1>

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_16rem]">
        <form onSubmit={submit} className="space-y-5">
          <div className="border border-line bg-white p-5">
            <h2 className="font-display text-lg font-semibold text-ink">Account</h2>
            <p className="mt-1.5 text-sm">{user.name} · {user.email}</p>
            <p className="text-sm text-mute">Trade account {user.account}</p>
          </div>

          <div className="border border-line bg-white p-5">
            <h2 className="font-display text-lg font-semibold text-ink">Delivery</h2>
            <div className="mt-4 space-y-4">
              <Field
                label="Site address" value={site} onChange={(e) => setSite(e.target.value)}
                placeholder="Unit 4, Prospect Works, Leeds LS11" required
              />
              <Field
                label="Your reference" hint="appears on the delivery note"
                value={reference} onChange={(e) => setReference(e.target.value)}
                placeholder="Job 4471 — level 3 fit-out"
              />
            </div>
          </div>

          <div className="border border-line bg-white p-5">
            <h2 className="font-display text-lg font-semibold text-ink">Payment</h2>
            <p className="mt-1.5 text-sm">
              Charged to your trade account on 30-day terms. Nothing is taken now — and nothing
              is taken ever, because this is a demonstration.
            </p>
          </div>

          <Button type="submit" disabled={working} className="w-full">
            {working ? 'Placing order…' : `Place order · ${money(total)}`}
          </Button>
        </form>

        <aside className="h-fit border border-line bg-white p-5">
          <h2 className="font-display text-base font-semibold text-ink">{cart.length} line{cart.length > 1 ? 's' : ''}</h2>
          <ul className="mt-3 space-y-2.5 text-sm">
            {cart.map((l) => (
              <li key={`${l.sku}-${l.finish}`} className="flex justify-between gap-3">
                <span className="min-w-0">
                  <span className="block truncate text-ink">{product(l.sku).name}</span>
                  <span className="text-xs text-mute">{l.qty} × {l.finish}</span>
                </span>
                <span className="shrink-0 text-ink">{money(product(l.sku).price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-line pt-3">
            <span className="font-medium text-ink">Total inc. VAT</span>
            <span className="font-display font-semibold text-ink">{money(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
