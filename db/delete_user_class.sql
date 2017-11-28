delete from user_calendars
where user_id = $1 and calendar_id = $2;