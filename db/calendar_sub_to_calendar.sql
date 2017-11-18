INSERT INTO user_calendars
(user_id, calendar_id)
VALUES
($1, $2)
RETURNING *;