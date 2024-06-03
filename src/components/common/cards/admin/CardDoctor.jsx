import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Delete from "../../admin/doctor/Delete";
import Edit from "../../admin/doctor/Edit";

const CardDoctor = () => {
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
      <Card className="border-0 d-flex flex-column">
        <div className="d-flex flex-row align-items-center">
        <Card.Img
          variant="left"
          src="holder.js/100px100"
          className="custom-card-img"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column gap-3">
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Nama</Card.Subtitle>
              <Card.Text>Mimi Peri</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">
                Id Dokter
              </Card.Subtitle>
              <Card.Text>658264657973</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">
                Spesialis
              </Card.Subtitle>
              <Card.Text>Jantung</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        </div>
        <Card.Footer className="bg-transparent d-flex justify-content-end gap-2 mt-auto">
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

export default CardDoctor;
