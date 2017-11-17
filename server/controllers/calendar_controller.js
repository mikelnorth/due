module.exports = {
    findCalendars: (req, res, next) => {
        const db = req.app.get('db');
        const { class_id } = req.params

        db.calendar_find_calendars([ class_id ]).then(
            calendars => {
                res.status(200).send(calendars)
            }
        )

    },

    createCalendar: (req, res, next) => {
        const db = req.app.get('db');
        const { user_id, class_id } = req.params
        const { calendar_name, days } = req.body

        db.calendar_create_calendar([calendar_name, days, class_id, user_id]).then(
            calendar => {
                res.status(200).send(calendar)
            }
        )
    }


}