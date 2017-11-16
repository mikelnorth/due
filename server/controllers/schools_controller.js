module.exports = {
    addSchool: (req, res, next) => {
        const db = req.app.get('db');
        const { user_id } = req.params
        const { school_id } = req.body
        db.add_user_school([user_id, school_id]).then(
            res => res.status(200).send(res)
        ).catch( err => res.status(500).send('Error ' +err))
    }
}