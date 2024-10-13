import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"

import { ProductList } from "../cmps/product-list"
import { loadProducts, removeProduct } from "../store/product.action"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { FILTER_BY, SORT_BY } from "../store/product.reducer"
import { ProductFilter } from "../cmps/product-filter"

// import { productService } from "../services/product.service"
// import { ProductFilter } from "../cmps/product-filter"
// import { FILTER_BY, SORT_BY } from "../store/product.reducer"


export function ProductIndex() {
  const dispatch = useDispatch()
  const products = useSelector((storeState) => storeState.productModule.products)
  const filterBy = useSelector((storeState) => storeState.productModule.filterBy)
  const sortBy = useSelector((storeState) => storeState.productModule.sortBy)

  useEffect(() => {
    loadProducts(filterBy, sortBy)
  }, [filterBy, sortBy])

  //   function onAddProduct() {
  //     const productToSave = productService.getEmptyProduct()
  //     saveProduct(productToSave)
  //       .then(savedProduct => {
  //         showSuccessMsg(`Product added (id: ${savedProduct.Name})`)
  //       })
  //       .catch(err => {
  //         showErrorMsg('Cannot add product')
  //       })
  //   }

  function onRemoveProduct(productId) {
    removeProduct(productId)
      .then(() => {
        showSuccessMsg('Product removed')
      })
      .catch(err => {
        showErrorMsg('Cannot remove product')
      })
  }

    function onSetFilter(filterToEdit) {
      dispatch({ type: FILTER_BY, filterToEdit })
    }

    function onSetSort(sortToEdit) {
      dispatch({ type: SORT_BY, sortToEdit })
    }

  return (
    <section className='product-index'>
      <ProductFilter
        onSetFilter={onSetFilter}
        onSetSort={onSetSort}
        // onAddProduct={onAddProduct}
      />
      <section>
        <h1 className='product-title'>ALL PRODUCTS</h1>
        {/* <button className="btn"><Link to="/product/edit">Add Product</Link></button> */}
      </section>
      <ProductList
        products={products}
        onRemoveProduct={onRemoveProduct}
      />
      <Outlet />
    </section>
  )
}
