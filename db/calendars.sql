CREATE TABLE calendars (
  id SERIAL PRIMARY KEY,
  cal_name text,
  user_id int,

  CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	      REFERENCES users(id)
);

\copy calendars(id, cal_name, user_id) from './calendars.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX cal_index ON calendars(id);