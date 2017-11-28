import axios from 'axios'

let initialState = {
    user_id: null,
    user: {
        id: '',
        name: '',
        email: '',
        user_pic: '',
        school_id: null
    },
    class: {
        class_name: '',
        calendar_name: '',
        days: []
    },
    classId: ''


}

const GET_USER = "GET_USER";
// const SET_USER = "SET_USER"
const SET_CLASS_ID = 'SET_CLASS_ID'



export default function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case GET_USER + "_FULFILLED":
            return Object.assign({}, state, { user: action.payload });
        case SET_CLASS_ID:
            return Object.assign({}, state, {classId: action.payload})

        default:
            return state
    }
}

export function setClassId(id) {
    console.log('redux wizard1 inputs', id)
    const classId = id

    return {
        type: SET_CLASS_ID,
        payload: classId
    }
}

export function getUser() {
    console.log("getUser in reducer")
    const user = axios.get('/auth/me').then(res => {
        console.log('getUser response', res)
        return axios.get('/api/users/setuser/' + res.data.email)
            .then(res => {
                console.log("User Info: ", res.data[0])
                return res.data[0]
            })

    })
    return {
        type: GET_USER,
        payload: user
    }
}

// export function setUser(user_id) {
//     return {
//         type: SET_USER,
//         payload: axios.get('/api/users/setuser/' + user_id).then(res => res.data)
//     }
// }