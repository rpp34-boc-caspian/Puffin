const { Pool } = require('pg')
<<<<<<< HEAD
const pool = new Pool({
    user: 'kgnwlf', // isaiahsmith
=======
// const pool = new Pool({
//     user: 'isaiahsmith',
//     host: 'localhost',
//     database: 'puffin',
//     port: 5432,
//   });


  const pool = new Pool({
    user:'postgres',
>>>>>>> a54657e97749f8be64d1bbfe0c97a3477a6af3ec
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