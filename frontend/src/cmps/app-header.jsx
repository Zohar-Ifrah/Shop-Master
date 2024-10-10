import { NavLink } from "react-router-dom"
// import { useEffect, useState } from "react"

// import { UserMsg } from "./user-msg"
// import { userService } from "../services/user.service"
// import { LoginSignup } from "./login-signup"


export function AppHeader() {
    // const [user, setUser] = useState(userService.getLoggedinUser())

    // useEffect(() => {

    // }, [])

    // function onLogout() {
    //     userService
    //         .logout()
    //         .then(() => { setUser(null) })
    // }

    // function onChangeLoginStatus(user) {
    //     console.log('from header: ', user)
    //     setUser(user)
    // }

    return (
        <header className='app-header' >
            <h1>Shop-Master</h1>
            {/* <UserMsg /> */}
{/* 
            {user ? (
                < section className='logged-user-header-info' >
                    <h2>Hello {user.fullname}</h2>
                    <button className=' log-btn btn' onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section className='login-container'>
                    <LoginSignup onChangeLoginStatus={onChangeLoginStatus} />
                </section>
            )} */}

            <nav className='main-nav'>
                {/* {user && <NavLink to="/user" className=''>Profile</NavLink>} */}
                <NavLink to="/">Home</NavLink>
                <NavLink to="/product">Products</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    )
}
