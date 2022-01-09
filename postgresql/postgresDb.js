const Pool = require('pg');

const pool = new Pool({
  user: "postgres",
  password: "2000",
  host: 'localhost',
  port: 5432,
  database: "crud_api"
})

module exports = pool;
