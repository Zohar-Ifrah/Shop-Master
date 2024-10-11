const { getCollection, toObjectId } = require('../../services/db.service')

const COLLECTION_NAME = 'product'

console.log("product.service")

module.exports = {
    query,
    add,
    get,
    update,
    remove,
    removeAll,
}

async function query(params) {
    try {
        const criteria = _buildCriteria(params.filterBy)

        const collection = await getCollection(COLLECTION_NAME)
        const products = await collection.find(criteria).toArray()

        return products
    } catch (err) {
        console.error('Error querying products:', err)
        throw new Error(`Failed to query products: ${err.message}`)
    }
}

async function add(product) {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const productModel = _createProductModel(product)
        console.log('productModel >>>', productModel);

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
        console.log('product', product);

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


function _createProductModel({ name, sku, description, category, marketingDate, price }) {
    return {
        name,
        sku,
        description,
        category,
        marketingDate,
        price,
    }
}

function _buildCriteria(filterBy) {

    const criteria = {}

    if (filterBy.name) {
        const txtCriteria = { $regex: filterBy.name, $options: 'i' }
        criteria.name = txtCriteria
    }

    // if (filterBy.term) {
    //     const txtCriteria = { $regex: filterBy.term, $options: 'i' }
    //     criteria.term = txtCriteria
    // }
    // if (filterBy.email) {
    //     const txtCriteria = { $regex: filterBy.email, $options: 'i' }
    //     criteria.email = txtCriteria
    // }

    // if (filterBy.phone) {
    //     const txtCriteria = { $regex: filterBy.phone, $options: 'i' }
    //     criteria.phone = txtCriteria
    // }

    console.log("Criteria built:", criteria)
    return criteria
}
