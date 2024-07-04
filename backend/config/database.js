const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL server.");
});

module.exports = connection;

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "mysql",
//   }
// );

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("sql12715416", "sql12715416", "mJMqGbDBys", {
//   host: "sql12.freemysqlhosting.net",
//   port: 3306,
//   dialect: "mysql",
// });

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Koneksi Ke Database MySQL Berhasil.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// connectDB();

// module.exports = sequelize;
