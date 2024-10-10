import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { showErrorMsg } from "../services/event-bus.service"
import { productService } from "../services/product.service"


export function ProductDetails() {


    const { productId } = useParams()
    const navigate = useNavigate()
    const products = useSelector((storeState) => storeState.products)
    const [product, setProduct] = useState(products?.find(p => p._id === productId))

    useEffect(() => {
        if (!product) {
            loadProduct() // רק אם המוצר לא נמצא בסטור
        }
        // eslint-disable-next-line
    }, [product])

    function loadProduct() {
        productService.getById(productId)
            .then((fetchedProduct) => setProduct(fetchedProduct))
            .catch((err) => {
                console.log('Had issues in product details', err)
                showErrorMsg('Cannot load product')
                navigate('/product')
            })
    }

    // 2DO swap with real loader
    if (!product) return <h1>loadings....</h1>

    return <div className='product-details'>
        <h3>Product Details</h3>
        <h5>ID: {product._id}</h5>
        <h4>Name: {product.name}</h4>
        <h4>Category: {Array.isArray(product.category) ? product.category.map(c => <p key={c}>{c}</p>) : <p>{product.category}</p>}</h4>

        <h4>Description: {product.description}</h4>
        <p>Price: <span>{product.price.toLocaleString()}$</span></p>
        <h4>sku: {product.sku}</h4>
        <h4>Created At: {new Date(product.marketingDate).toLocaleDateString()}</h4>
        {/* <h4>inStock: {product.inStock ? '✔' : '❌'}</h4> */}

        <Link className="btn" to="/product">Back to List</Link>
    </div>
}
