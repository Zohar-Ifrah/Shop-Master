import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

import { CategorySelector } from "./category-select"
import { utilService } from "../services/util.service"

export function ProductFilter({ onSetFilter, onSetSort }) {

  const [filterByToEdit, setFilterByToEdit] = useState(useSelector((storeState) => storeState.productModule.filterBy))
  const [sortByToEdit, SetSortByToEdit] = useState(useSelector((storeState) => storeState.productModule.sortBy))
  const [showCategories, setShowCategories] = useState(false)
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)

  onSetFilter = useRef(utilService.debounce(onSetFilter))

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
      <input type="text"
        id="name"
        name="name"
        placeholder="Enter name..."
        value={filterByToEdit.name}
        onChange={handleFilter}
      />

      <div className="category-toggle" onClick={() => setShowCategories(prev => !prev)}>
        <span>Categories</span>
        {showCategories ? <span>▲</span> : <span>▼</span>}
      </div>

      {showCategories && (
        <CategorySelector
          onCategoryChange={onCategoryChange}
          filterByToEdit={filterByToEdit}
        />
      )}

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
          <option value="createdAt">Date</option>
        </select>
      </section>

      {user &&
        <button className="btn"><Link to="/product/edit">Add Product</Link></button>
      }
    </section>
  )
}