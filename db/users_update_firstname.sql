UPDATE users
SET first_name = $1 where user_id = $2 
RETURNING *;