UPDATE user_assignment SET completed = NOT completed WHERE user_id = $1 AND assignment_id = $2 RETURNING *;