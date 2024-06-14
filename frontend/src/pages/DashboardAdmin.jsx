import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/common/admin/SideBar";
import Topbar from "../components/common/admin/Topbar";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

const DashboardAdmin = () => {
  useEffect(() => {
    // Ambil token dari local storage
    const token = localStorage.getItem("token");
    // Atur header Authorization jika token ada
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Container fluid className="p-0 m-0 vh-100 g-0">
      <Row className="p-0 m-0">
        <Col xs="auto" lg={2} id="sidebar-wrapper" className="p-0 m-0">
          <SideBar onLogout={handleLogout} />
        </Col>
        <Col
          xs
          lg={10}
          id="page-content-wrapper"
          className="d-flex flex-column vh-100 p-0 m-0"
        >
          <Topbar />
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardAdmin;
