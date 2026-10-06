import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StoreProvider } from './lib/store'
import { Shell } from './components/Shell'
import { Catalogue } from './pages/Catalogue'
import { ProductPage } from './pages/Product'
import { Cart } from './pages/Cart'
import { SignIn } from './pages/SignIn'
import { Checkout } from './pages/Checkout'
import { Orders } from './pages/Orders'

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route path="/" element={<Catalogue />} />
            <Route path="/product/:sku" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<Catalogue />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}
