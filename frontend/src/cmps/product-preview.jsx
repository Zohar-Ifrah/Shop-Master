import { Link } from "react-router-dom"

export function ProductPreview({ product, onRemoveProduct }) {
    return <article className="product-preview-content">
        <img src="https://res.cloudinary.com/dqnsrtyxu/image/upload/v1728587555/bananas_tatxw8.png" alt="product-img" />
        <h4>{product.name}</h4>

        {/* {product.labels && product.labels.map((label, idx) =>
            <li key={label + (idx * Math.random()).toLocaleString()}>
                {label}</li>)} */}

        <p>Price: <span>{product.price.toLocaleString()}$</span></p>

        <div>
            <Link className="btn" to={`/product/details/${product._id}`}>Details</Link>
            <Link className="btn" to={`/product/edit/${product._id}`}>Edit</Link>
            <button className="btn" onClick={() => { onRemoveProduct(product._id) }}>Delete</button>
        </div>

    </article>
}
