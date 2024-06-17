import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Delete from "../../admin/doctor/Delete";
import Edit from "../../admin/doctor/Edit";
import { useQueryClient } from "react-query";
import { handleDelete } from "../../../../utils/handleFunction";
import { toast } from "react-toastify";

const CardDoctor = ({ data }) => {
  const { dokter_id, sip, nama_dokter, spesialis, foto_dokter } = data;
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await handleDelete(
        "delete",
        `dokter-klinik/delete/${dokter_id}`,
        queryClient,
        "doctorData"
      );
      // Display toast notification upon successful deletion
      toast.success("Berhasil menghapus dokter!");
    } catch (error) {
      toast.error(
        "Gagal menghapus dokter. Dokter ini digunakan pada data lain!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);

  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = () => setShowEditModal(true);

  return (
    <Col>
      <Card>
        <Card.Body className="d-flex flex-column gap-3">
          <Row className="align-items-center">
            <Col xs="auto">
              <Card.Img
                variant="left"
                src={`data:image/jpeg;base64,${foto_dokter}`}
                className="custom-card-img"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col>
              <Card.Subtitle className="opacity-50">Nama</Card.Subtitle>
              <Card.Text>{nama_dokter}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">SIP Dokter</Card.Subtitle>
              <Card.Text>{sip}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Spesialis</Card.Subtitle>
              <Card.Text>{spesialis}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-transparent d-flex justify-content-end gap-2">
          <Button variant="outline-danger" onClick={handleDeleteShow}>
            Hapus
          </Button>
          <Button
            variant="primary"
            onClick={handleEditShow}
            className="text-light"
          >
            Edit
          </Button>
          <Delete
            show={showDeleteModal}
            handleClose={handleDeleteClose}
            handleDelete={onDelete}
            data={data}
            isLoading={isLoading}
          />

          <Edit
            show={showEditModal}
            handleClose={handleEditClose}
            data={data}
          />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardDoctor;
