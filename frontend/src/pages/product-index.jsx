import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { ProductList } from "../cmps/product-list"
import { ProductFilter } from "../cmps/product-filter"
import { FILTER_BY, SORT_BY } from "../store/product.reducer"
import { loadProducts, removeProduct } from "../store/product.action"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ProductIndex() {
  const dispatch = useDispatch()
  const products = useSelector((storeState) => storeState.productModule.products)
  const filterBy = useSelector((storeState) => storeState.productModule.filterBy)
  const sortBy = useSelector((storeState) => storeState.productModule.sortBy)
  const page = useSelector((storeState) => storeState.productModule.page)
  const limit = useSelector((storeState) => storeState.productModule.limit)
  const totalPages = useSelector((storeState) => storeState.productModule.totalPages)

  useEffect(() => {
    loadProducts(filterBy, sortBy, page, limit)
  }, [filterBy, sortBy, page, limit])

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

  function addTitle() {
    if (filterBy.categories.length > 0) {
      if (filterBy.categories.length > 1) {
        return 'SELECTED PRODUCTS'
      }
      return filterBy.categories[0].toUpperCase()
    }
    return 'ALL PRODUCTS'
  }

  function onNextPage() {
    if (page < totalPages) dispatch({ type: 'SET_PAGE', page: page + 1 })
  }

  function onPrevPage() {
    if (page > 1) dispatch({ type: 'SET_PAGE', page: page - 1 })
  }

  return (
    <section className='product-index'>
      <ProductFilter
        onSetFilter={onSetFilter}
        onSetSort={onSetSort}
      />

      <section>
        <h1 className='product-title'>{addTitle()}</h1>
      </section>

      {/* upper pagination  */}
      <div className="pagination">
        <button onClick={onPrevPage} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={onNextPage} disabled={page === totalPages}>Next</button>
      </div>

      <ProductList
        products={products}
        onRemoveProduct={onRemoveProduct}
      />

      {/* lower pagination  */}
      <div className="pagination">
        <button onClick={onPrevPage} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={onNextPage} disabled={page === totalPages}>Next</button>
      </div>

      <Outlet />
    </section>
  )
}
