import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { PRODUCTS, type Product } from '../data/products'

export interface Line { sku: string; finish: string; qty: number }
export interface Order { id: string; placed: string; lines: Line[]; total: number; reference: string }
export interface User { name: string; email: string; account: string }

interface Store {
  cart: Line[]
  add: (sku: string, finish: string, qty: number) => void
  setQty: (sku: string, finish: string, qty: number) => void
  remove: (sku: string, finish: string) => void
  clear: () => void
  user: User | null
  signIn: (email: string) => void
  signOut: () => void
  orders: Order[]
  placeOrder: (reference: string) => Order
}

const Ctx = createContext<Store | null>(null)
const bySku = new Map(PRODUCTS.map((p) => [p.sku, p]))
export const product = (sku: string): Product => bySku.get(sku)!

/** Browser storage is per-viewer and can throw; never let it break a render. */
function persisted<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function persist(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* private window, blocked storage — the app still works, it just forgets */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Line[]>(() => persisted('ks.cart', []))
  const [user, setUser] = useState<User | null>(() => persisted('ks.user', null))
  const [orders, setOrders] = useState<Order[]>(() => persisted('ks.orders', []))

  useEffect(() => persist('ks.cart', cart), [cart])
  useEffect(() => persist('ks.user', user), [user])
  useEffect(() => persist('ks.orders', orders), [orders])

  const value = useMemo<Store>(() => ({
    cart,
    add: (sku, finish, qty) =>
      setCart((c) => {
        const at = c.findIndex((l) => l.sku === sku && l.finish === finish)
        if (at === -1) return [...c, { sku, finish, qty }]
        return c.map((l, i) => (i === at ? { ...l, qty: l.qty + qty } : l))
      }),
    setQty: (sku, finish, qty) =>
      setCart((c) => c.map((l) => (l.sku === sku && l.finish === finish ? { ...l, qty } : l))),
    remove: (sku, finish) => setCart((c) => c.filter((l) => !(l.sku === sku && l.finish === finish))),
    clear: () => setCart([]),
    user,
    signIn: (email) =>
      setUser({
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()),
        email,
        account: 'TR-' + (email.length * 7919).toString().slice(0, 5),
      }),
    signOut: () => setUser(null),
    orders,
    placeOrder: (reference) => {
      const total = cart.reduce((s, l) => s + product(l.sku).price * l.qty, 0)
      const order: Order = {
        id: 'KS' + String(10428 + orders.length),
        placed: new Date().toISOString(),
        lines: cart,
        total,
        reference,
      }
      setOrders((o) => [order, ...o])
      setCart([])
      return order
    },
  }), [cart, user, orders])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore must be used inside StoreProvider')
  return s
}

export const money = (n: number) =>
  n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 })
