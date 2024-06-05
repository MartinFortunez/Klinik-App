const JadwalKonsul = require("../models/JadwalKonsul");

exports.getAllKonsul = (req, res) => {
  JadwalKonsul.getAll((err, schedules) => {
    if (err) throw err;
    res.render("konsultasi/index", { schedules });
  });
};

// add konsultasi NEW
exports.addJadwalKonsul = (req, res) => {
  const { nik, nama_pasien, alamat, gol_darah, tgl_lahir, no_wa, jadwal_id, jenis_kelamin, dokter_id, status, tgl_konsul } = req.body;
  const newJadwalKonsul = { nik, nama_pasien, alamat, gol_darah, tgl_lahir, no_wa, jadwal_id, jenis_kelamin, dokter_id, status, tgl_konsul };

  JadwalKonsul.create(newJadwalKonsul, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/jadwal-konsultasi");
  });
};
// add konsultasi END



// setuju konsultasi NEW
exports.setujuKonsultasi = (req, res) => {
  const { id } = req.params;

  JadwalKonsul.setujuKonsultasiMasuk(id, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/jadwal-konsultasi");
  });
};
  // END setuju konsultasi NEW


// tolak konsultasi NEW
exports.tolakKonsultasi = (req, res) => {
  const { id } = req.params;

  JadwalKonsul.tolakKonsultasiMasuk(id, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/jadwal-konsultasi");
  });
};
// END tolak konsultasi NEW



exports.deleteJadwalKonsul = (req, res) => {
  const { id } = req.params;

  JadwalKonsul.delete(id, (err) => {
    if (err) throw err;
    res.redirect("/dashboard/jadwal-konsultasi");
  });
};
