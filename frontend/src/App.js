import './assets/styles/main.scss'
import { Provider } from 'react-redux'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { About } from './pages/about'
import { Home } from './pages/home'
import { store } from './store/store'
import { UserMsg } from './cmps/user-msg'
import { AppHeader } from './cmps/app-header'
import { ProductEdit } from './pages/product-edit'
import { ProductIndex } from './pages/product-index'
import { ProductDetails } from './pages/product-details'

export default function App() {

  return (
    <>
      <UserMsg />

      <Provider store={store}>
        <Router>
          <section className="main-layout app">

            <AppHeader />

            <Routes>

              <Route element={<Home />} path="/" />
              <Route element={<ProductIndex />} path="/product">
                <Route element={<ProductEdit />} path="edit" />
                <Route element={<ProductEdit />} path="edit/:productId" />
                <Route element={<ProductDetails />} path="details/:productId" />
              </Route>
              <Route element={<About />} path="/about" />

            </Routes>
          </section>
        </Router>
      </Provider >
    </>
  )
}