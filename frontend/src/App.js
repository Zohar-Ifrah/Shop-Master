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
import { UserMsg } from './cmps/user-msg'

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
              {/* <Route element={<UserProfile />} path="/user" /> */}
            </Routes>
            {/* <AppFooter /> */}
          </section>
        </Router>
      </Provider >
    </>
  )
}