SELECT users.user_id, users.user_name, users.email, users.user_pic, user_schools.school_id FROM Users
FULL OUTER JOIN user_schools ON users.user_id = user_schools.user_id
WHERE users.email = $1;