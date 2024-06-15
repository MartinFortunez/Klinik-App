// Form Data Dokter
export const formDataDoctor = (values) => {
  const formData = new FormData();
  formData.append("foto_dokter", values.imageFile);
  formData.append("nama_dokter", values.namaDokter);
  formData.append("sip", values.sip);
  formData.append("spesialis", values.spesialis);
  return formData;
};

// Form Tambah jadwal dokter
export const formDataAddSchedule = (values) => {
  const respons = {
    dokter_id: values.idDokter,
    sesi: `${values.hari} (${values.jam})`,
  };
  return respons;
};

// Form Edit jadwal dokter
export const formDataEditSchedule = (values) => {
  const respons = {
    dokter_id: values.idDokter,
    sesi: `${values.hari} (${values.jam})`,
    status: values.status,
  };
  return respons;
};

// Form Data Fasilitas
export const formDataFacilities = (values) => {
  const formData = new FormData();
  formData.append("foto_fasilitas", values.imageFile);
  formData.append("judul", values.title);
  formData.append("deskripsi", values.description);
  return formData;
};

// Form Login
export const formDataLogin = (values) => {
  const respons = {
    username: values.username,
    password: values.password,
  };
  return respons;
};

// Form Add Konsul
export const formDataAddKonsul = (values) => {
  const respons = {
    nik: values.NIK,
    nama_pasien: values.nama,
    alamat: values.alamat,
    gol_darah: values.golonganDarah,
    tgl_lahir: values.tanggalLahir,
    no_wa: values.nohp,
    jadwal_id: values.jadwalId,
    dokter_id: values.dokterId,
    jenis_kelamin: values.jenisKelamin,
  };
  return respons;
};
