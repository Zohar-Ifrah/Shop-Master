// import { userService } from "../services/user.service.js"

// export const USER_STYLE = 'USER_STYLE'
// export const SET_USER = 'SET_USER'
// export const SET_USER_ACTIVITIES = 'SET_USER_ACTIVITIES'

// const initialState = {
//     loggedinUser: userService.getLoggedinUser(),
//     userStyle: {}
// }

// export function userReducer(state = initialState, action) {

//     switch (action.type) {
//         // User
//         case SET_USER:
//             return { ...state, loggedinUser: action.user }
//         case SET_USER_ACTIVITIES:
//             const user = { ...state.loggedinUser, activities: action.activities }
//             return { ...state, loggedinUser: user }
//         case USER_STYLE:
//             return { ...state, userStyle: action.userStyleToEdit }
//         default:
//             return { ...state }
//     }
// }