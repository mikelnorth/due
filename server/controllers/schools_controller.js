module.exports = {
    addSchool: (req, res, next) => {
        const db = req.app.get('db');
        const { school_id, user_id, school_name } = req.params

        db.schools_find_school([school_id]).then(
            school => {
                //School already exists in Schools table, adds school to user profile
                if (school[0]) {
                    db.add_user_school([user_id, school_id]).then(
                        uSchool => res.status(200).send(uSchool)
                    ).catch(err => res.status(500).send('Error ' + err))
                }

                //School doesn't exist in Schools table
                else {
                    //Add school to schools table
                    db.schools_add_school([school_id, school_name]).then(
                        //Add above school, to user profile
                        db.add_user_school([user_id, school_id]).then(
                            uSchool => res.status(200).send(uSchool)
                        ).catch(err => res.status(500).send('Error ' + err))

                    ).catch(err => res.status(500).send("Error: HERE" + err))

                }
            }
        )
    }
}


