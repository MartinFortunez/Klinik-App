import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CardFacilities from "../../cards/admin/CardFacilities";
import Add from "./Add";

const Facilities = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddeClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  const handleAdd = () => {};

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Fasilitas Tersedia</h2>
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
      <Row xs={1} lg={2} className="gx-3 gy-4 overflow-y-scroll m-0">
        <CardFacilities />
        <CardFacilities />
        <CardFacilities />
        <CardFacilities />
        <CardFacilities />
        <CardFacilities />
        <CardFacilities />
      </Row>
    </Container>
  );
};

export default Facilities;
