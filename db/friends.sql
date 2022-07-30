CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id int,
  friend_id int,

  CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	      REFERENCES users(id),
  CONSTRAINT fk_friend
      FOREIGN KEY(user_id)
	      REFERENCES users(id)
);

\copy friends(id, user_id, friend_id) from './db/friends.csv' delimiter ',' csv header;

CREATE INDEX friend_index ON friends(id);