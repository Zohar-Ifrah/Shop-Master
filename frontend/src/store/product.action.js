import { productService } from '../services/product.service.js'
import { store } from './store.js'
import { ADD_PRODUCT, REMOVE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from './product.reducer.js'



export function loadProducts(filterBy, sortBy) {
    return productService.query(filterBy, sortBy)
        .then((products) => {
            store.dispatch({ type: SET_PRODUCTS, products })
        })
}

export function removeProduct(productId) {

    return productService.remove(productId)
        .then(() => {
            store.dispatch({ type: REMOVE_PRODUCT, productId })
        })
        .catch(err => {
            console.log('product action -> Cannot remove product', err)
            throw err
        })
}

export function saveProduct(product) {
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
