import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardIncomingConsultation from "../../cards/admin/CardIncomingConsultation";

const IncomingConsultation = () => {
  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Konsultasi Masuk</h2>
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-scroll m-0">
        <CardIncomingConsultation />
        <CardIncomingConsultation />
        <CardIncomingConsultation />
        <CardIncomingConsultation />
      </Row>
    </Container>
  );
};

export default IncomingConsultation;
