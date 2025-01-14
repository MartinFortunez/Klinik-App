import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useQueryClient } from "react-query";
import { handleSubmit } from "../../../../utils/handleFunction";
import { formDataEditSchedule } from "../../../../utils/body";
import { toast } from "react-toastify";

const Edit = ({ show, handleClose, data, dataDoctor }) => {
  const { dokter_id, jadwal_id, sesi, nama_dokter, spesialis, status } = data;
  // Mencari posisi tanda kurung
  const startIndex = sesi.indexOf("(");
  const endIndex = sesi.indexOf(")");

  // Memisahkan hari dan jam dari string sesi
  const hari = sesi.substring(0, startIndex).trim(); // Mengambil teks sebelum tanda kurung dan menghapus spasi di sekitarnya
  const jam = sesi.substring(startIndex + 1, endIndex).trim(); // Mengambil teks di antara tanda kurung dan menghapus spasi di sekitarnya
  const queryClient = useQueryClient();
  const [selectedDokter, setSelectedDokter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values, actions) => {
    setIsLoading(true);
    try {
      handleSubmit(
        "put",
        `jadwal-dokter-spesialis/edit/${jadwal_id}`,
        formDataEditSchedule(values),
        actions,
        handleClose,
        queryClient,
        "jadwalDokterData"
      );
      // Display toast notification upon successful addition
      toast.success("Berhasil mengubah jadwal dokter!");
    } catch (error) {
      toast.warning("Gagal mengubah jadwal dokter!");
      console.error("Error edit doctor schedule:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Tambah Jadwal Dokter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            idDokter: dokter_id,
            namaDokter: nama_dokter,
            spesialis: spesialis,
            jam: jam,
            hari: hari,
            status: status,
          }}
        >
          {({ handleSubmit, values, touched, errors, handleChange }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationUsername" className="mb-3">
                <Form.Label>Id Dokter</Form.Label>
                <Form.Control
                  name="idDokter"
                  type="text"
                  value={values.idDokter}
                  onChange={handleChange}
                  isInvalid={touched.idDokter && !!errors.idDokter}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  {errors.idDokter}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationUsername" className="mb-3">
                <Form.Label>Nama Dokter</Form.Label>
                <Form.Select
                  name="namaDokter"
                  value={values.namaDokter}
                  onChange={(e) => {
                    handleChange(e);
                    const selected = dataDoctor.find(
                      (dokter) => dokter.nama_dokter === e.target.value
                    );
                    if (selected) {
                      setSelectedDokter(selected);
                      handleChange({
                        target: { name: "idDokter", value: selected.dokter_id },
                      });
                      handleChange({
                        target: {
                          name: "spesialis",
                          value: selected.spesialis,
                        },
                      });
                    }
                  }}
                  isInvalid={touched.namaDokter && !!errors.namaDokter}
                >
                  {" "}
                  <option value="">Pilih Dokter</option>
                  {dataDoctor &&
                    Array.isArray(dataDoctor) &&
                    dataDoctor.map((item) => (
                      <option key={item.dokter_id} value={item.nama_dokter}>
                        {item.nama_dokter}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.namaDokter}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationUsername" className="mb-3">
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
              <Form.Group controlId="hari" className="mb-3">
                <Form.Label>Hari</Form.Label>
                <Form.Control
                  as="select"
                  name="hari"
                  value={values.hari}
                  onChange={handleChange}
                >
                  <option value="">Pilih Hari</option>
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                  <option value="Sabtu">Sabtu</option>
                  <option value="Minggu">Minggu</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="jam" className="mb-3">
                <Form.Label>Jam</Form.Label>
                <Form.Select
                  name="jam"
                  value={values.jam}
                  onChange={handleChange}
                >
                  {" "}
                  <option value="">Pilih Jam</option>
                  <option value="09:00 - 10:00">09:00 - 10:00</option>
                  <option value="10:00 - 11:00">10:00 - 11:00</option>
                  <option value="11:00 - 12:00">11:00 - 12:00</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Row}>
                <Col>
                  <Button
                    variant="secondary"
                    type="button"
                    className="w-100 bg-transparent border-0"
                    onClick={handleClose}
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
                      "Konfirmasi"
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

export default Edit;
