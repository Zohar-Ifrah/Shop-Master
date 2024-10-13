import { useEffect, useState } from "react"
import { productService } from "../services/product.service"

export function CategorySelector({ onCategoryChange, productToEdit, filterByToEdit }) {

    const [selectedCategories, setSelectedCategories] = useState(productToEdit ? productToEdit.categories : filterByToEdit.categories)
    // const categories = productService.getCategories()
    const [categories, setCategories] = useState([])


    function loadCategories() {
        productService.getCategories()
            .then(setCategories)
            .catch(err => {
                console.error('Error loading categories:', err)
            })
    }

    useEffect(() => {
        loadCategories()
        console.log('LOADING');
        
        // onCategoryChange(selectedCategories)
        // ***TO CHECK*** (why / if should remove?)
        // eslint-disable-next-line      
    }, [selectedCategories])

    function handleCategoryChange(event) {
        const category = event.target.value

        if (event.target.checked) {
            setSelectedCategories([...selectedCategories, category])
        } else {
            setSelectedCategories(selectedCategories.filter(c => c !== category))
        }
    }


    if (!categories) {
        console.log(categories);
        return 'loading...'
    }
    return (
        <div className="category-select">
            <p>Categories:</p>
            {categories.map((category) => (
                <div key={category} className="category-item">
                    <label htmlFor={category}>
                        <span>{category}</span>
                        <input
                            type="checkbox"
                            id={category}
                            value={category}
                            checked={selectedCategories.includes(category)}
                            // checked={false}
                            onChange={handleCategoryChange}
                        />
                    </label>
                </div>
            ))}
        </div>
    )
}
