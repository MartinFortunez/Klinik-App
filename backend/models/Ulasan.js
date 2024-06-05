const connection = require("../config/database");

class Ulasan {
  static getAll(callback) {
    const query = "SELECT ulasan_id, nik, nama_pasien, penilaian, tgl_ulasan, rating, status FROM ulasan";
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  static getById(id, callback) {
    const query = "SELECT * FROM ulasan WHERE ulasan_id = ?";
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  static create(data, callback) {
    const query = "INSERT INTO ulasan (ulasan_id, nama_pasien, tgl_ulasan, status) VALUES (?, ?, ?, ?)";
    connection.query(query, [data.ulasan_id, data.nama_pasien, data.tgl_ulasan, data.status], callback);
  }

  static update(id, data, callback) {
    const query = "UPDATE ulasan SET status = ? WHERE ulasan_id = ?";
    connection.query(query, [data.status, id], callback);
  }

  static delete(id, callback) {
    const query = "DELETE FROM ulasan WHERE ulasan_id = ?";
    connection.query(query, [id], callback);
  }
}

module.exports = Ulasan;
