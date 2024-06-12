import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardHistory from "../../cards/admin/CardHistory";

const History = () => {
  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Riwayat</h2>
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-scroll m-0">
        <CardHistory />
        <CardHistory />
        <CardHistory />
        <CardHistory />
      </Row>
    </Container>
  );
};

export default History;
