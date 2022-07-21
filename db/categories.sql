CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_name varchar(15),
  calendar_id int,
  color int,

  CONSTRAINT fk_calendar
      FOREIGN KEY(calendar_id)
	      REFERENCES calendars(id)
);

\copy categories(id, category_name, calendar_id, color) from './categories.csv' delimiter ',' csv header;

CREATE INDEX category_index ON categories(id);