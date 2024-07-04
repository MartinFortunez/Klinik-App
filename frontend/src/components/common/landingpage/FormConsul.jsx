import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import * as yup from "yup";
import { api } from "../../../api/api";

const validationSchema = yup.object().shape({
  NIK: yup
    .string()
    .matches(/^[0-9]+$/, "NIK harus berupa angka")
    .length(16, "NIK harus terdiri dari 16 digit")
    .required("NIK wajib diisi"),
  nama: yup
    .string()
    .matches(/^[^0-9]+$/, "Nama tidak boleh mengandung angka")
    .required("Nama wajib diisi"),
  alamat: yup.string().required("Alamat wajib diisi"),
  nohp: yup
    .string()
    .matches(/^[0-9]+$/, "Nomor Hp/Wa harus berupa angka")
    .min(10, "Nomor Hp/Wa minimal terdiri dari 10 digit")
    .max(12, "Nomor Hp/Wa maksimal terdiri dari 12 digit")
    .required("Nomor Hp/Wa wajib diisi"),
  tanggalLahir: yup.string().required("Tanggal lahir wajib diisi"),
  golonganDarah: yup
    .string()
    .notOneOf(["Pilih Jenis Kelamin"], "Jenis kelamin harus dipilih")
    .required("Golongan darah wajib diisi"),
  spesialis: yup.string().required("Spesialis wajib diisi"),
  namaDokter: yup.string().required("Nama dokter wajib diisi"),
  jenisKelamin: yup
    .string()
    .notOneOf(["Pilih Golongan Darah"], "Jenis Golongan darah harus dipilih")
    .required("Jenis kelamin wajib dipilih"),
  jadwalId: yup.string().required("Sesi wajib dipilih"),
});

