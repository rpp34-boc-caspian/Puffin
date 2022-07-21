CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  user_id int,
  friend_id int,
  todo_id int,
  permission int,

  CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	      REFERENCES users(id),
  CONSTRAINT fk_friend
      FOREIGN KEY(friend_id)
	      REFERENCES users(id),
  CONSTRAINT fk_todo
      FOREIGN KEY(todo_id)
	      REFERENCES todos(id)
);

\copy permissions(id, user_id, friend_id, todo_id, permission) from './permissions.csv' delimiter ',' csv header;

CREATE INDEX permission_index ON permissions(id);