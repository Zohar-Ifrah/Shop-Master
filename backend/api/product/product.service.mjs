import { getCollection, toObjectId } from '../../services/db.service.mjs'

const COLLECTION_NAME = 'product'

console.log("product.service")

export {
    query,
    add,
    get,
    update,
    remove,
    removeAll,
}

async function query(params) {
    try {
        // filter
        const criteria = _buildCriteria(params.filterBy)

        const collection = await getCollection(COLLECTION_NAME)


        const totalCount = await collection.countDocuments(criteria)

        // Pagination
        const page = +params.page || 1
        const limit = +params.limit || 20
        const skip = (page - 1) * limit

        // query with pagination
        const products = await collection.find(criteria)
            .skip(skip)
            .limit(limit)
            .toArray()

        // sort
        const sortedProducts = getSortedProducts(products, params.sortBy)


        const totalPages = Math.ceil(totalCount / limit)

        // total caregories
        const categories = await collection.distinct('category', criteria)

        return { products: sortedProducts, totalPages, categories }
    } catch (err) {
        console.error('Error querying products:', err)
        throw new Error(`Failed to query products: ${err.message}`)
    }
}


async function add(product) {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const productModel = _createProductModel(product)

        const doc = await collection.insertOne(productModel)
        return { ...productModel, _id: doc.insertedId }
    } catch (err) {
        console.error('Error adding product:', err)
        throw new Error(`Failed to add product: ${err.message}`)
    }
}

async function get(productId) {
    try {
        const objectId = toObjectId(productId)
        const collection = await getCollection(COLLECTION_NAME)
        const product = await collection.findOne({ _id: objectId })

        if (!product) throw new Error('Product not found')
        return product
    } catch (err) {
        console.error('Error fetching product:', err)
        throw new Error(`Failed to fetch product: ${err.message}`)
    }
}

async function update(product) {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const updatedProduct = {
            ...product,
            _id: toObjectId(product._id)
        }
        const result = await collection.updateOne({ _id: updatedProduct._id }, { $set: updatedProduct })

        if (result.matchedCount === 0) throw new Error('Product not found')
        return updatedProduct
    } catch (err) {
        console.error('Error updating product:', err)
        throw new Error(`Failed to update product: ${err.message}`)
    }
}

async function remove(productId) {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const result = await collection.deleteOne({ _id: toObjectId(productId) })

        if (result.deletedCount === 0) throw new Error('Product not found or already deleted')
        return true
    } catch (err) {
        console.error('Error removing product:', err)
        throw new Error(`Failed to remove product: ${err.message}`)
    }
}

async function removeAll() {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const result = await collection.deleteMany({})

        if (result.deletedCount === 0) throw new Error('No products were found to delete')
        return true
    } catch (err) {
        console.error('Error removing products:', err)
        throw new Error(`Failed to remove products: ${err.message}`)
    }
}

function _createProductModel({ name, sku, description, category, marketingDate, price, imgUrl }) {
    return {
        name,
        sku,
        description,
        category,
        marketingDate,
        price,
        imgUrl,
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    // FILTER: by name
    if (filterBy.name) {
        const txtCriteria = { $regex: filterBy.name, $options: 'i' }
        criteria.name = txtCriteria
    }

    // FILTER: by categories 
    if (filterBy.categories && filterBy.categories.length > 0) {
        criteria.category = { $in: filterBy.categories } // $in for many categories values
    }

    console.log("Criteria built:", criteria)
    return criteria
}

function getSortedProducts(products, sortBy) {
    if (!sortBy.type) return products

    const order = (+sortBy.desc === 1) ? 1 : -1

    return products.sort((a, b) => {
        const key = sortBy.type

        // string compare (include localeCompare)
        if (typeof a[key] === 'string' && typeof b[key] === 'string') {
            return order * a[key].localeCompare(b[key])
        }

        // number compare
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
            return order * (a[key] - b[key])
        }

        // date compare (marketingDate)
        if (key === 'createdAt') {
            return order * (a['marketingDate'] - b['marketingDate'])
        }

        return 0
    })
}