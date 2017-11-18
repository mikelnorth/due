module.exports = {
    findClass: (req, res, next) => {
        const db = req.app.get('db');
        let { class_name, school_id }= req.params
        class_name = '%'+ class_name +'%'

        db.classes_find_class([school_id]).then(
            classes => {
                res.status(200).send(classes)
            }
        )
    },

    createClass: (req, res, next) => {
        const db =req.app.get('db');
        const { class_name, school_id } = req.params


        db.classes_create_class([class_name, school_id]).then(
            classes => {
                res.status(200).send(classes)
            }
        )
    }
}