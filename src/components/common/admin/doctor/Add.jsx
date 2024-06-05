import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  nama: yup.string().required("nama wajib diisi"),
  iddokter : yup.string().required("id dokter wajib diisi"),
  spesialis : yup.string().required("spesialis wajib diisi"),
});

const Add = ({ show, handleClose, handleAdd }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
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
        <Modal.Title>Tambah Data Dokter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={console.log("submit")}
          initialValues={{
            nama: "",
            iddokter: "",
            spesialis: "",
          }}
        >
          {({ handleSubmit, values, touched, errors, handleChange }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {previewUrl && (
                <div className="mb-3">
                  <Image src={previewUrl} thumbnail />
                </div>
              )}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Foto</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>

              <Form.Group controlId="validationNama" className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  name="nama"
                  type="text"
                  placeholder="Masukkan nama"
                  value={values.nama}
                  onChange={handleChange}
                  isValid={touched.nama && !!errors.nama}
                  isInvalid={touched.nama && !!errors.nama}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nama}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationIddokter" className="mb-3">
                <Form.Label>Id Dokter</Form.Label>
                <Form.Control
                  name="iddokter"
                  type="text"
                  placeholder="Masukkan id dokter"
                  value={values.iddokter}
                  onChange={handleChange}
                  isValid={touched.iddokter && !!errors.iddokter}
                  isInvalid={touched.iddokter && !!errors.iddokter}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.iddokter}
                </Form.Control.Feedback>
              <Form.Group controlId="validationSpesialis" className="mb-3">
                <Form.Label>Spesialis</Form.Label>
                <Form.Select
                      aria-label="Default select example"
                      onChange={handleChange}
                      isValid={touched.spesialis && !!errors.spesialis}
                      isInvalid={touched.spesialis && !!errors.spesialis}
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
                    // onClick={handleAdd}
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
