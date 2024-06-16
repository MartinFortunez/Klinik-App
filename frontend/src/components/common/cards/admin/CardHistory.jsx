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
    status,
    tgl_konsul,
    nama_dokter,
    spesialis,
    sesi,
  } = data;

  // Function to safely format date or return empty string if invalid
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return ""; // Invalid date
      return format(date, "dd/MM/yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  const formattedDateTglKonsul = formatDate(tgl_konsul);
  const formattedDateTglLahir = formatDate(tgl_lahir);

  const [showSendModal, setShowSendModal] = useState(false);

  const handleSendClose = () => setShowSendModal(false);
  const handleSendShow = () => setShowSendModal(true);

  const onSubmit = async () => {
    try {
      const response = await api(
        "post",
        `riwayat/send-whatsapp/${konsul_id}`,
        ""
      );
      // Redirect to WhatsApp URL
      window.location.href = response.url;
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }
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
              <span>{formattedDateTglKonsul}</span>
            </Col>
          </Row>
          <Row>
            <Card.Subtitle className="opacity-50">NIK</Card.Subtitle>
            <Card.Text>{nik}</Card.Text>
          </Row>
          <Row>
            <Col md={4}>
              <Card.Subtitle className="opacity-50">Nama</Card.Subtitle>
              <Card.Text>{nama_pasien}</Card.Text>
            </Col>
            <Col
              xs={12}
              md={8}
              className="d-flex mt-3 mt-md-0 gap-2 align-items-lg-center justify-content-md-between"
            >
              <Col className="text-md-center">
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
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card.Subtitle className="opacity-50">Alamat</Card.Subtitle>
              <Card.Text>{alamat}</Card.Text>
            </Col>
            <Col
              xs={12}
              md={8}
              className="d-flex mt-3 mt-md-0 gap-2 align-items-lg-center justify-content-md-between"
            >
              <Col className="text-md-center">
                <Card.Subtitle className="opacity-50">
                  Tanggal Lahir
                </Card.Subtitle>
                <Card.Text>{formattedDateTglLahir}</Card.Text>
              </Col>
              <Col className="text-end">
                <Card.Subtitle className="opacity-50">No.Hp/Wa</Card.Subtitle>
                <Card.Text>{no_wa}</Card.Text>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column">
              <Card.Text className="fw-bold mb-0">Dokter</Card.Text>
              <span className="custom-underline"></span>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              md={8}
              className="d-flex gap-2 align-items-lg-center justify-content-md-between"
            >
              <Col>
                <Card.Subtitle className="opacity-50">Dokter</Card.Subtitle>
                <Card.Text>{nama_dokter}</Card.Text>
              </Col>
              <Col className="text-md-center text-end">
                <Card.Subtitle className="opacity-50">Spesialis</Card.Subtitle>
                <Card.Text>{spesialis}</Card.Text>
              </Col>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
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
