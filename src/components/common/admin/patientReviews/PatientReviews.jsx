import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardPatientReviews from "../../cards/admin/CardPatientReviews";

const PatientReviews = () => {
  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Ulasan Pasien</h2>
        </Col>
      </Row>
      <Row xs={1} md={2} className="gx-3 gy-4 overflow-y-scroll m-0">
        <CardPatientReviews />
        <CardPatientReviews />
        <CardPatientReviews />
        <CardPatientReviews />
        <CardPatientReviews />
        <CardPatientReviews />
      </Row>
    </Container>
  );
};

export default PatientReviews;
