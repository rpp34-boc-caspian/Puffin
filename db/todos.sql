CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id int,
  cat_id int,
  title text,
  descript text,
  start_d timestamp,
  end_d timestamp,
  all_d boolean,
  complete boolean,

  CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	      REFERENCES users(id),
  CONSTRAINT fk_category
      FOREIGN KEY(cat_id)
	      REFERENCES categories(id)
);

\copy todos(id, user_id, cat_id, title, descript, start_d, end_d, all_d, complete) from './todos.csv' delimiter ',' csv header;

CREATE INDEX todo_index ON todos(id);