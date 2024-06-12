import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CardDoctorsSchedule from "../../cards/admin/CardDoctorsSchedule";
import Add from "./Add";

const DoctorsSchedule = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddeClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  const handleAdd = () => {
    console.log("Item deleted");
    handleAddeClose();
  };

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Jadwal Dokter</h2>
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
        <CardDoctorsSchedule />
        <CardDoctorsSchedule />
        <CardDoctorsSchedule />
        <CardDoctorsSchedule />
        <CardDoctorsSchedule />
        <CardDoctorsSchedule />
        <CardDoctorsSchedule />
        <CardDoctorsSchedule />
      </Row>
    </Container>
  );
};

export default DoctorsSchedule;
