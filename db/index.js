const { Pool } = require('pg')
const pool = new Pool({
    user: 'kgnwlf', // isaiahsmith
    host: 'localhost',
    database: 'kgnwlf', // puffin
    port: 5432,
  });


module.exports = pool;