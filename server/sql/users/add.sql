INSERT
INTO users (email, name, hash, salt, location)
VALUES (${email}, ${name}, ${hash}, ${salt}, ST_SetSRID(ST_Point(${latitude}, ${longitude}),4326));

SELECT * FROM users_with_images;