import { Formik } from "formik";
import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const Add = ({ show, handleClose, handleAdd }) => {
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
          onSubmit={console.log("submit")}
          initialValues={{
            nama: "",
            idDokter: "",
            spesialis: "",
            jadwalDokter: "",
          }}
        >
          {({ handleSubmit, values, touched, errors, handleChange }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationNama" className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  name="nama"
                  type="text"
                  placeholder="Masukkan nama"
                  value={values.nama}
                  onChange={handleChange}
                  isInvalid={touched.nama && !!errors.nama}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nama}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationIdDokter" className="mb-3">
                <Form.Label>Id Dokter</Form.Label>
                <Form.Control
                  name="idDokter"
                  type="text"
                  placeholder="Masukkan Id Dokter"
                  value={values.idDokter}
                  onChange={handleChange}
                  isInvalid={touched.idDokter && !!errors.idDokter}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.idDokter}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationSpesialis" className="mb-3">
                <Form.Label>Spesialis</Form.Label>
                <Form.Select
                  name="spesialis"
                  value={values.spesialis}
                  onChange={handleChange}
                  isInvalid={touched.spesialis && !!errors.spesialis}
                >
                  <option value="">Pilih Spesialis</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="general">General</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.spesialis}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationJadwalDokter" className="mb-3">
                <Form.Label>Jadwal Dokter</Form.Label>
                {/* Gunakan Form.Control dengan type="date" sebagai tanggal picker */}
                <Form.Control
                  name="jadwalDokter"
                  type="date"
                  value={values.jadwalDokter}
                  onChange={handleChange}
                  isInvalid={touched.jadwalDokter && !!errors.jadwalDokter}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.jadwalDokter}
                </Form.Control.Feedback>
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
                    onClick={handleAdd}
                  >
                    Tambahkan
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

export default Add;