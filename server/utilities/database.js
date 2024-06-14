const { Pool } = require("pg");
const dotenv = require("dotenv").config({ path: '../.env'});


const connectionString = process.env.DB_CONNECT_STRING;

const pool = new Pool({
  connectionString,
});

module.exports = pool;