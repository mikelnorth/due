INSERT INTO user_calendars
(user_id, calendar_id, color)
VALUES
($1, $2, $3)
RETURNING *;