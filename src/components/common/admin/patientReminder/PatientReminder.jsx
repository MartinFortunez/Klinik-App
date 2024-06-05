import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardPatientReminder from "../../cards/admin/CardPatientReminder";

const PatientReminder = () => {
  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Reminder Pasien</h2>
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-scroll m-0">
        <CardPatientReminder />
        <CardPatientReminder />
        <CardPatientReminder />
        <CardPatientReminder />
      </Row>
    </Container>
  );
};

export default PatientReminder;
