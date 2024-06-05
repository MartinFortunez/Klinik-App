const connection = require("../config/database");

class Admin {
  static getAll(callback) {
    const query = "SELECT admin_id, username, password, foto_admin FROM admin";
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      results.forEach(result => {
        if (result.foto_admin) {
          result.foto_admin = Buffer.from(result.foto_admin, 'binary').toString('base64');
        }
      });
      callback(null, results);
    });
  }

  static getById(id, callback) {
    const query = "SELECT * FROM admin WHERE admin_id = ?";
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  static create(data, callback) {
    const query = "INSERT INTO admin (foto_admin, username, password) VALUES (?, ?, ?)";
    connection.query(query, [data.foto_admin, data.username, data.password], callback);
  }

  static update(id, data, callback) {
    let query, queryParams;
    if (data.foto_admin) {
      query = "UPDATE admin SET username = ?, password = ?, foto_admin = ? WHERE admin_id = ?";
      queryParams = [data.username, data.password, data.foto_admin, id];
    } else {
      query = "UPDATE admin SET username = ?, password = ? WHERE admin_id = ?";
      queryParams = [data.username, data.password, id];
    }
    connection.query(query, queryParams, callback);
  }

  static delete(id, callback) {
    const query = "DELETE FROM admin WHERE admin_id = ?";
    connection.query(query, [id], callback);
  }
}

module.exports = Admin;
