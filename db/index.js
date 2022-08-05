const { Pool } = require('pg')
// const pool = new Pool({
//     user: 'isaiahsmith',
//     host: 'localhost',
//     database: 'puffin',
//     port: 5432,
//   });


const pool = new Pool({
    user: 'donuty',
    host: 'localhost',
    database: 'puffin',
    port: 5432,
  });

// const pool = new Pool({
//   user: 'kgnwlf',
//   host: 'localhost',
//   database: 'kgnwlf',
//   port: 5432,
// });

// const pool = new Pool({
//   user: 'darianhogue',
//   host: 'localhost',
//   database: 'puffin',
//   port: 5432,
// });

// const pool = new Pool({
//   user: 'kgnwlf',
//   host: 'localhost',
//   database: 'kgnwlf',
//   port: 5432,
// });

// for create-todo
const tamPool = new Pool({
  user:'anuar',
  host: 'localhost',
  database: 'puffin',
  port: 5432,
});

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'puffin',
  port: 5432,
});

module.exports = {pool, tamPool};
