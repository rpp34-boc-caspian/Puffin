CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  user_id int,
  friend_id int,
  cal_share boolean,
  cat_id int,
  cat_share boolean,
  todo_id int,
  permission int,

  CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	      REFERENCES users(id),
  CONSTRAINT fk_friend
      FOREIGN KEY(friend_id)
	      REFERENCES users(id),
  CONSTRAINT fk_cat_id
      FOREIGN KEY(cat_id)
	      REFERENCES categories(id),
  CONSTRAINT fk_todo
      FOREIGN KEY(todo_id)
	      REFERENCES todos(id)
);

\copy permissions(id, user_id, friend_id, cal_share, cat_id, cat_share, todo_id, permission) from './db/permissions.csv' delimiter ',' csv header;

CREATE INDEX permission_index ON permissions(id);