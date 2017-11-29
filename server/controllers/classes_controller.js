module.exports = {
    findClass: (req, res, next) => {
        const db = req.app.get('db');
        let { class_name, school_id } = req.params
        class_name = '%' + class_name + '%'

        db.classes_find_class([school_id]).then(
            classes => {
                res.status(200).send(classes)
            }
        )
    },

    createClass: (req, res, next) => {
        const db = req.app.get('db');
        const { class_name, school_id } = req.params


        db.classes_create_class([class_name, school_id]).then(
            classes => {
                res.status(200).send(classes)
            }
        )
    },

    getClassNamesByUser: (req, res, next) => {
        const db = req.app.get('db')
        const { user_id } = req.params

        db.classes_get_classnames_by_user([user_id]).then(
            classnames => {
                res.status(200).send(classnames)
            }
        )
    },

    deleteClass: (req, res, next) => {
        const db = req.app.get('db')
        const { user_id, calendar_id } = req.params
        //console.log('wahoo', user_id, calendar_id, req.params)
        db.delete_user_class([user_id, calendar_id]).then(
            response => {
                return db.classes_get_classnames_by_user([user_id]).then(
                    classnames => {
                        //console.log('class names', classnames)
                        res.status(200).send(classnames)
                    }
                )
            }
        )
    }
}