import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
});

const Login = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const usernameRef = useRef(null);

  useEffect(() => {
    if (show && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [show]);

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/features/login`,
        {
          username: values.username,
          password: values.password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      handleClose();
      navigate("/admin/konsultasi-masuk");
      toast.success("Berhasil login!");
    } catch (error) {
      console.error("Login failed:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Username atau password salah!");
      } else {
        toast.error("Gagal login, silahkan coba lagi.");
      }
    } finally {
      setLoading(false);
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
                  ref={usernameRef}
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
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Text className="text-end d-block mb-3 text-primary">
                <Button
                  variant="link"
                  onClick={() => {
                    toast.warning(
                      "Silahkan hubungi pihak database untuk perubahan password!"
                    );
                  }}
                >
                  Lupa Password?
                </Button>
              </Form.Text>
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
                      "Login"
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

export default Login;
