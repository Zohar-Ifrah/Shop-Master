import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { showErrorMsg } from "../services/event-bus.service";
import { productService } from "../services/product.service";

export function ProductDetails() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const products = useSelector((storeState) => storeState.products);
    const [product, setProduct] = useState(products?.find(p => p._id === productId));

    useEffect(() => {
        if (!product) {
            loadProduct(); // if not in store
        }
        // eslint-disable-next-line
    }, [product]);

    function loadProduct() {
        productService.getById(productId)
            .then((fetchedProduct) => setProduct(fetchedProduct))
            .catch((err) => {
                console.log('Had issues in product details', err);
                showErrorMsg('Cannot load product');
                navigate('/product');
            });
    }

    // 2DO swap with a real loader
    if (!product) return <h1>Loading...</h1>;

    return (
        <div className='product-details'>
            <img src={product.imgUrl} alt={product.name} className='product-image' />
            <div className='product-info'>
                <h2 className='product-name'>{product.name}</h2>
                <p className='product-description'>{product.description}</p>
                {product.category && <p className='product-category'>Category: {product.category}</p>}
                <p className='product-sku'>SKU: {product.sku}</p>
                <p className='product-price'>Price: ${product.price.toFixed(2)}</p>
                <p className='product-marketing-date'>Available since: {new Date(product.marketingDate).toLocaleDateString()}</p>
            </div>
            <Link className="btn" to="/product">Back to List</Link>
        </div>
    );
}
