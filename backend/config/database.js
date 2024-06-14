const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "educalab.id",
  port: 3307,
  user: "HxaPZGB5X4DGjG5B",
  password: "ZABve5MAD4iOxN8U",
  database: "db_klinik_app",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL server.");
});

module.exports = connection;
