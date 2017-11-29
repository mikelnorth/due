INSERT INTO calendar (calendar_name, days, class_id, user_id, color)
VALUES
($1, $2, $3, $4, $5)
RETURNING calendar_id;