SELECT users.user_id, users.user_name, users.first_name, users.last_name, users.email, users.user_pic, user_schools.school_id, school_name FROM Users
FULL OUTER JOIN user_schools ON users.user_id = user_schools.user_id
FULL OUTER JOIN schools on user_schools.school_id = schools.school_id
WHERE users.email = $1;