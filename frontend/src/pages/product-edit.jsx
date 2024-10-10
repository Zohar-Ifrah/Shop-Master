import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { productService } from "../services/product.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
// import { LabelSelector } from "../cmps/label-select"

export function ProductEdit() {
    const [productToEdit, setProductToEdit] = useState(productService.getEmptyProduct())
    const navigate = useNavigate()
    const { productId } = useParams()

    useEffect(() => {
        productId && loadProduct()
        // eslint-disable-next-line
    },[productId])

    function loadProduct() {
        productService.getById(productId)
            .then(product => setProductToEdit(product))
            .catch(err => {
                console.log('Had issues in product details', err)
                navigate('/product')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        type === 'checkbox' ? value = checked :
            value = type === 'number' ? +value : value
        setProductToEdit(prevProduct => ({ ...prevProduct, [field]: value }))
    }

    function onSaveProduct(ev) {
        ev.preventDefault()
        productService.save(productToEdit)
            .then((product) => {
                console.log('product saved', product)
                showSuccessMsg('Product saved!')
                navigate('/product')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save product')
            })
    }

    // function onLabelChange(selectedLabels) {
    //     setProductToEdit((prevFilter) => ({
    //         ...prevFilter,
    //         labels: selectedLabels,
    //     }))
    // }

    if (productId && productToEdit.name === '') return <h1>loading...</h1>
    return <section className="product-edit">
        <h2>{productToEdit._id ? 'Edit product' : 'Add a new product'}</h2>

        <form className="edit-content" onSubmit={onSaveProduct}>
            <div>
                <label htmlFor="name">Name: </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={productToEdit.name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={productToEdit.price}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="description">Description: </label>
                <input type="text"
                    name="description"
                    id="description"
                    placeholder="Enter description..."
                    value={productToEdit.description}
                    onChange={handleChange}
                />
            </div>

            {/* {productToEdit._id &&
                <div>
                    <label htmlFor="price">In Stock : </label>
                    <input type="checkbox"
                        name="inStock"
                        id="inStock"
                        checked={productToEdit.inStock}
                        onChange={handleChange}
                    />
                </div>
            } */}

            {/* <LabelSelector onLabelChange={onLabelChange} productToEdit={productToEdit} /> */}

            <div>
                <button className="btn">{productToEdit._id ? 'Save' : 'Add'}</button>
                <Link className="btn" to="/product">Cancel</Link>
            </div>
        </form>
    </section>
}
