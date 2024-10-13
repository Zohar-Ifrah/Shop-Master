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

function query(filterBy = {}, sortBy = {}) {
    const params = { filterBy, sortBy }
    return httpService.get(BASE_URL, params)
}


function getById(productId) {
    return httpService.get(BASE_URL + productId)
}

function remove(productId) {
    return httpService.delete(BASE_URL + productId)
    // return asyncStorageService.remove(STORAGE_KEY, productId)
}

//for add and edit (id depends)
function save(product) {
    if (product._id) {
        return httpService.put(BASE_URL +  product._id, product)
        // return asyncStorageService.put(STORAGE_KEY, product)
    } else {
        return httpService.post(BASE_URL, product)
        // return asyncStorageService.post(STORAGE_KEY, product)
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

function getCategories() {
    return httpService.get(BASE_URL)
        .then(products => {
            const uniqueCategories = new Set()
            products.forEach(product => {
                if (product.category) {
                    uniqueCategories.add(product.category)
                }
            })
            return Array.from(uniqueCategories).sort((a, b) => a.localeCompare(b))
        })
        .catch(err => {
            console.error('Error fetching categories:', err)
            throw err
        })
}



function getDefaultFilter() {
    return { name: '', categories: []}
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}

