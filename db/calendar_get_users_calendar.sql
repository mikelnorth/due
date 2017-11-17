SELECT * FROM user_calendars as u
JOIN calendar as c ON c.calendar_id = u.calendar_id
WHERE u.user_id = $1 AND c.calendar_id = $2;