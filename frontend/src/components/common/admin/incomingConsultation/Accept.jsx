import React, { useState } from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useQueryClient } from "react-query";
import { api } from "../../../../api/api";
import { toast } from "react-toastify";

const Accept = ({ data, show, handleClose }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      api("put", `jadwal-konsultasi/${data}/setuju`, "");
      await queryClient.invalidateQueries("reminderData");
      await queryClient.invalidateQueries("konsultasiMasukData");

      // Menunggu hingga refetch selesai
      await queryClient.refetchQueries("reminderData");
      await queryClient.refetchQueries("konsultasiMasukData");
      handleClose();
      // Display toast notification upon successful addition
      toast.success("Berhasil menerima Konsultasi!");
    } catch (error) {
      console.error("Error adding doctor:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
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
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : "Terima"}
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default Accept;
