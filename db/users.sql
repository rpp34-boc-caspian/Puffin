CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(15),
  email text,
  hashed_pass varchar(80),
  sesh_id varchar(80)
);

\copy users(id, username, email, hashed_pass, sesh_id) from './users.csv' delimiter ',' csv header;

CREATE INDEX user_index ON users(id);