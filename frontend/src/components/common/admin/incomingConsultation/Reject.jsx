import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Reject = ({ data, show, handleClose }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (konsulId) =>
      axios.put(
        `http://localhost:3000/dashboard/jadwal-konsultasi/${konsulId}/tolak`
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("konsultasiMasukData");
        handleClose();
      },
    }
  );

  const handleReject = () => {
    mutate(data);
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Tolak Konsultasi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin untuk menolak pengajuan konsultasi secara permanen?
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
          <Button variant="danger" className="w-100" onClick={handleReject}>
            Tolak
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default Reject;
