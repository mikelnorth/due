const axios = require('axios');

module.exports = {
//     getUser(url) {
//         return axios.get(url).then(res => {
//             return res.data
//         })
//     },
    filterById(users, id) {
        return users.filter(user => {
            return user.user_id == id
        })
    },

    getByName(users, name) {
        return users.filter(user => {
            return user.user_name == name
        })
    },

    getUsers(users) {
        return users[0]
    },

    getAllUsers(users){
        return users.length
    },

    getProfilePic(users){
        return users.filter(user => {
            console.log(user.user_pic)
            return user.user_pic
        })
    }
}