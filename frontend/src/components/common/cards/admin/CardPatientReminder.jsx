import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Cancel from "../../admin/patientReminder/Cancel";
import Send from "../../admin/patientReminder/Send";
import { api } from "../../../../api/api";
import { useQueryClient } from "react-query";
import { format } from "date-fns";

const CardPatientReminder = ({ data }) => {
  const { konsul_id, nik, nama_pasien, tgl_konsul, no_wa, tgl_tenggat } = data;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const queryClient = useQueryClient();
  const formattedDateTglKonsul = format(new Date(tgl_konsul), "dd/MM/yyyy");
  const formattedDateTglTenggat = format(new Date(tgl_tenggat), "dd/MM/yyyy");

  const handleCancelClose = () => setShowCancelModal(false);
  const handleCancelShow = () => setShowCancelModal(true);

  const handleSendClose = () => setShowSendModal(false);
  const handleSendShow = () => setShowSendModal(true);

  const onCancel = async () => {
    api("put", `jadwal-konsultasi/${konsul_id}/cancel`, "");

    await queryClient.invalidateQueries("reminderData");

    // Menunggu hingga refetch selesai
    await queryClient.refetchQueries("reminderData");
    handleCancelClose();
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
            <Col>
              <Card.Subtitle className="opacity-50">Nama</Card.Subtitle>
              <Card.Text>{nama_pasien}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">
                No. HP/WhatsApp
              </Card.Subtitle>
              <Card.Text>{no_wa}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">Tengat Waktu</Card.Subtitle>
              <Card.Text>{formattedDateTglTenggat}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-transparent d-flex justify-content-end gap-2">
          <Button variant="outline-danger" onClick={handleCancelShow}>
            Batalkan Konsultasi
          </Button>
          <Button
            variant="primary"
            onClick={handleSendShow}
            className="text-light"
          >
            Kirim
          </Button>

          <Cancel
            show={showCancelModal}
            handleClose={handleCancelClose}
            handleCancel={onCancel}
          />

          <Send
            show={showSendModal}
            handleClose={handleSendClose}
            data={data}
          />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardPatientReminder;
