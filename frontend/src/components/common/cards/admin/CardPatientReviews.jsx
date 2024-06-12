import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Reject from "../../admin/patientReviews/Reject";
import Accept from "../../admin/patientReviews/Accept";
import { BsStarFill } from "react-icons/bs";

const CardPatientReviews = ({ data }) => {
  const { ulasan_id, nik, nama_pasien, penilaian, tgl_ulasan, rating, status } =
    data;
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const yellowStars = Math.floor(rating);
  const whiteStars = 5 - yellowStars;

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
              <Card.Text>{nik}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">
                Tanggal Ulasan
              </Card.Subtitle>
              <Card.Text>{tgl_ulasan}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Nama</Card.Subtitle>
              <Card.Text>{nama_pasien}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Penilaian</Card.Subtitle>
              <Card.Text>{penilaian}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <Card.Subtitle className="opacity-50">Rating</Card.Subtitle>
              <div className="stars-container">
                <div className="stars">
                  {[...Array(yellowStars)].map((_, index) => (
                    <BsStarFill key={index} className="text-primary" />
                  ))}
                  {[...Array(whiteStars)].map((_, index) => (
                    <BsStarFill
                      key={index + yellowStars}
                      className="text-secondary"
                    />
                  ))}
                </div>
              </div>
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
