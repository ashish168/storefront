import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useStore } from '../lib/store'

export function Shell() {
  const { cart, user, signOut } = useStore()
  const count = cart.reduce((s, l) => s + l.qty, 0)
  const { pathname } = useLocation()

  const nav = ({ isActive }: { isActive: boolean }) =>
    `py-1 text-sm transition-colors ${isActive ? 'text-ink' : 'text-body hover:text-ink'}`

  return (
    <div className="min-h-dvh">
      <p className="bg-bottle px-4 py-1.5 text-center text-xs text-page/80">
        Demonstration build — a fictional supplier. No orders are processed and no payment is taken.
      </p>

      <header className="sticky top-0 z-20 border-b border-line bg-page/95 backdrop-blur">
        <div className="mx-auto flex max-w-shell items-center gap-6 px-4 py-3.5 sm:px-6">
          <Link to="/" className="font-display text-xl font-semibold leading-none text-ink">
            Kelvin Supply
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            <NavLink to="/" className={nav} end>Catalogue</NavLink>
            <NavLink to="/orders" className={nav}>Orders</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden text-sm text-body sm:inline">{user.account}</span>
                <button onClick={signOut} className="text-sm text-body underline-offset-4 hover:text-ink hover:underline">
                  Sign out
                </button>
              </div>
            ) : (
              <Link to="/signin" className="text-sm text-body hover:text-ink">Sign in</Link>
            )}
            <Link
              to="/cart"
              className="border border-line px-3 py-1.5 text-sm text-ink transition-colors hover:border-ink"
            >
              Cart{count > 0 && <span className="ml-1.5 text-mute">{count}</span>}
            </Link>
          </div>
        </div>
      </header>

      <main key={pathname} className="mx-auto max-w-shell px-4 py-8 sm:px-6">
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-line">
        <div className="mx-auto max-w-shell px-4 py-8 text-sm text-mute sm:px-6">
          <p>
            Built as a portfolio demonstration by{' '}
            <a href="https://ashishaggarwal168.com" className="text-body underline underline-offset-4 hover:text-ink">
              Ashish Aggarwal
            </a>
            . Products, specifications and prices are invented.
          </p>
        </div>
      </footer>
    </div>
  )
}
