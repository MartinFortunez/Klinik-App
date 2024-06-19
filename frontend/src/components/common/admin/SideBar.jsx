import React, { useState } from "react";
import { Button, Col, Nav, Modal, Row } from "react-bootstrap";
import {
  Bell,
  BoxArrowRight,
  CalendarWeek,
  ChatLeftQuote,
  ClockHistory,
  HospitalFill,
  PersonVcard,
  PersonWheelchair,
  Send,
} from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

const SideBar = ({ onLogout }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const links = [
    {
      path: "/admin/konsultasi-masuk",
      label: "Konsultasi Masuk",
      icon: <Bell size={24} />,
    },
    {
      path: "/admin/reminder-pasien",
      label: "Reminder Pasien",
      icon: <Send size={24} />,
    },
    {
      path: "/admin/riwayat",
      label: "Riwayat",
      icon: <ClockHistory size={24} />,
    },
    {
      path: "/admin/dokter",
      label: "Dokter",
      icon: <PersonVcard size={24} />,
    },
    {
      path: "/admin/jadwal-dokter",
      label: "Jadwal Dokter",
      icon: <CalendarWeek size={24} />,
    },
    {
      path: "/admin/ulasan-pasien",
      label: "Ulasan Pasien",
      icon: <ChatLeftQuote size={24} />,
    },
    {
      path: "/admin/fasilitas",
      label: "Fasilitas",
      icon: <PersonWheelchair size={24} />,
    },
  ];

  const handleLogout = () => {
    // Close the logout modal
    setShowLogoutModal(false);
    // Perform logout action (passed from parent component)
    onLogout();
  };

  return (
    <Col className="d-flex flex-column bg-light justify-content-between px-2 px-lg-4 vh-100 pb-5">
      <Nav className="flex-column gap-2">
        <div className="logo mb-3 d-flex justify-content-center justify-content-lg-start align-items-end text-primary gap-2">
          {" "}
          <HospitalFill size={32} />
          <span className="fw-bold fs-5 d-none d-lg-block">Klinik App</span>
        </div>
        {links.map((link, index) => (
          <Nav.Item key={index}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "d-flex align-items-center nav-link bg-primary text-light rounded fw-semibold justify-content-center justify-content-lg-start"
                  : "d-flex align-items-center nav-link rounded fw-semibold justify-content-center justify-content-lg-start"
              }
            >
              <span className="me-lg-3">{link.icon}</span>
              <span className="d-none d-lg-block">{link.label}</span>
            </NavLink>
          </Nav.Item>
        ))}
      </Nav>
      <Button
        variant="danger"
        className="d-flex bg-transparent align-items-center text-danger rounded fw-semibold border-0"
        onClick={() => setShowLogoutModal(true)}
      >
        <span className="me-lg-2">
          <BoxArrowRight size={24} />
        </span>
        <span className="d-none d-lg-block">Logout</span>
      </Button>

      {/* Logout Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Konfirmasi Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin logout?</Modal.Body>
        <Modal.Footer as={Row} className="border-0">
          <Col>
            <Button
              variant="secondary"
              className="w-100 bg-transparent border-0"
              onClick={() => setShowLogoutModal(false)}
            >
              Batal
            </Button>
          </Col>
          <Col>
            <Button variant="danger" className="w-100" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default SideBar;
