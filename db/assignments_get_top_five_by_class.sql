SELECT DISTINCT a.assignment_name as title, a.datetime as start, a.datetime as end, c.class_name as desc, a.points_possible FROM users as u
JOIN user_schools as us ON u.user_id = us.user_id
JOIN schools as s ON s.school_id = us.school_id
JOIN classes as c ON c.school_id = us.school_id
JOIN calendar as cal ON cal.class_id = c.class_id
JOIN user_calendars as uc ON uc.calendar_id = cal.calendar_id
JOIN assignments as a ON a.calendar_id = cal.calendar_id
JOIN user_assignment as ua ON ua.user_id = uc.user_id
WHERE uc.user_id = $1 and u.user_id = $1 and cal.calendar_id = $2 and a.datetime >= now()::date
ORDER BY a.points_possible DESC
LIMIT 5;