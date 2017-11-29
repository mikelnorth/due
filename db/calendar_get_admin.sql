select cal.calendar_id, cal.calendar_name, cal.days, cl.class_id, cl.class_name, s.school_id, s.school_name from calendar as cal
JOIN classes as cl ON cal.class_id = cl.class_id
JOIN schools as s on s.school_id = cl.school_id
where user_id = $1;