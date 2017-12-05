UPDATE users
SET user_pic = $1 where user_id = $2
RETURNING *;