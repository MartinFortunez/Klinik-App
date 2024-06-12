import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Accept = ({ data, show, handleClose }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (konsulId) =>
      axios.put(
        `http://localhost:3000/dashboard/jadwal-konsultasi/${konsulId}/setuju`
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("konsultasiMasukData");
        handleClose();
      },
    }
  );

  const handleAccept = () => {
    mutate(data);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Terima Konsultasi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin untuk menerima pengajuan konsultasi?
      </Modal.Body>
      <Modal.Footer as={Row} className="border-0">
        <Col>
          <Button
            variant="secondary"
            className="w-100 bg-transparent border-0"
            onClick={handleClose}
          >
            Batal
          </Button>
        </Col>
        <Col>
          <Button
            variant="primary"
            className="w-100 text-light"
            onClick={handleAccept}
          >
            Terima
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default Accept;
