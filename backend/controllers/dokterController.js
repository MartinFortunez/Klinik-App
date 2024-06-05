const Dokter = require('../models/Dokter');

// exports.getAllDokter = (req, res) => {
//   Dokter.getAll((err, results) => {
//     if (err) throw err;
//     res.render("dokter/index", { users: results });
//   });
// };

exports.getAllDokter = (req, res) => {
  Dokter.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json(results);
  });
};

// exports.showAddForm = (req, res) => {
//   res.render("dokter/index");
// };

exports.addDokter = (req, res) => {
  const { sip, nama_dokter, spesialis } = req.body;
  const foto_dokter = req.file ? req.file.buffer : null;
  const newDokter = { sip, nama_dokter, spesialis, foto_dokter };

  Dokter.create(newDokter, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/dokter-klinik");
  });
};

// exports.showEditForm = (req, res) => {
//   const { id } = req.params;

//   Dokter.getById(id, (err, user) => {
//     if (err) throw err;
//     res.render("dokter/index", { user });
//   });
// };

exports.editDokter = (req, res) => {
  const { id } = req.params;
  const { sip, nama_dokter, spesialis } = req.body;
  const foto_dokter = req.file ? req.file.buffer : null;
  const updatedDokter = { sip, nama_dokter, spesialis, foto_dokter };

  Dokter.update(id, updatedDokter, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/dokter-klinik");
  });
};

exports.deleteDokter = (req, res) => {
  const { id } = req.params;

  Dokter.delete(id, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/dokter-klinik");
  });
};