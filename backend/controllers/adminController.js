const Admin = require('../models/Admin');

exports.getAllAdmins = (req, res) => {
  Admin.getAll((err, results) => {
    if (err) throw err;
    res.render("admin/index", { users: results });
  });
};

exports.showAddForm = (req, res) => {
  res.render("admin/add");
};

exports.addAdmin = (req, res) => {
  const { username, password } = req.body;
  const foto_admin = req.file ? req.file.buffer : null;
  const newAdmin = { username, password, foto_admin };

  Admin.create(newAdmin, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/admin");
  });
};

exports.showEditForm = (req, res) => {
  const { id } = req.params;

  Admin.getById(id, (err, user) => {
    if (err) throw err;
    res.render("admin/edit", { user });
  });
};

exports.editAdmin = (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const foto_admin = req.file ? req.file.buffer : null;
  const updatedAdmin = { username, password, foto_admin };

  Admin.update(id, updatedAdmin, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/admin");
  });
};

exports.deleteAdmin = (req, res) => {
  const { id } = req.params;

  Admin.delete(id, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/admin");
  });
};
