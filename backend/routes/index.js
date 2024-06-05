const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Ensure file is stored in memory buffer
const adminController = require("../controllers/adminController");
const dokterController = require("../controllers/dokterController");
const jadwalDokterController = require("../controllers/jadwalDokterController");
const fasilitasKlinikController = require("../controllers/fasilitasKlinikController.js");
const jadwalKonsulController = require("../controllers/jadwalKonsulController.js");
const reminderController = require("../controllers/reminderController.js");
const riwayatController = require("../controllers/riwayatController.js");
const ulasanController = require("../controllers/ulasanController.js");
const jwtController = require("../controllers/jwtController");
const verifyToken = require("../middleware/auth");


router.post('/reminder/send-whatsapp/:id', reminderController.sendWhatsAppMessageReminder);
router.post('/riwayat/send-whatsapp/:id', riwayatController.sendWhatsAppMessageRiwayat);


// Start Admin Routes
// READ
router.get("/dashboard/admin", adminController.getAllAdmins);

// CREATE
router.get("/dashboard/admin/add", adminController.showAddForm);
router.post("/dashboard/admin/add", upload.single('foto_admin'), adminController.addAdmin);

// UPDATE
router.get("/dashboard/admin/edit/:id", adminController.showEditForm);
router.post("/dashboard/admin/edit/:id", upload.single('foto_admin'), adminController.editAdmin);

// DELETE
router.get("/dashboard/admin/delete/:id", adminController.deleteAdmin);

// Jwt Auth
router.post("/register", jwtController.register);
router.post("/login", jwtController.login);
router.get("/profile", verifyToken, jwtController.getProfile);
// End Admin Routes





// Start Dokter Routes
// READ
router.get("/dashboard/dokter-klinik", dokterController.getAllDokter);

// CREATE
router.post("/dashboard/dokter-klinik/add", upload.single('foto_dokter'), dokterController.addDokter);

// UPDATE
router.post("/dashboard/dokter-klinik/edit/:id", upload.single('foto_dokter'), dokterController.editDokter);

// DELETE
router.get("/dashboard/dokter-klinik/delete/:id", dokterController.deleteDokter);
// End Dokter Routes




// Start Jadwal Dokter Routes
// READ
router.get("/dashboard/jadwal-dokter-spesialis", jadwalDokterController.getAllJadwalDokter);

// CREATE
router.post("/dashboard/jadwal-dokter-spesialis/add", jadwalDokterController.addJadwalDokter);

// UPDATE
router.post("/dashboard/jadwal-dokter-spesialis/edit/:id", jadwalDokterController.editJadwalDokter);

// DELETE
router.get("/dashboard/jadwal-dokter-spesialis/delete/:id", jadwalDokterController.deleteJadwalDokter);
// End Jadwal Dokter Routes






// Start Fasilitas Route
// READ
router.get("/dashboard/fasilitas", fasilitasKlinikController.getAllFasilitas);

// CREATE
router.post("/dashboard/fasilitas/add", upload.single('foto_fasilitas'), fasilitasKlinikController.addFasilitas);

// UPDATE
router.post("/dashboard/fasilitas/edit/:id", upload.single('foto_fasilitas'), fasilitasKlinikController.editFasilitas);

// DELETE
router.get("/dashboard/fasilitas/delete/:id", fasilitasKlinikController.deleteFasilitas);
// End Fasilitas Routes





// Start Feedback Routes
// READ
router.get("/dashboard/feedback", ulasanController.getAllUlasan);
// UPDATE
router.post("/dashboard/feedback/edit/:id", ulasanController.editUlasan);

// DELETE
router.get("/dashboard/feedback/delete/:id", ulasanController.deleteUlasan);
// End Jadwal Dokter Routes

router.get("/dashboard/home", (req, res) => {
  res.render("index");
});




// Start Jadwal Konsul Routes
// READ
router.get("/dashboard/jadwal-konsultasi", jadwalKonsulController.getAllKonsul);
// CREATE
router.post("/dashboard/jadwal-konsultasi/add", jadwalKonsulController.addJadwalKonsul);

// UPDATE NEW TOLAK DAN SETUJU
router.post('/dashboard/jadwal-konsultasi/:id/setuju', jadwalKonsulController.setujuKonsultasi);
router.post('/dashboard/jadwal-konsultasi/:id/tolak', jadwalKonsulController.tolakKonsultasi);
// UPDATE END NEW TOLAK DAN SETUJU


// DELETE
router.get("/dashboard/jadwal-konsultasi/delete/:id", jadwalKonsulController.deleteJadwalKonsul);
// End Jadwal Konsul Routes




// start reminder routes
router.get("/dashboard/reminder", reminderController.getAllReminder);
// end reminder routes


// start riwayat routes
router.get("/dashboard/riwayat", riwayatController.getAllRiwayat);
// end riwayat routes







module.exports = router;
