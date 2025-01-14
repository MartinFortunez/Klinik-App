import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Modal, Row, Spinner } from "react-bootstrap";
import * as yup from "yup";
import { useQueryClient } from "react-query";
import { handleSubmit } from "../../../../utils/handleFunction";
import { formDataFacilities } from "../../../../utils/body";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  imageFile: yup.mixed().required("Gambar/foto wajib diisi"),
  title: yup.string().required("Judul wajib diisi"),
  description: yup.string().required("Deskripsi wajib diisi"),
});

const Edit = ({ show, handleClose, data }) => {
  const { fasilitas_id, foto_fasilitas, judul, deskripsi } = data;
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    if (show && titleRef.current) {
      titleRef.current.focus();
    }
  }, [show]);

  const onSubmit = (values, actions) => {
    setIsLoading(true);
    try {
      handleSubmit(
        "put",
        `fasilitas/edit/${fasilitas_id}`,
        formDataFacilities(values),
        actions,
        handleClose,
        queryClient,
        "fasilitasData"
      );
      toast.success("Berhasil ubah fasilitas!");
    } catch (error) {
      console.error("Error adding facility:", error);
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
        <Modal.Title>Edit Fasilitas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          initialValues={{
            imageFile: foto_fasilitas,
            title: judul,
            description: deskripsi,
          }}
        >
          {({
            handleSubmit,
            values,
            touched,
            errors,
            handleChange,
            setFieldValue,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {values.imageFile === foto_fasilitas ? (
                <div className="mb-3">
                  <Image
                    src={`data:image/jpeg;base64, ${foto_fasilitas}`}
                    thumbnail
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <Image
                    src={URL.createObjectURL(values.imageFile)}
                    thumbnail
                  />
                </div>
              )}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Gambar</Form.Label>
                <Form.Control
                  type="file"
                  name="imageFile"
                  onChange={(e) =>
                    setFieldValue("imageFile", e.target.files[0])
                  }
                  isInvalid={!!errors.imageFile}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.imageFile}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationUsername" className="mb-3">
                <Form.Label>title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Masukkan judul fasilitas"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={touched.title && !!errors.title}
                  ref={titleRef}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationPassword" className="mb-3">
                <Form.Label>description</Form.Label>
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
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Simpan"
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
