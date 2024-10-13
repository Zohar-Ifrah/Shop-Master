import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { utilService } from "../services/util.service"
import { CategorySelector } from "./category-select"




export function ProductFilter({ onSetFilter, onSetSort }) {
  const [filterByToEdit, setFilterByToEdit] = useState(useSelector((storeState) => storeState.productModule.filterBy))
  const [sortByToEdit, SetSortByToEdit] = useState(useSelector((storeState) => storeState.productModule.sortBy))

  onSetFilter = useRef(utilService.debounce(onSetFilter))

  const elInputRef = useRef(null)

  useEffect(() => {
    elInputRef.current && elInputRef.current.focus()
  }, [])

  // updates father cmp that filters change every type
  useEffect(() => {
    onSetFilter.current(filterByToEdit)
    // eslint-disable-next-line
  }, [filterByToEdit])

  useEffect(() => {
    onSetSort(sortByToEdit)
    // eslint-disable-next-line
  }, [sortByToEdit])

  function handleFilter({ target }) {
    let { value, type, name: field, checked } = target

    type === 'checkbox' ? value = checked :
      value = type === 'number' ? +value : value
      
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onCategoryChange(selectedCategories) {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, categories: selectedCategories }))
  }

  function handelSort({ target }) {
    let { value, checked, type, name: field, } = target
    if (type === 'checkbox') {
      checked ? value = 1 : value = -1
    }
    if (value === 'sort') value = ''

    SetSortByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }


  return (
    <section className="product-filter">
      <p>Filters:</p>

      <label htmlFor="name">Name:</label>
      <input type="text"
        id="name"
        name="name"
        placeholder="Enter name..."
        value={filterByToEdit.name}
        onChange={handleFilter}
      />

      {/* <label htmlFor="inStock">In stock</label>
      <input type="checkbox"
        id="inStock"
        name="inStock"
        checked={filterByToEdit.inStock}
        onChange={handleFilter}
      /> */}

      <CategorySelector onCategoryChange={onCategoryChange} filterByToEdit={filterByToEdit} />

      <section>
        <label htmlFor="desc">Desc</label>
        <input type="checkbox"
          id="desc"
          name="desc"
          checked={sortByToEdit.desc > 0}
          onChange={handelSort}
        />
        <select onChange={handelSort} className="txt-input" name="type" id="sort">
          <option value="sort">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Created At</option>
        </select>
      </section>

      <button className="btn"><Link to="/product/edit">Add Product</Link></button>
    </section>
  )
}
