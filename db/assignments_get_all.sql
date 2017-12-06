SELECT DISTINCT a.assignment_id, a.assignment_name as title, a.datetime as start, a.datetime as end, c.class_name as desc, a.points_possible, uc.color, ua.completed, a.category FROM users as u
JOIN user_schools as us ON u.user_id = us.user_id
JOIN schools as s ON s.school_id = us.school_id
JOIN classes as c ON c.school_id = us.school_id
JOIN calendar as cal ON cal.class_id = c.class_id
JOIN user_calendars as uc ON uc.calendar_id = cal.calendar_id
JOIN assignments as a ON a.calendar_id = cal.calendar_id
JOIN user_assignment as ua ON ua.assignment_id = a.assignment_id
WHERE u.user_id = $1 and ua.user_id = $1 and us.user_id = $1 and uc.user_id = $1;