import { store } from './store.js'
import { productService } from '../services/product.service.js'
import { ADD_PRODUCT, REMOVE_PRODUCT, SET_PRODUCTS, SET_TOTAL_PAGES, UPDATE_PRODUCT } from './product.reducer.js'

export async function loadProducts(filterBy, sortBy, page, limit) {
    return productService.query(filterBy, sortBy, page, limit)
        .then((response) => {
            store.dispatch({ type: SET_PRODUCTS, products: response.products })
            store.dispatch({ type: SET_TOTAL_PAGES, totalPages: response.totalPages })
        })
        .catch(err => {
            console.error('Cannot load products', err)
        })
}

export async function removeProduct(productId) {

    return productService.remove(productId)
        .then(() => {
            store.dispatch({ type: REMOVE_PRODUCT, productId })
        })
        .catch(err => {
            console.log('product action -> Cannot remove product', err)
            throw err
        })
}

export async function saveProduct(product) {
    const type = product._id ? UPDATE_PRODUCT : ADD_PRODUCT
    return productService.save(product)
        .then(savedProduct => {
            store.dispatch({ type, product: savedProduct })
            return savedProduct
        })
        .catch(err => {
            console.log('product action -> Cannot save product', err)
            throw err
        })
}
