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

// module.exports = {darianPool};
module.exports = {pool};