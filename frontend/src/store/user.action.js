import { store } from '../store/store.js'
import { SET_USER } from './user.reducer.js'
import { userService } from '../services/user.service.js'

export async function login(credentials) {

    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.error('Cannot login:', err)
            throw err
        })
}

export async function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.error('Cannot signup:', err)
            throw err
        })
}

export async function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch(err => {
            console.error('Cannot logout:', err)
            throw err
        })
}