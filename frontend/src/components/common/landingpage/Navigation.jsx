import React, { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./Login";
import "../../../sass/custom.scss";
import { useNavigate } from "react-router-dom";
import { HospitalFill } from "react-bootstrap-icons";

const Navigation = () => {
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Function to handle showing the modal
  const handleShowModal = () => setShowModal(true);

  // Function to handle hiding the modal    icon: <HospitalFill />,
  const handleCloseModal = () => setShowModal(false);

  const [token] = useState(localStorage.getItem("token"));

  // Function to handle login button click
  const handleLoginClick = () => {
    if (!token) {
      handleShowModal();
    } else {
      // Redirect to admin dashboard or perform any other action
      navigate("/admin/konsultasi-masuk");
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="custom-nav px-2 px-md-3 px-lg-5  navbar-dark"
    >
      <Container fluid>
        <Navbar.Brand href="#Hero" className="d-flex align-items-end gap-2">
          <HospitalFill size={32} />
          <span className="fw-bold fs-5 d-none d-md-block">Klinik App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="#Hero" className="text-light">
              Beranda
            </Nav.Link>
            <Nav.Link eventKey={2} href="#About" className="text-light">
              Tentang Kami
            </Nav.Link>
            <Nav.Link eventKey={4} href="#Doctor" className="text-light">
              Jadwal Dokter
            </Nav.Link>
            <Nav.Link eventKey={3} href="#Facilities" className="text-light">
              Fasilitas
            </Nav.Link>
            <Nav.Link eventKey={5} href="#Feedback" className="text-light">
              Ulasan
            </Nav.Link>
          </Nav>
          <Nav className="ms-lg-3 mt-3 mt-lg-0">
            <Button
              variant="primary"
              onClick={handleLoginClick}
              className="bg-light text-primary fw-semibold"
            >
              Login Admin
            </Button>
          </Nav>
          <Login show={showModal} handleClose={handleCloseModal} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
