import { useState } from "react"
import { useSelector } from "react-redux"

import { LoginSignup } from "../cmps/login-signup"
import { login, signup } from "../store/user.action"
import { showErrorMsg, showSuccessMsg, } from "../services/event-bus.service"

export function Home() {
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)
    const [feedback, setFeedback] = useState('')

    //demo
    const totalProducts = 45
    const userMessages = []
    const newsUpdates = [
        "Update 1: New feature coming soon!",
        "Update 2: System maintenance on Saturday.",
    ]

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullName}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullName}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    function handleSubmitFeedback() {
        console.log(feedback)
        setFeedback("")

    }

    return (
        <section className='Home'>
            {user ?
                <div>
                    <h2>Welcome {user.fullName}</h2>

                    <div className="dashboard">
                        <h3>Your Dashboard</h3>
                        <div>Total Products: {totalProducts}</div>
                        <div>Messages: {userMessages.length}</div>
                    </div>

                    <div className="feedback">
                        <h3>We value your feedback!</h3>
                        <textarea
                            placeholder="Share your thoughts..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                        <button onClick={handleSubmitFeedback}>Submit</button>
                    </div>

                    <div className="news">
                        <h3>Latest News</h3>
                        <ul>
                            {newsUpdates.map((update, index) => (
                                <li key={index}>{update}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                :
                <LoginSignup
                    onLogin={onLogin}
                    onSignup={onSignup}
                />
            }
        </section>
    )
}