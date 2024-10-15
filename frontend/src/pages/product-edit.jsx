import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useForm } from "../custom-hooks/useForm"
import { ImgUploader } from "../cmps/img-uploader"
import { ConfirmModal } from "../cmps/ConfirmModal"
import { saveProduct } from "../store/product.action"
import { productService } from "../services/product.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function ProductEdit() {
    const navigate = useNavigate()
    const { productId } = useParams()
    const [newCategory, setNewCategory] = useState('')
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false)
    const [productToEdit, setProductToEdit, handleChange] =
        useForm(productService.getEmptyProduct())
        
    const [selectedCategory, setSelectedCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [imagesToDisplay, setImagesToDisplay] = useState(productToEdit.imgUrl)

    useEffect(() => {
        productId && loadProduct()
        loadCategories()

        // eslint-disable-next-line
    }, [productId])


    function loadCategories() {
        productService.getCategories()
            .then(setCategories)
            .catch(err => {
                console.error('Error loading categories:', err)
            })
    }

    function loadProduct() {
        productService.getById(productId)
            .then(product => {
                setProductToEdit(product)
                setSelectedCategory(product.category || '')
                setImagesToDisplay(product.imgUrl)
            })
            .catch(err => {
                console.log('Had issues in product details', err)
                navigate('/product')
            })
    }

    function onSaveProduct(ev) {
        ev.preventDefault()

        // prevent saving price lower then 0
        if (productToEdit.price <= 0) {
            const msg = 'The price must be greater than 0.'
            console.log(msg)
            showErrorMsg(msg)
            return
        }

        const productToSave = {
            ...productToEdit,
            category: (isAddingNewCategory && newCategory) ? newCategory : selectedCategory
        }

        // saving default picture if didnt upload
        if (productToSave.imgUrl === '') {
            productToSave.imgUrl = 'https://res.cloudinary.com/dqnsrtyxu/image/upload/v1728850468/bittjh638kcrvfxu94iz.png'
        }

        saveProduct(productToSave)
            .then(() => {
                console.log('product saved', productToSave)
                showSuccessMsg('Product saved!')
                navigate('/product')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save product')
            })
    }

    function onCancel() {
        setIsModalOpen(true)
    }

    function handleConfirmCancel() {
        setIsModalOpen(false)
        navigate('/product')
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }

    function onUploaded(imgUrl) {
        setProductToEdit((prevFields) => ({
            ...prevFields,
            imgUrl: imgUrl,
        }))
        setImagesToDisplay(imgUrl)
    }

    // 2DO swap with a real loader
    // if (productId && productToEdit.name === '') return <h1>loading...</h1>
    return (<section className="product-edit">
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
                    maxLength={50}
                    required
                />
            </div>

            <div className="number-type-labels">
                <div>
                    <label htmlFor="price">Price : </label>
                    <input type="number"
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        value={productToEdit.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="sku">SKU: </label>
                    <input
                        type="number"
                        name="sku"
                        id="sku"
                        placeholder="Enter SKU"
                        value={productToEdit.sku}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
            </div>
            <div>
                <ImgUploader
                    onUploaded={onUploaded}
                    imageToDisplay={imagesToDisplay}
                />
            </div>

            <div>
                <label htmlFor="description">Description: </label>
                <textarea
                    name="description"
                    id="description"
                    placeholder="Enter description..."
                    value={productToEdit.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => {
                        if (e.target.value === 'add-new') {
                            setIsAddingNewCategory(true)
                            setSelectedCategory('') // Clear the selected category
                        } else {
                            setIsAddingNewCategory(false)
                            setSelectedCategory(e.target.value)
                        }
                    }}
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                    <option value="add-new">Add a new category</option>
                </select>
            </div>

            {isAddingNewCategory && (
                <div>
                    <label htmlFor="new-category">New Category:</label>
                    <input
                        type="text"
                        id="new-category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter new category..."
                        maxLength={50}
                    />
                </div>
            )}

            <div className="action-btns">
                <button type="submit" className="save-btn">
                    {productToEdit._id ? 'Save' : 'Add'}
                </button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>

        <ConfirmModal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            onConfirm={handleConfirmCancel}
            msg="Cancel Changes?"
            msgContant="Are you sure you want to cancel? Any unsaved changes will be lost."
        />
    </section>
    )
}