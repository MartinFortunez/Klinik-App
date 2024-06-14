import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik"; // Import Formik
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
});

const Login = ({ show, handleClose }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}login`,
        {
          username: values.username,
          password: values.password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `${token}`;

      handleClose();
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
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
        <Modal.Title>Fitur ini hanya untuk admin klinik</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={(values) => handleLogin(values)}
          initialValues={{
            username: "",
            password: "",
          }}
        >
          {({ handleSubmit, values, touched, errors, handleChange }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationUsername" className="mb-3">
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && !!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationPassword" className="mb-3">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Text className="text-end d-block mb-3">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Silakan hubungi admin untuk reset password.");
                  }}
                >
                  Lupa Password?
                </a>
              </Form.Text>
              {error && <div className="text-danger">{error}</div>}{" "}
              {/* Display error message */}
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
};

export default Login;
