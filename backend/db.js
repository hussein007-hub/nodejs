const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookverse',
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

module.exports = db;
