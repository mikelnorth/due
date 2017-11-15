// import axios from 'axios'

let initialState = {
    user_id: null,
    user: {
        id: '',
        name: '',
        email: '',
        user_pic: '',
        school: null
    }

}

const GET_USER = "GET_USER";
const SET_USER = "SET_USER"

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER + "_FULFILLED":
            return Object.assign({}, state, {user: action.payload});
        // case SET_USER + "_FULFILLED":
        //     return Object.assign({}, state, {user: action.payload})

        default:
            return state
    }
}

export function getUser() {
    return {
        type: GET_USER,
        payload: axios.get('/auth/me').then(res => {
            axios.get('/api/users/setuser/' + res.data.user_id)
            .then( res => {
                res.data
            })
            //res.data.user_id
        
        })
    }
}

// export function setUser(user_id) {
//     return {
//         type: SET_USER,
//         payload: axios.get('/api/users/setuser/' + user_id).then(res => res.data)
//     }
// }