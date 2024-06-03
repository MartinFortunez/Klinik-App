import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Reject from "../../admin/patientReviews/Reject";
import Accept from "../../admin/patientReviews/Accept";

const CardPatientReviews = () => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const handleRejectClose = () => setShowRejectModal(false);
  const handleRejectShow = () => setShowRejectModal(true);

  const handleAcceptClose = () => setShowAcceptModal(false);
  const handleAcceptShow = () => setShowAcceptModal(true);

  const handleReject = () => {
    // Lakukan aksi delete di sini
    console.log("Item deleted");
    handleRejectClose();
  };

  const handleAccept = () => {
    // Lakukan aksi simpan di sini
    handleAcceptClose();
  };
  return (
    <Col>
      <Card>
        <Card.Body className="d-flex flex-column gap-3">
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">NIK</Card.Subtitle>
              <Card.Text>6568266846216346</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">
                Tanggal Lahir
              </Card.Subtitle>
              <Card.Text>00/00/0000</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Nama</Card.Subtitle>
              <Card.Text>Mimi Peri</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Penilaian</Card.Subtitle>
              <Card.Text>Lorem ipsum dolor sit amet consectetur. Eu diam amet varius vitae tortor id eleifend ultrices potenti. At aliquam id egestas.</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-transparent d-flex justify-content-end gap-2">
          <Button variant="outline-danger" onClick={handleRejectShow}>
            Hapus
          </Button>
          <Button
            variant="primary"
            onClick={handleAcceptShow}
            className="text-light"
          >
            Tampilkan
          </Button>

          <Reject
            show={showRejectModal}
            handleClose={handleRejectClose}
            handleReject={handleReject}
          />

          <Accept
            show={showAcceptModal}
            handleClose={handleAcceptClose}
            handleAccept={handleAccept}
          />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardPatientReviews;
