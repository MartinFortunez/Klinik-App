const Fasilitas = require('../models/Fasilitas');

exports.getAllFasilitas = (req, res) => {
  Fasilitas.getAll((err, results) => {
    if (err) throw err;
    res.render("fasilitas/index", {facilities: results });
  });
};

exports.showAddForm = (req, res) => {
  res.render("fasilitas/index");
};

exports.addFasilitas = (req, res) => {
  const { judul, deskripsi } = req.body;
  const foto_fasilitas = req.file ? req.file.buffer : null;
  const newFasilitas = { judul, deskripsi, foto_fasilitas };

  Fasilitas.create(newFasilitas, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/fasilitas");
  });
};

exports.showEditForm = (req, res) => {
  const { id } = req.params;

  Dokter.getById(id, (err, user) => {
    if (err) throw err;
    res.render("fasilitas/index", { user });
  });
};

exports.editFasilitas = (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi} = req.body;
  const foto_fasilitas = req.file ? req.file.buffer : null;
  const updatedFasilitas = { judul, deskripsi, foto_fasilitas };

  Fasilitas.update(id, updatedFasilitas, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/fasilitas");
  });
};

exports.deleteFasilitas = (req, res) => {
  const { id } = req.params;

  Fasilitas.delete(id, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/fasilitas");
  });
};
