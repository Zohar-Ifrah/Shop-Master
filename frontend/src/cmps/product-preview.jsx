import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { ConfirmModal } from "./ConfirmModal"

export function ProductPreview({ product, onRemoveProduct }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)

    function handleDelete() {
        setIsModalOpen(true)
    }

    function handleConfirmDelete() {
        onRemoveProduct(product._id)
        setIsModalOpen(false)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }

    return (
        <article className="product-preview-content">

            <Link to={`/product/details/${product._id}`} className="product-link">
                <section>

                    <img src={product.imgUrl} alt="product-img" />
                    <h4>{product.name}</h4>
                    <p>Price: <span>{product.price.toLocaleString()}$</span></p>
                    
                </section>
                <div className="quick-view">Quick View</div>
            </Link>

            {user &&
                <div className="actions">
                    <Link className="btn" to={`/product/edit/${product._id}`}>Edit</Link>
                    <button className="btn" onClick={handleDelete}>Delete</button>
                </div>
            }

            <ConfirmModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                msg="Delete Product?"
                msgContant="Are you sure you want to delete this product? This action cannot be undone."
            />
        </article>
    )
}
