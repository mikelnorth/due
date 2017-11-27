module.exports = {
    createAssignment: (req, res, next) => {
        const db = req.app.get('db');

        let assignments = req.body

        const {class_id, calendar_id} = req.params

        assignments.map((assignment, index) => {
            let assignmentForAdd = [
                class_id,
                calendar_id,
                assignment.assignment_name,
                assignment.points_possible,
                assignment.category,
                new Date(assignment.due_date),
            ]

            db.assignments_create_assignment(assignmentForAdd).then(
                assignment => {
                    console.log(assignment)
                }
            )
        })
        res.status(200).send('Complete')
    },

    //used to return all assignments for all class of a specified user.
    getCalendarAssignments: (req, res, next) => {
        const db = req.app.get('db');
        const{ user_id } = req.params

        db.assignments_get_all([ user_id ]).then(
            assignments => {
                res.status(200).send(assignments)
            }
        )
    },

    //used to return each assignment for an individual class on user id and class id
    getClassAssignments: (req, res, next) => {
        const db = req.app.get('db');
        const{ user_id, class_id } = req.params

        db.assignments_get_class([ user_id, class_id ]).then(
            newAssignments => {
                res.status(200).send(newAssignments)
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