SELECT DISTINCT COUNT(*) as complete FROM user_assignment WHERE assignment_id = $1 AND completed = true;