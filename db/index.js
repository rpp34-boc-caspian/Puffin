const { Pool } = require('pg')
const pool = new Pool({
    user: 'kgnwlf', // isaiahsmith
    host: 'localhost',
    database: 'kgnwlf', // puffin
    port: 5432,
  });

// const darianPool = new Pool({
//   user: 'darianhogue',
//   host: 'localhost',
//   database: 'puffin',
//   port: 5432,
// });


// module.exports = {pool, darianPool};
module.exports = {pool};