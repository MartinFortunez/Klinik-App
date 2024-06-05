const JadwalDokter = require("../models/JadwalDokter");

exports.getAllJadwalDokter = (req, res) => {
  JadwalDokter.getAll((err, schedules) => {
    if (err) throw err;
    JadwalDokter.getAllDoctors((err, doctors) => {
      if (err) throw err;
      res.render("jadwal-dokter/index", { schedules, doctors });
    });
  });
};

exports.addJadwalDokter = (req, res) => {
  const { dokter_id, sesi, status } = req.body;
  const newJadwalDokter = { dokter_id, sesi, status };

  JadwalDokter.create(newJadwalDokter, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/jadwal-dokter-spesialis");
  });
};

exports.editJadwalDokter = (req, res) => {
  const { id } = req.params;
  const { dokter_id, sesi, status } = req.body;
  const updatedJadwalDokter = { dokter_id, sesi, status };

  JadwalDokter.update(id, updatedJadwalDokter, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/jadwal-dokter-spesialis");
  });
};

exports.deleteJadwalDokter = (req, res) => {
  const { id } = req.params;

  JadwalDokter.delete(id, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/jadwal-dokter-spesialis");
  });
};
