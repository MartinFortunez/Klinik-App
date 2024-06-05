import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CardDoctor from "../../cards/admin/CardDoctor";
import Add from "./Add";

const Doctor = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddeClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  const handleAdd = () => {
    // Lakukan aksi delete di sini
    console.log("Item deleted");
    handleAddeClose();
  };

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Data Dokter</h2>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={handleAddShow}
            className="text-light fw-semibold"
          >
            Tambah
          </Button>
          <Add
            show={showAddModal}
            handleClose={handleAddeClose}
            handleAdd={handleAdd}
          />
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-scroll m-0">
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
        <CardDoctor />
      </Row>
    </Container>
  );
};

export default Doctor;
