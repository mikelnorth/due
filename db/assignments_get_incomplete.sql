SELECT DISTINCT COUNT(completed) as incomplete FROM user_assignment WHERE assignment_id = $1 and completed = false;
