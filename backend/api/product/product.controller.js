const productService = require('./product.service')
console.log("product.controller")

async function query(req, res) {
    try {
        const products = await productService.query(req.query)
        res.json(products)
    } catch (err) {
        console.error('Failed to query products:', err)
        res.status(500).json({ error: 'Failed to query products', details: err.message })
    }
}

async function get(req, res) {
    try {
        const product = await productService.get(req.params.id)
        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        res.json(product)
    } catch (err) {
        console.error('Failed to get product:', err)
        res.status(500).json({ error: 'Failed to get product', details: err.message })
    }
}

async function add(req, res) {
    const product = req.body
    try {
        const newProduct = await productService.add(product)
        res.json(newProduct)
    } catch (err) {
        console.error('Failed to add product:', err)
        res.status(500).json({ error: 'Failed to add product', details: err.message })
    }
}


async function remove(req, res) {
    try {
        const success = await productService.remove(req.params.id)
        if (!success) {
            return res.status(404).json({ error: 'Product not found or already deleted' })
        }
        res.json({ success: true })
    } catch (err) {
        console.error('Failed to remove product:', err)
        res.status(500).json({ error: 'Failed to remove product', details: err.message })
    }
}

async function update(req, res) {
    const product = req.body
    try {
        const updatedProduct = await productService.update(product)
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' })
        }
        res.json(updatedProduct)
    } catch (err) {
        console.error('Failed to update product:', err)
        res.status(500).json({ error: 'Failed to update product', details: err.message })
    }
}

async function removeAll(req, res) {
    try {
        const success = await productService.removeAll()
        if (!success) {
            return res.status(404).json({ error: 'No products found to delete' })
        }
        res.json({ success: true })
    } catch (err) {
        console.error('Failed to remove products:', err)
        res.status(500).json({ error: 'Failed to remove products', details: err.message })
    }
}

module.exports = {
    query,
    get,
    add,
    remove,
    update,
    removeAll
}
