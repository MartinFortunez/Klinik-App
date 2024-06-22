// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to the MySQL server.");
// });

// module.exports = connection;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connected to the MySQL server."))
  .catch((err) => console.error("Unable to connect to the MySQL server:", err));

module.exports = sequelize;
