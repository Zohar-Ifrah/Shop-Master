import { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"

import { logout } from "../store/user.action"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function AppHeader() {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)

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

    async function handleLogout(e) {
        if (!e.currentTarget.classList.contains('active')) {
            setIsMenuOpen(false)
        }
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function navHome() {
        navigate('/')
    }

    return (
        <header className='app-header' >
            <h1 onClick={navHome}>Shop-Master</h1>

            {/* phone view */}
            <div className="hamburger-menu" onClick={toggleMenu} >
                <span className="menu_title">Menu</span>
                &#9776;
            </div>

            <nav className={'main-nav' + (isMenuOpen ? ' active' : '')}>

                <NavLink to="/" onClick={handleNavClick}>Home</NavLink>
                <NavLink to="/product" onClick={handleNavClick}>Products</NavLink>
                <NavLink to="/about" onClick={handleNavClick}>About</NavLink>
                {user &&
                    <NavLink to="/" onClick={handleLogout} className='Logout' >Logout</NavLink>
                }
            </nav>
        </header>
    )
}