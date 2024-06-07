import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Reject from "../../admin/incomingConsultation/Reject";
import Accept from "../../admin/incomingConsultation/Accept";

const CardIncomingConsultation = ({ data }) => {
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
            <Col className="d-flex flex-column">
              <Card.Text className="fw-bold mb-0">User</Card.Text>
              <span className="custom-underline"></span>
            </Col>
            <Col className="d-flex justify-content-end">
              <span>00/00/0000</span>
            </Col>
          </Row>
          <Row>
            <Card.Subtitle className="opacity-50">NIK</Card.Subtitle>
            <Card.Text>13543457349579845798475</Card.Text>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Nama</Card.Subtitle>
              <Card.Text>Mimi Peri</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">
                Jenis Kelamin
              </Card.Subtitle>
              <Card.Text>Laki-Laki</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">
                Golongan Darah
              </Card.Subtitle>
              <Card.Text>O</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Alamat</Card.Subtitle>
              <Card.Text>Kecamatan ini - Kabupaten itu</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">
                Tanggal Lahir
              </Card.Subtitle>
              <Card.Text>00/00/0000</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">
                No. HP/WhatsApp
              </Card.Subtitle>
              <Card.Text>08512345678</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column">
              <Card.Text className="fw-bold mb-0">Dokter</Card.Text>
              <span className="custom-underline"></span>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Dokter</Card.Subtitle>
              <Card.Text>Marco</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">Spesialis</Card.Subtitle>
              <Card.Text>Jantung</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">Sesi</Card.Subtitle>
              <Card.Text>1</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-transparent d-flex justify-content-end gap-2">
          <Button variant="outline-danger" onClick={handleRejectShow}>
            Tolak
          </Button>
          <Button
            variant="primary"
            onClick={handleAcceptShow}
            className="text-light"
          >
            Terima
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

export default CardIncomingConsultation;
