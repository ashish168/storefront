import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { money, product, useStore } from '../lib/store'

export function Orders() {
  const { orders, user } = useStore()
  const [params] = useSearchParams()
  const justPlaced = params.get('placed')

  if (!user) return <Navigate to="/signin?next=/orders" replace />

  return (
    <div className="mx-auto max-w-3xl">
      {justPlaced && (
        <div role="status" className="mb-7 border border-moss bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-ink">Order {justPlaced} placed</h2>
          <p className="mt-1.5 text-sm">
            A confirmation would normally reach {user.email} within a few minutes. Stock lines
            dispatch next working day.
          </p>
        </div>
      )}

      <h1 className="font-display text-2xl font-semibold text-ink">Orders</h1>

      {orders.length === 0 ? (
        <div className="mt-6 border border-line bg-white px-6 py-14 text-center">
          <p className="font-display text-lg text-ink">No orders yet</p>
          <p className="mt-1.5 text-sm">Orders you place will be listed here with their references.</p>
          <Link to="/" className="mt-5 inline-block text-sm text-body underline underline-offset-4 hover:text-ink">
            Browse the catalogue
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {orders.map((o) => (
            <article key={o.id} className="border border-line bg-white">
              <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-5 py-4">
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink">{o.id}</h2>
                  <p className="mt-0.5 text-xs text-mute">
                    {new Date(o.placed).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {o.reference !== 'No reference' && ` · ${o.reference}`}
                  </p>
                </div>
                <span className="font-display text-lg font-semibold text-ink">{money(o.total * 1.2)}</span>
              </header>
              <ul className="divide-y divide-line">
                {o.lines.map((l) => (
                  <li key={`${l.sku}-${l.finish}`} className="flex justify-between gap-3 px-5 py-3 text-sm">
                    <span>
                      <Link to={`/product/${l.sku}`} className="text-ink hover:underline">{product(l.sku).name}</Link>
                      <span className="ml-2 text-xs text-mute">{l.qty} × {l.finish}</span>
                    </span>
                    <span className="shrink-0 text-ink">{money(product(l.sku).price * l.qty)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
