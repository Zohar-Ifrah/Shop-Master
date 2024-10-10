import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/styles/main.scss'
import { Home } from './pages/home'
import { store } from './store/store'
import { AppHeader } from './cmps/app-header'
import { About } from './pages/about'
import { ProductIndex } from './pages/product-index'
import { ProductDetails } from './pages/product-details'
import { ProductEdit } from './pages/product-edit'


export default function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<ProductIndex />} path="/product" />
            <Route element={<About />} path="/about" />
            <Route element={<ProductEdit />} path="/product/edit" />
            <Route element={<ProductEdit />} path="/product/edit/:productId" />
            <Route element={<ProductDetails />} path="/product/details/:productId" />
            {/* <Route element={<UserProfile />} path="/user" /> */}
          </Routes>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider >
  )
}