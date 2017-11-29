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
    calId: '',
    classInfo: [],
    events: [],
    topFive: [],
    update: '',
    adminCalendars: [],
    
}

const GET_USER = "GET_USER";
// const SET_USER = "SET_USER"
const SET_CAL_ID = 'SET_CAL_ID';
const GET_CLASS_INFO = 'GET_CLASS_INFO';
const SET_EVENTS = 'SET_EVENTS';
const SET_TOP_FIVE = 'SET_TOP_FIVE';
const UPDATE_DASHBOARD = 'UPDATE_DASHBOARD';
const DELETE_CLASS = 'DELETE_CLASS';
const GET_ADMIN_CALENDARS = 'GET_ADMIN_CALENDARS';


export default function (state = initialState, action) {
    //console.log(action)
    switch (action.type) {
        case GET_USER + "_FULFILLED":
            return Object.assign({}, state, { user: action.payload });
        case SET_CAL_ID:
            return Object.assign({}, state, { calId: action.payload });
        case GET_CLASS_INFO + "_FULFILLED":
            return Object.assign({}, state, { classInfo: action.payload });
        case SET_EVENTS:
            return Object.assign({}, state, { events: action.payload });
        case SET_TOP_FIVE:
            return Object.assign({}, state, { topFive: action.payload });
        case DELETE_CLASS + "_FULFILLED":
            return Object.assign({}, state, { classInfo: action.payload });
        case GET_ADMIN_CALENDARS + "_FULFILLED":
            return Object.assign({}, state, { adminCalendars: action.payload });

        default:
            return state
    }
}

export function getAdminCalendars(userId) {
    //console.log('in the get admin calendars, redux')
    const adminCal = axios.get(`/api/calendars/admin/${userId}`).then(resp => {
        //console.log('response in getadminCal redux', resp)
        return resp.data
    })

    return {
        type: GET_ADMIN_CALENDARS,
        payload: adminCal
    }
}

export function deleteClass(userId, calId) {
    //console.log('delete function redux', userId, calId)
    const classInfo = axios.delete(`/api/delete/class/${userId}/${calId}`).then(res => {
        //console.log('delete resonse', res)
        return res.data
    })

    return {
        type: DELETE_CLASS,
        payload: classInfo
    }
}

export function setTopFive(topFive) {

    return {
        type: SET_TOP_FIVE,
        payload: topFive
    }
}

export function setEvents(events) {

    return {
        type: SET_EVENTS,
        payload: events
    }
}

export function getClassInfo(userId) {
    const classInfo = axios.get(`/api/classes/getbyclassname/${userId}`).then(resp => {
        //console.log('response in getclassinfo redux', resp)
        return resp.data
    })

    return {
        type: GET_CLASS_INFO,
        payload: classInfo
    }
}

export function setCalId(id) {
    const calId = id

    return {
        type: SET_CAL_ID,
        payload: calId
    }
}

export function getUser() {
    const user = axios.get('/auth/me').then(res => {
        return axios.get('/api/users/setuser/' + res.data.email)
            .then(res => {
                //console.log("User Info: ", res.data[0])
                return res.data[0]
            })

    })
    return {
        type: GET_USER,
        payload: user
    }
}