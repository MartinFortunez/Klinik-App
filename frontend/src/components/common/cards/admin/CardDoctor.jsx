import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Delete from "../../admin/doctor/Delete";
import Edit from "../../admin/doctor/Edit";
import axios from "axios";
import { useQueryClient } from "react-query";

const deleteDoctor = async (doctorId) => {
  try {
    await axios.delete(
      `http://localhost:3000/dashboard/dokter-klinik/delete/${doctorId}`
    );
  } catch (error) {
    throw new Error("Failed to delete facility");
  }
};

const CardDoctor = ({ data }) => {
  const { dokter_id, sip, nama_dokter, spesialis, foto_dokter } = data;
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      console.log("delete");
      await deleteDoctor(dokter_id);
      queryClient.invalidateQueries("dokterData"); // Memicu refetch setelah menghapus data
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
      <Card className="border-0 d-flex flex-column">
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <Card.Img
                variant="left"
                src={`data:image/jpeg;base64,${foto_dokter}`}
                className="custom-card-img"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </Col>
            <Col>
              <Card.Subtitle className="opacity-50">Nama</Card.Subtitle>
              <Card.Text>{nama_dokter}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">Id Dokter</Card.Subtitle>
              <Card.Text>{sip}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">Spesialis</Card.Subtitle>
              <Card.Text>{spesialis}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-transparent d-flex justify-content-end gap-2">
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

export default CardDoctor;
