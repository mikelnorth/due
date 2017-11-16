module.exports = {
    getUsers: (req, res, next) => {
        const db = req.app.get('db');
        db.users_get_all()
        .then(users => res.status(200).send(users))
        .catch(err => res.status(500).send("Error: " + err))
    },
    setUserOnRedux: (req, res, next) => {
        const db = req.app.get('db');
        console.log(req.params)
        const {user_id} = req.params
        db.users_set_user([req.params.user_id])
        .then( user => res.status(200).send(user))
    }
}