import { useState } from 'react'

export function LoginSignup(props) {

    const [isSignup, setIsSignup] = useState(false)
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        fullname: '',
    })

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        props.onLogin(credentials)
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (
            !credentials.username ||
            !credentials.password ||
            !credentials.fullname
        )
            return
        props.onSignup(credentials)
        clearState()
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    return (
        <div className="login-page">
            <div className="login-signup-container">
                <div className="link" onClick={toggleSignup}>
                    {!isSignup ? 'Sign up' : 'Log in'}
                </div>
            </div>

            {!isSignup && (
                <form className="login-form" onSubmit={onLogin}>
                    <button className="btn-login"> Log in </button>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />

                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                </form>
            )}

            <div className="signup-section">
                {isSignup && (
                    <form className="signup-form" onSubmit={onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <button>Sign up</button>
                    </form>
                )}
            </div>
        </div>
    )
}