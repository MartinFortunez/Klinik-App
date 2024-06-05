import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Delete from "../../admin/doctorsSchedule/Delete";
import Edit from "../../admin/doctorsSchedule/Edit";

const CardDoctorsSchedule = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);

  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = () => setShowEditModal(true);

  const handleDelete = () => {
    // Lakukan aksi delete di sini
    console.log("Item deleted");
    handleDeleteClose();
  };

  const handleSave = (formData) => {
    // Lakukan aksi simpan di sini
    console.log("Form data saved:", formData);
    handleEditClose();
  };
  return (
    <Col>
      <Card>
      <Card.Body className="d-flex flex-column gap-3">
          <Row>
            <Col className="d-flex flex-column">
              <Card.Subtitle className="opacity-50">Nama Dokter</Card.Subtitle>
              <Card.Text>Nama Dokter</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">
                Id Dokter
              </Card.Subtitle>
              <Card.Text>Id Dokter</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">
                Spesialisasi
              </Card.Subtitle>
              <Card.Text>Spesialisasi</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">
                Jadwal Dokter
              </Card.Subtitle>
              <Card.Text>Jadwal Dokter</Card.Text>
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
            handleDelete={handleDelete}
          />

          <Edit
            show={showEditModal}
            handleClose={handleEditClose}
            handleSave={handleSave}
          />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardDoctorsSchedule;
