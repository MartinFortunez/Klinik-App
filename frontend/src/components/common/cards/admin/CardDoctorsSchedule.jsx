import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Delete from "../../admin/doctorsSchedule/Delete";
import Edit from "../../admin/doctorsSchedule/Edit";
import axios from "axios";

import { useQueryClient } from "react-query";

const deleteDoctorSchedule = async (jadwalId) => {
  console.log(jadwalId);
  try {
    await axios.delete(
      `http://localhost:3000/dashboard/jadwal-dokter-spesialis/delete/${jadwalId}`
    );
  } catch (error) {
    throw new Error(error);
  }
};

const CardDoctorsSchedule = ({ data, dataDoctor }) => {
  const { dokter_id, jadwal_id, sesi, nama_dokter, spesialis } = data;
  const queryClient = useQueryClient();
  console.log(jadwal_id);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);

  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = () => setShowEditModal(true);

  const handleDelete = async () => {
    try {
      console.log("delete");
      await deleteDoctorSchedule(jadwal_id);
      queryClient.invalidateQueries("jadwalDokterData"); // Memicu refetch setelah menghapus data
    } catch (error) {
      console.error("Failed to delete schedule:", error);
    }
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
              <Card.Subtitle className="opacity-50">Id Dokter</Card.Subtitle>
              <Card.Text>{dokter_id}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">Nama Dokter</Card.Subtitle>
              <Card.Text>{nama_dokter}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">Spesialisasi</Card.Subtitle>
              <Card.Text>{spesialis}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">
                Jadwal Dokter
              </Card.Subtitle>
              <Card.Text>{sesi}</Card.Text>
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
            dataDoctor={dataDoctor}
          />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardDoctorsSchedule;