const FormConsul = ({
  dataDoctor,
  show,
  handleClose,
  handleAdd,
  isLoading,
}) => {
  const { dokter_id, nama_dokter, spesialis } = dataDoctor;
  const [sesiData, setSesiData] = useState(null);
  const [bookedSessions, setBookedSessions] = useState([]);
  const nikRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jadwalKonsultasiData = await api("get", `jadwal-konsultasi`);
        const reminderData = await api("get", `reminder`);

        const bookedJadwalIds = [
          ...jadwalKonsultasiData.schedules.map((item) => item.jadwal_id),
          ...reminderData.schedules.map((item) => item.jadwal_id),
        ];

        setBookedSessions(bookedJadwalIds);
      } catch (error) {
        console.error("Error fetching booked session data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (show && nikRef.current) {
      nikRef.current.focus();
    }
  }, [show]);

  useEffect(() => {
    const fetchSesiData = async () => {
      try {
        const result = await api("get", `jadwal-dokter/${dokter_id}`);
        setSesiData(result);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSesiData();
  }, [dokter_id]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="border-0" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pengajuan Konsultasi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleAdd}
          initialValues={{
            NIK: "",
            nama: "",
            alamat: "",
            nohp: "",
            jenisKelamin: "",
            tanggalLahir: "",
            golonganDarah: "",
            spesialis: spesialis,
            namaDokter: nama_dokter,
            dokterId: dokter_id,
            jadwalId: "",
          }}
        >
          {({
            handleSubmit,
            values,
            touched,
            errors,
            handleChange,
            handleReset,
          }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="d-flex flex-column gap-2"
            >
              <Form.Group>
                <Form.Group controlId="validationNIK" className="mb-3">
                  <Form.Label>NIK</Form.Label>
                  <Form.Control
                    name="NIK"
                    type="text"
                    placeholder="Masukkan NIK"
                    value={values.NIK}
                    onChange={handleChange}
                    isValid={touched.NIK && !errors.NIK}
                    isInvalid={touched.NIK && !!errors.NIK}
                    ref={nikRef}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.NIK}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationNama" className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    name="nama"
                    type="text"
                    placeholder="Masukkan nama sesuai KTP"
                    value={values.nama}
                    onChange={handleChange}
                    isValid={touched.nama && !errors.nama}
                    isInvalid={touched.nama && !!errors.nama}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nama}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="validationAlamat"
                    className="mb-3"
                  >
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      name="alamat"
                      type="text"
                      placeholder="Masukkan alamat"
                      value={values.alamat}
                      onChange={handleChange}
                      isValid={touched.alamat && !errors.alamat}
                      isInvalid={touched.alamat && !!errors.alamat}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.alamat}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="validationNohp"
                    className="mb-3"
                  >
                    <Form.Label>No Hp / WhatsApp</Form.Label>
                    <Form.Control
                      name="nohp"
                      type="text"
                      placeholder="Masukkan no Hp / WhatsApp"
                      value={values.nohp}
                      onChange={handleChange}
                      isValid={touched.nohp && !errors.nohp}
                      isInvalid={touched.nohp && !!errors.nohp}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nohp}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="validationJeniskelamin"
                    className="mb-3"
                  >
                    <Form.Label>Jenis Kelamin</Form.Label>
                    <Form.Select
                      name="jenisKelamin"
                      value={values.jenisKelamin}
                      aria-label="Default select example"
                      onChange={handleChange}
                      isValid={touched.jenisKelamin && !errors.jenisKelamin}
                      isInvalid={touched.jenisKelamin && !!errors.jenisKelamin}
                    >
                      <option>Pilih Jenis Kelamin</option>
                      <option value="Laki-Laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.jenisKelamin}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="validationTanggallahir"
                    className="mb-3"
                  >
                    <Form.Label>Tanggal Lahir</Form.Label>
                    <Form.Control
                      name="tanggalLahir"
                      type="date"
                      value={values.tanggalLahir}
                      onChange={handleChange}
                      isValid={touched.tanggalLahir && !errors.tanggalLahir}
                      isInvalid={touched.tanggalLahir && !!errors.tanggalLahir}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.tanggalLahir}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="validationGolonganDarah"
                    className="mb-3"
                  >
                    <Form.Label>Golongan Darah</Form.Label>
                    <Form.Select
                      name="golonganDarah"
                      value={values.golonganDarah}
                      aria-label="Default select example"
                      onChange={handleChange}
                      isValid={touched.golonganDarah && !errors.golonganDarah}
                      isInvalid={
                        touched.golonganDarah && !!errors.golonganDarah
                      }
                    >
                      <option>Pilih Golongan Darah</option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="O+">O+</option>
                      <option value="A-">A-</option>
                      <option value="B-">B-</option>
                      <option value="AB-">AB-</option>
                      <option value="O-">O-</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.golonganDarah}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-semibold">Dokter</Form.Label>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="validationSpesialis"
                    className="mb-3"
                  >
                    <Form.Label>Spesialis</Form.Label>
                    <Form.Control
                      name="spesialis"
                      type="text"
                      value={values.spesialis}
                      onChange={handleChange}
                      isInvalid={touched.spesialis && !!errors.spesialis}
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.spesialis}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="validationDokter"
                    className="mb-3"
                  >
                    <Form.Label>Dokter</Form.Label>
                    <Form.Control
                      name="namaDokter"
                      type="text"
                      value={values.namaDokter}
                      onChange={handleChange}
                      isInvalid={touched.namaDokter && !!errors.namaDokter}
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.namaDokter}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId="validationSesi"
                    className="mb-3"
                  >
                    <Form.Label>Sesi</Form.Label>
                    <Form.Select
                      name="jadwalId"
                      aria-label="Default select example"
                      value={values.jadwalId}
                      onChange={handleChange}
                      isValid={touched.jadwalId && !errors.jadwalId}
                      isInvalid={touched.jadwalId && !!errors.jadwalId}
                    >
                      <option>Pilih Sesi</option>
                      {sesiData &&
                        Array.isArray(sesiData) &&
                        sesiData.map((item) => (
                          <option
                            key={item.jadwal_id}
                            value={item.jadwal_id}
                            disabled={bookedSessions.includes(item.jadwal_id)}
                            className={`${
                              bookedSessions.includes(item.jadwal_id)
                                ? "text-secondary"
                                : "text-primary"
                            }`}
                          >
                            {item.sesi}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.jadwalId}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Button
                    variant="secondary"
                    type="button"
                    className="w-100 bg-transparent border-0"
                    onClick={() => {
                      handleReset();
                      handleClose();
                    }}
                  >
                    Batal
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 text-light"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Kirim Konsultasi"
                    )}
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default FormConsul;
