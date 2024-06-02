import React, { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import Delete from "../../admin/facilities/Delete";
import Edit from "../../admin/facilities/Edit";

const CardFacilities = () => {
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
      <Card className="border-0">
        <Card.Img
          variant="top"
          src="holder.js/100px180"
          className="custom-card-img"
        />
        <Card.Body>
          <Card.Title className="text-primary">Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <Card.Footer className="bg-transparent border-0 d-flex justify-content-end gap-2">
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

export default CardFacilities;
