import { useEffect, useState } from "react"
import { productService } from "../services/product.service"

export function CategorySelector({ onCategoryChange, filterByToEdit }) {

    const [selectedCategories, setSelectedCategories] = useState(filterByToEdit.categories)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        onCategoryChange(selectedCategories)
        loadCategories()
        // eslint-disable-next-line
    }, [selectedCategories])

    async function loadCategories() {
        return productService.getCategories()
            .then(categories => {
                setCategories(categories)
            })
            .catch(err => {
                console.log('Failed to load categories:', err)
            })
    }

    function handleCategoryChange(event) {
        const category = event.target.value
        setSelectedCategories((prevSelected) => {
            const updatedSelected = event.target.checked
                ? [...prevSelected, category]
                : prevSelected.filter(c => c !== category)

            return updatedSelected
        })
    }

    if (!categories) {
        return <p>loading...</p>
    }

    return (
        <div className="category-select">
            {categories.map((category) => (
                <div key={category} className="category-item">
                    <label htmlFor={category}>
                        <span>{category}</span>
                        <input
                            type="checkbox"
                            id={category}
                            value={category}
                            checked={selectedCategories.includes(category)}
                            onChange={handleCategoryChange}
                        />
                    </label>
                </div>
            ))}
        </div>
    )
}
