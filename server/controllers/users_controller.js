module.exports = {
    getUsers: (req, res, next) => {
        const db = req.app.get('db');
        db.users_get_all()
        .then(users => res.status(200).send(users))
        .catch(err => res.status(500).send("Error: " + err))
    }
}