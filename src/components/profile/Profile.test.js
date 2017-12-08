const funcs = require('./Profile-functions.js')
const users = require('../../../server/userData.json')


// test('get users', () => {
//     expect.assertions(1);
//     const url = "http://localhost:5000/api/users/setuser/36"
//     return funcs.getUser(url).then(res => {
//         console.log(res)
//         expect(res).toEqual('')
//     })
// })

test('get user by id', () => {
    let userToCheck = funcs.filterById(users, 5)
    expect(userToCheck[0].user_id).toEqual(5);
})

test('is name correct', () => {
    let name = funcs.getByName(users, "Mike");
    expect(name[0].user_name).toBe("Mike")
})

test('user object returned', () => {
    let userObj = funcs.getUsers(users);
    expect(typeof userObj).toBe("object")
})

test('there are users in the database', () => {  
    expect(funcs.getAllUsers(users)).toBeGreaterThan(0)
})

test('is an image', () => {  
    let pics = funcs.getProfilePic(users);
    expect(pics[0].user_pic).toContain(".jpg")
})
