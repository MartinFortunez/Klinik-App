const Ulasan = require("../models/Ulasan");

exports.getAllUlasan = (req, res) => {
  Ulasan.getAll((err, results) => {
    if (err) throw err;
    res.render("feedback/index", { feedback: results });
  });
};

exports.showAddForm = (req, res) => {
  res.render("feedback/index");
};

exports.editUlasan = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedUlasan = { status };

  Ulasan.update(id, updatedUlasan, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/feedback");
  });
};

exports.deleteUlasan = (req, res) => {
  const { id } = req.params;

  Ulasan.delete(id, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/feedback");
  });
};
