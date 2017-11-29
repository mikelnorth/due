SELECT cal.calendar_name, c.class_name, c.class_id, cal.calendar_id, uc.color FROM users as u
JOIN user_schools as us ON u.user_id = us.user_id
JOIN schools as s ON s.school_id = us.school_id
JOIN classes as c ON c.school_id = us.school_id
JOIN calendar as cal ON cal.class_id = c.class_id
JOIN user_calendars as uc ON uc.calendar_id = cal.calendar_id
WHERE u.user_id = $1 AND uc.user_id = $1;