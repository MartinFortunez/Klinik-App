import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Send from "../../admin/history/Send";
import { api } from "../../../../api/api";
import { format } from "date-fns";

const CardHistory = ({ data }) => {
  const {
    konsul_id,
    nik,
    nama_pasien,
    alamat,
    gol_darah,
    tgl_lahir,
    jenis_kelamin,
    no_wa,
    tgl_tenggat,
    status,
    tgl_konsul,
    nama_dokter,
    spesialis,
    sesi,
  } = data;
  const [showSendModal, setShowSendModal] = useState(false);

  const handleSendClose = () => setShowSendModal(false);
  const handleSendShow = () => setShowSendModal(true);

  const onSubmit = async () => {
    try {
      const respons = await api(
        "post",
        `riwayat/send-whatsapp/${konsul_id}`,
        ""
      );
      // Redirect to WhatsApp URL
      window.location.href = respons.url;
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }
  };

  const formattedDate = format(new Date(tgl_konsul), "dd/MM/yyyy");

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
              <span>{formattedDate}</span>
            </Col>
          </Row>
          <Row>
            <Card.Subtitle className="opacity-50">NIK</Card.Subtitle>
            <Card.Text>{nik}</Card.Text>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Nama</Card.Subtitle>
              <Card.Text>{nama_pasien}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">
                Jenis Kelamin
              </Card.Subtitle>
              <Card.Text>{jenis_kelamin}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">
                Golongan Darah
              </Card.Subtitle>
              <Card.Text>{gol_darah}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Alamat</Card.Subtitle>
              <Card.Text>{alamat}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">
                Tanggal Lahir
              </Card.Subtitle>
              <Card.Text>{tgl_lahir}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">
                No. HP/WhatsApp
              </Card.Subtitle>
              <Card.Text>{no_wa}</Card.Text>
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
              <Card.Text>{nama_dokter}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">Spesialis</Card.Subtitle>
              <Card.Text>{spesialis}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">Sesi</Card.Subtitle>
              <Card.Text>{sesi}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        {status === "complete" && (
          <Card.Footer className="bg-transparent d-flex justify-content-end gap-2">
            <Button
              variant="primary"
              onClick={handleSendShow}
              className="text-light"
            >
              Kirim
            </Button>
            <Send
              show={showSendModal}
              handleClose={handleSendClose}
              handleSend={onSubmit}
            />
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

export default CardHistory;
