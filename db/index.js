const { Pool } = require('pg')
// const pool = new Pool({
//     user: 'isaiahsmith',
//     host: 'localhost',
//     database: 'puffin',
//     port: 5432,
//   });


  const pool = new Pool({
    user:'postgres',
    host: 'localhost',
    database: 'puffin',
    port: 5432,
  });


module.exports = pool;