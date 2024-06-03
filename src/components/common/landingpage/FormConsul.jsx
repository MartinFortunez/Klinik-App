import { Formik } from "formik";
import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  NIK: yup.string().required("NIK wajib diisi"),
  nama: yup.string().required("nama wajib diisi"),
  alamat: yup.string().required("alamat wajib diisi"),
  nohp: yup.number().required("no hp wajib diisi"),
  jeniskelamin: yup.string().required("jenis kelamin wajib diisi"),
  tanggallahir: yup.string().required("tanggal lahir wajib diisi"),
  golongandarah: yup.string().required("golongan darah wajib diisi"),
  spesialis: yup.string().required("spesialis wajib diisi"),
  dokter: yup.string().required("dokter wajib diisi"),
  sesi: yup.string().required("sesi wajib diisi"),
});

function FormConsul(props) {
  return (
    <Modal
      {...props}
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
          onSubmit={console.log("submit")}
          initialValues={{
            NIK: "",
            nama: "",
            alamat: "",
            nohp: "",
            jeniskelamin: "Pilih Jenis Kelamin",
            tanggallahir: "",
            golongandarah: "",
            spesialis: "",
            dokter: "",
            sesi: "",
          }}
        >
          {({ handleSubmit, values, touched, errors, handleChange }) => (
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
                    placeholder="NIK"
                    value={values.NIK}
                    onChange={handleChange}
                    isValid={touched.NIK && !errors.NIK}
                    isInvalid={touched.NIK && !!errors.NIK}
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
                    placeholder="nama"
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
                      placeholder="masukkan alamat"
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
                      type="number"
                      placeholder="masukkan no hp"
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
                      aria-label="Default select example"
                      onChange={handleChange}

                    >
                      <option>Pilih Jenis Kelamin</option>
                      <option value="1">Laki-Laki</option>
                      <option value="2">Perempuan</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.jeniskelamin}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="validationTanggallahir"
                    className="mb-3"
                  >
                    <Form.Label>Tanggal Lahir</Form.Label>
                    <Form.Control
                      name="tanggallahir"
                      type="date"
                      value={values.tanggallahir}
                      onChange={handleChange}
                      // isValid={touched.tanggallahir && !errors.tanggallahir}
                      isInvalid={touched.tanggallahir && !!errors.tanggallahir}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.tanggallahir}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="validationGolongandarah"
                    className="mb-3"
                  >
                    <Form.Label>Golongan Darah</Form.Label>
                    <Form.Control
                      name="golongandarah"
                      type="text"
                      placeholder="masukkan golongan darah"
                      value={values.golongandarah}
                      onChange={handleChange}
                      isValid={touched.golongandarah && !errors.golongandarah}
                      isInvalid={
                        touched.golongandarah && !!errors.golongandarah
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.golongandarah}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-semibold">Pilih Dokter</Form.Label>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="validationSpesialis"
                    className="mb-3"
                  >
                    <Form.Label>Spesialis</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleChange}
                    >
                      <option>Pilih Spesialis</option>
                      <option value="1">Spesialis 1</option>
                      <option value="2">Spesialis 2</option>
                      <option value="3">Spesialis 3</option>
                    </Form.Select>
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
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleChange}
                    >
                      <option>Pilih Dokter</option>
                      <option value="1">Dokter 1</option>
                      <option value="2">Dokter 2</option>
                      <option value="3">Dokter 3</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.dokter}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId="validationSesi"
                    className="mb-3"
                  >
                    <Form.Label>Sesi</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleChange}
                    >
                      <option>Pilih Sesi</option>
                      <option value="1">Sesi 1</option>
                      <option value="2">Sesi 2</option>
                      <option value="3">Sesi 3</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.sesi}
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
                    // onClick={props.onHide}
                  >
                    Batal
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 text-light"
                    // onClick={handleLogin}
                  >
                    Kirim Konsultasi
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default FormConsul;
