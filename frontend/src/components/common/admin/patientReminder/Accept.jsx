import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useQueryClient } from "react-query";
import { api } from "../../../../api/api";
import { toast } from "react-toastify";

const Accept = ({ data, show, handleClose }) => {
  const { konsul_id, nama_pasien } = data;
  const queryClient = useQueryClient();

  const onSubmit = async () => {
    try {
      api("put", `jadwal-konsultasi/${konsul_id}/complete`, "");
      await queryClient.invalidateQueries("reminderData");
      await queryClient.invalidateQueries("riwayatData");

      // Menunggu hingga refetch selesai
      await queryClient.refetchQueries("reminderData");
      await queryClient.refetchQueries("riwayatData");
      handleClose();
      // Display toast notification upon successful addition
      toast.success("Berhasil konfirmasi konsultasi telah dilakukan!");
    } catch (error) {
      console.error("Error confirm consul:", error);
      // Handle error
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Konfirmasi Konsultasi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Konfirmasi jika konsultasi telah dilakukan oleh {nama_pasien}
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
            onClick={onSubmit}
          >
            Konfirmasi
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default Accept;
