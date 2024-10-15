import { httpService } from './http.service.js'

const BASE_URL = 'product/'

export const productService = {
    query,
    getById,
    save,
    remove,
    getEmptyProduct,
    getCategories,
    getDefaultFilter,
    getDefaultSort
}

function query(filterBy = {}, sortBy = {}, page = 1, limit = 20) {
    const params = {
        filterBy,
        sortBy,
        page,
        limit,
    }

    return httpService.get(BASE_URL, params)
}

function getById(productId) {
    return httpService.get(BASE_URL + productId)
}

function remove(productId) {
    return httpService.delete(BASE_URL + productId)
}

// for add and edit (ID-depends)
function save(product) {
    if (product._id) {
        return httpService.put(BASE_URL + product._id, product)
    } else {
        return httpService.post(BASE_URL, product)
    }
}

function getEmptyProduct() {
    const timestamp = Date.now() - (7 * 24 * 60 * 60 * 1000) // default for a week ago
    return {
        name: '',
        sku: '',
        description: '',
        category: '',
        marketingDate: timestamp,
        price: '',
        imgUrl: ''
    }
}
async function getCategories() {
    try {
        const res = await httpService.get(BASE_URL)
        return res.categories
    } catch (error) {
        console.error('Error fetching categories:', error)
        return []
    }
}


function getDefaultFilter() {
    return { name: '', categories: [] }
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}