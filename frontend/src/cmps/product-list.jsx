import { ProductPreview } from "./product-preview"

export function ProductList({ products, onRemoveProduct }) {
    if (!products || products.length <= 0) return <h1>There are no products to display</h1>
    return <ul className="product-list main-layout">
        {products.map(product =>
            <li className="product-preview" key={product._id}>
                <ProductPreview product={product} onRemoveProduct={onRemoveProduct} />
            </li>)}
    </ul>
}