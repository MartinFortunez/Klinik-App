import React, { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import Delete from "../../admin/facilities/Delete";
import Edit from "../../admin/facilities/Edit";
import axios from "axios";
import { useQueryClient } from "react-query";

const deleteFacility = async (facilityId) => {
  try {
    await axios.get(
      `http://localhost:3000/dashboard/fasilitas/delete/${facilityId}`
    );
  } catch (error) {
    throw new Error("Failed to delete facility");
  }
};

const CardFacilities = ({ data }) => {
  const { fasilitas_id, foto_fasilitas, judul, deskripsi } = data;
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      console.log("delete");
      await deleteFacility(fasilitas_id);
      queryClient.invalidateQueries("fasilitasData"); // Memicu refetch setelah menghapus data
    } catch (error) {
      console.error("Failed to delete facility:", error);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);

  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = () => setShowEditModal(true);

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
          src={`data:image/jpeg;base64,${foto_fasilitas}`}
          className="custom-card-img"
        />
        <Card.Body>
          <Card.Title className="text-primary">{judul}</Card.Title>
          <Card.Text>{deskripsi}</Card.Text>
        </Card.Body>
        <Card.Footer className="bg-transparent border-0 d-flex justify-content-end gap-2">
          <Button variant="outline-danger" onClick={handleDelete}>
            Hapus
          </Button>
          <Button
            variant="primary"
            onClick={handleEditShow}
            className="text-light"

          >
            Edit
          </Button>
          {/* <Delete
            show={showDeleteModal}
            handleClose={handleDeleteClose}
            handleDelete={handleDelete}
          /> */}

          <Edit
            show={showEditModal}
            handleClose={handleEditClose}
            handleSave={handleSave}
            data={data}
          />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardFacilities;
