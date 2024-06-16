import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Delete from "../../admin/doctorsSchedule/Delete";
import Edit from "../../admin/doctorsSchedule/Edit";
import { useQueryClient } from "react-query";
import { handleDelete } from "../../../../utils/handleFunction";
import { toast } from "react-toastify";

const CardDoctorsSchedule = ({ data, dataDoctor }) => {
  const { jadwal_id, sesi, nama_dokter, spesialis } = data;
  const queryClient = useQueryClient();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);

  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = () => setShowEditModal(true);

  const onDelete = async () => {
    try {
      await handleDelete(
        "delete",
        `jadwal-dokter-spesialis/delete/${jadwal_id}`,
        queryClient,
        "jadwalDokterData"
      );
      toast.success("Berhasil menghapus jadwal dokter!");
    } catch (error) {
      toast.error("Gagal menghapus jadwal dokter!");

      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <Col>
      <Card>
        <Card.Body className="d-flex flex-column gap-3">
          <Row>
            <Col
              xs={12}
              md={8}
              className="d-flex mt-md-0 gap-2 align-items-lg-center justify-content-md-between"
            >
              <Col className="text-start">
                <Card.Subtitle className="opacity-50">
                  Nama Dokter
                </Card.Subtitle>
                <Card.Text>{nama_dokter}</Card.Text>
              </Col>
              <Col className="text-md-center text-end">
                <Card.Subtitle className="opacity-50">
                  Spesialisasi
                </Card.Subtitle>
                <Card.Text>{spesialis}</Card.Text>
              </Col>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Card.Subtitle className="opacity-50">
                Jadwal Dokter
              </Card.Subtitle>
              <Card.Text>{sesi}</Card.Text>
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
          />

          <Edit
            show={showEditModal}
            handleClose={handleEditClose}
            data={data}
            dataDoctor={dataDoctor}
          />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardDoctorsSchedule;
