module.exports = {
    createAssignment: (req, res, next) => {
        const db = req.app.get('db');
        // console.log(req.body)
        // const { assignments } = req.body;
        let assignments = req.body

        const {class_id, calendar_id} = req.params

        console.log(assignments)
        assignments.map((assignment, index) => {
            console.log("Assignment: ", assignment)
            let assignmentForAdd = [
                class_id,
                calendar_id,
                assignment.assignment_name,
                assignment.points_possible,
                assignment.category,
                assignment.due_date,
            ]

            db.assignments_create_assignment(assignmentForAdd).then(
                assignment => {
                    console.log(assignment)
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