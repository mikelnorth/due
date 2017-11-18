SELECT class_id as value, class_name as label FROM classes
WHERE school_id = $1;