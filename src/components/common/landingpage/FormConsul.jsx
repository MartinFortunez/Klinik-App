import { Formik } from "formik";
import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

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
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
        // validationSchema={validationSchema}
        // onSubmit={console.log("submit")}
        // initialValues={{
        //   username: "",
        //   password: "",
        // }}
        >
          {({ handleSubmit, values, touched, errors, handleChange }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="d-flex flex-column gap-2"
            >
              <Form.Group>
                <Form.Group controlId="validationUsername" className="mb-3">
                  <Form.Label>NIK</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Username"
                    // value={values.username}
                    // onChange={handleChange}
                    // isValid={touched.username && !errors.username}
                    // isInvalid={touched.username && !!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {/* {errors.username} */}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationUsername" className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Username"
                    // value={values.username}
                    // onChange={handleChange}
                    // isValid={touched.username && !errors.username}
                    // isInvalid={touched.username && !!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {/* {errors.username} */}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationUsername" className="mb-3">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Username"
                    // value={values.username}
                    // onChange={handleChange}
                    // isValid={touched.username && !errors.username}
                    // isInvalid={touched.username && !!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {/* {errors.username} */}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationUsername" className="mb-3">
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Username"
                    // value={values.username}
                    // onChange={handleChange}
                    // isValid={touched.username && !errors.username}
                    // isInvalid={touched.username && !!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {/* {errors.username} */}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationUsername" className="mb-3">
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Username"
                    // value={values.username}
                    // onChange={handleChange}
                    // isValid={touched.username && !errors.username}
                    // isInvalid={touched.username && !!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {/* {errors.username} */}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationUsername" className="mb-3">
                  <Form.Label>Golongan Darah</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Username"
                    // value={values.username}
                    // onChange={handleChange}
                    // isValid={touched.username && !errors.username}
                    // isInvalid={touched.username && !!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {/* {errors.username} */}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationUsername" className="mb-3">
                  <Form.Label>No Hp / WhatsApp</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Username"
                    // value={values.username}
                    // onChange={handleChange}
                    // isValid={touched.username && !errors.username}
                    // isInvalid={touched.username && !!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {/* {errors.username} */}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-semibold">Pilih Dokter</Form.Label>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="validationUsername"
                    className="mb-3"
                  >
                    <Form.Label>Spesialis</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Pilih Spesialis</option>
                      <option value="1">Spesialis 1</option>
                      <option value="2">Spesialis 2</option>
                      <option value="3">Spesialis 3</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="validationUsername"
                    className="mb-3"
                  >
                    <Form.Label>Dokter</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Pilih Dokter</option>
                      <option value="1">Dokter 1</option>
                      <option value="2">Dokter 2</option>
                      <option value="3">Dokter 3</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId="validationUsername"
                    className="mb-3"
                  >
                    <Form.Label>Sesi</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option>Pilih Sesi</option>
                      <option value="1">Sesi 1</option>
                      <option value="2">Sesi 2</option>
                      <option value="3">Sesi 3</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Button
                    variant="secondary"
                    type="button"
                    className="w-100 bg-transparent border-0"
                    onClick={props.onHide}
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
                    Login
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
