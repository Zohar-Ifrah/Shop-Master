import { productService } from "../services/product.service"

export const SET_PRODUCTS = 'SET_PRODUCTS'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const FILTER_BY = 'FILTER_BY'
export const SORT_BY = 'SORT_BY'

const initialState = {
    products: [],
    filterBy: productService.getDefaultFilter(),
    sortBy: productService.getDefaultSort(), 
}

export function productReducer(state = initialState, action) {
    let products
    let filterBy
    let sortBy

    switch (action.type) {
        // Products
        case SET_PRODUCTS:
            return { ...state, products: action.products }
        case REMOVE_PRODUCT:
            products = state.products.filter(c => c._id !== action.productId)
            return { ...state, products }
        case ADD_PRODUCT:
            products = [...state.products, action.product]
            return { ...state, products }
        case UPDATE_PRODUCT:
            products = state.products.map(product => product._id === action.product._id ? action.product : product)
            return { ...state, products }
        case FILTER_BY:
            filterBy = { ...state.filterBy, ...action.filterToEdit }
            return { ...state, filterBy }
        case SORT_BY:
            sortBy = { ...state.sortBy, ...action.sortToEdit }
            return { ...state, sortBy }
        default:
            return { ...state }
    }
}
