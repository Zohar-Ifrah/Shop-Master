import { useState } from "react"
import { NavLink } from "react-router-dom"

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function toggleMenu(toggle = true) {
        toggle ?
            setIsMenuOpen(!isMenuOpen) :
            setIsMenuOpen(toggle)
    }

    // close menu only only if navigating to a different page
    function handleNavClick(e) {
        if (!e.currentTarget.classList.contains('active')) {
            setIsMenuOpen(false)
        }
    }

    return (
        <header className='app-header' >
            <h1>Shop-Master</h1>

            <div className="hamburger-menu" onClick={toggleMenu} >
                <span className="menu_title">Menu</span>
                &#9776;
            </div>
            <nav className={'main-nav' + (isMenuOpen ? ' active' : '')}>

                <NavLink to="/" onClick={handleNavClick}>Home</NavLink>
                <NavLink to="/product" onClick={handleNavClick}>Products</NavLink>
                <NavLink to="/about" onClick={handleNavClick}>About</NavLink>
            </nav>
        </header>
    )
}