module.exports = {
    createAssignment: (req, res, next) => {
        const db = req.app.get('db');
        // console.log(req.body)
        // const { assignments } = req.body;
        let assignments = req.body

        // console.log(assignments)
        assignments.map((assignment, index) => {
            // console.log(assignment)
            let assignmentForAdd = [
                assignment.class_id,
                assignment.calendar_id,
                assignment.assignment_name,
                assignment.due_date,
                assignment.points_possible,
                assignment.due_time,
                assignment.category
            ]

            db.assignments_create_assignment(assignmentForAdd).then(
                assignment => {
        
                }
            )
        })
        res.status(200).send('Complete')
    },

    getCalendarAssignments: (req, res, next) => {
        const db = req.app.get('db');
        const{ user_id } = req.params

        db.assignments_get_all([ user_id ]).then(
            assignments => {
                res.status(200).send(assignments)
            }
        )
    }

    // findAssignmetsByUser: (req, res, next) => {
    //     const db = req.app.get('db');
    //     const { user_id } = req.params

    //     db.calendar_get_users_calendars([user_id]).then(
    //         calendars => {
    //             res.status(200).send(calendars)
    //         }
    //     )

        
    // }
}