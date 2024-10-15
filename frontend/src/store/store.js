import { productReducer } from './product.reducer.js'
import { combineReducers, legacy_createStore as createStore } from "redux"
import { userReducer } from './user.reducer.js'

const rootReducer = combineReducers({
    productModule: productReducer,
    userModule: userReducer
})


export const store = createStore(rootReducer)

// For debug
store.subscribe(() => {
    console.log('Current state is:', store.getState())
})