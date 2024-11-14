const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();


/* Connect to DB */
const connection_db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});
console.log(`Connected DB: ${process.env.DB_NAME}`);

module.exports = connection_db;
