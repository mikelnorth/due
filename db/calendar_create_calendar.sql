INSERT INTO calendar (calendar_name, days, class_id, user_id)
VALUES
($1, $2, $3, $4)
RETURNING calendar_id;