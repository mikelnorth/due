insert into classes (class_name, school_id)
values
($1, $2)
RETURNING class_id;