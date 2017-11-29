// const db = req.app.get('db');

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
        console.log('req.body.days is',req.body.days)
        let daysString = days.join(', ');

        db.calendar_create_calendar([calendar_name, daysString, class_id, user_id]).then(
            calendar => {
                res.status(200).send(calendar)
            }
        )
    },

    findCalendarByUser: (req, res, next) => {
        const db = req.app.get('db');
        const { user_id } = req.params

        db.calendar_get_user_calendars([user_id]).then(
            calendars => {
                res.status(200).send(calendars)
            }
        )
    },

    findCalendarByUserClass: (req, res, next) => {
        const db = req.app.get('db');        
        const { user_id, calendar_id } = req.params
        
        db.calendar_get_users_calendar([user_id, calendar_id]).then(
            calendar => {
                res.status(200).send(calendar)
            }
        )
    },

    subscribeToCalendar: (req, res, next) => {
        const db = req.app.get('db');        
        const { user_id, calendar_id } = req.params

        db.calendar_sub_to_calendar([user_id, calendar_id]).then(
            calendar => {
                res.status(200).send(calendar)
            }
        )
    },

    getAdminCalendars: (req, res, next) => {
        const db = req.app.get('db');        
        const { user_id } = req.params
        
        db.calendar_get_admin([user_id]).then(
            calendar => {
                res.status(200).send(calendar)
            }
        )
    }


}