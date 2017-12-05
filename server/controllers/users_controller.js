module.exports = {
    getUsers: (req, res, next) => {
        const db = req.app.get('db');
        db.users_get_all()
        .then(users => res.status(200).send(users))
        .catch(err => res.status(500).send("Error: " + err))
    },
    setUserOnRedux: (req, res, next) => {
        const db = req.app.get('db');
        //console.log(req.params)
        const {user_id} = req.params
        db.users_set_user([req.params.user_id])
        .then( user => res.status(200).send(user))
    },
    updateFirst: (req, res, next) => {
        const db = req.app.get('db');
        //console.log(req.params)
        const {first_name, user_id} = req.params
        db.users_update_firstname([first_name, user_id])
        .then( user => res.status(200).send(user))
    },
    updateLast: (req, res, next) => {
        const db = req.app.get('db');
        //console.log(req.params)
        const {last_name, user_id} = req.params
        db.users_update_lastname([last_name, user_id])
        .then( user => res.status(200).send(user))
    },
    updateImg: (req, res, next) => {
        const db = req.app.get('db');
        console.log('the req.params',req.params)
        console.log('req.body', req.body)
        const {user_id} = req.params
        db.users_update_img([req.body.imgUrl, user_id])
        .then( user => res.status(200).send(user))
    }
}