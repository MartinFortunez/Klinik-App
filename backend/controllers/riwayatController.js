const JadwalKonsul = require("../models/JadwalKonsul");

exports.getAllRiwayat = (req, res) => {
  JadwalKonsul.getAllRiwayat((err, schedules) => {
    if (err) throw err;
    res.render("riwayat/index", { schedules });
  });
};

// Fungsi untuk memastikan nomor dalam format E.164
const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith('0')) {
    return '+62' + phoneNumber.slice(1);
  }
  return phoneNumber;
};

exports.sendWhatsAppMessageRiwayat = (req, res) => {
  const { id } = req.params;
  console.log(`Fetching schedule with ID: ${id}`);

  JadwalKonsul.getById(id, (err, schedule) => {
    if (err) {
      console.error('Error retrieving schedule data:', err);
      return res.status(500).send('Error retrieving schedule data');
    }

    if (!schedule) {
      console.log('Schedule not found');
      return res.status(404).send('Schedule not found');
    }

    console.log('Schedule retrieved:', schedule);

    const formattedPhoneNumber = formatPhoneNumber(schedule.no_wa);
    const message = `Halo, ini adalah Klinik Sultan Farm.\n\nKami memiliki catatan atas nama:\n\nNama: ${schedule.nama_pasien}\nNIK: ${schedule.nik}\nAlamat: ${schedule.alamat}\nNomor Kontak/WhatsApp: ${formattedPhoneNumber}\n\nMohon konfirmasikannya, apakah Anda tetap ingin konsultasi. Terima kasih.`;

    console.log('Sending message:', message);

    // Konstruksi URL WhatsApp
    const waLink = 'https://web.whatsapp.com/send';
    const phone = formattedPhoneNumber;
    const text = encodeURIComponent(message);
    const checkoutWhatsApp = `${waLink}?phone=${phone}&text=${text}`;

    // Mengirim URL WhatsApp ke klien
    res.json({ url: checkoutWhatsApp });
  });
};


