require('dotenv').config();
const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: 'puffin',
    port: 5432,
  });

module.exports = {pool};