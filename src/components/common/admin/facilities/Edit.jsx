import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";

const Edit = ({ show, handleClose, handleSave }) => {
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
        <Modal.Title>Edit Fasilitas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          // validationSchema={validationSchema}
          onSubmit={console.log("submit")}
          initialValues={{
            username: "",
            password: "",
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
                <Form.Label>Upload Gambar</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>

              <Form.Group controlId="validationUsername" className="mb-3">
                <Form.Label>Judul</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Masukkan judul fasilitas"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={touched.title && !!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationPassword" className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  placeholder="Masukkan deskripsi fasilitas"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
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
                    onClick={handleSave}
                  >
                    Simpan
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
