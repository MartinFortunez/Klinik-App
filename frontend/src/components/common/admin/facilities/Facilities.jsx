import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CardFacilities from "../../cards/admin/CardFacilities";
import Add from "./Add";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchData = async () => {
  const response = await axios.get("http://localhost:3000/dashboard/fasilitas");
  return response.data;
};

const Facilities = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery("fasilitasData", fetchData, {
    refetchOnWindowFocus: false, // Tidak merender ulang data saat jendela browser mendapatkan fokus
    refetchOnMount: false, // Tidak merender ulang data saat komponen dipasang
    staleTime: Infinity, // Data tidak dianggap kadaluwarsa
  });

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("foto_fasilitas", values.imageFile);
      formData.append("judul", values.title);
      formData.append("deskripsi", values.description);

      await axios.post(
        "http://localhost:3000/dashboard/fasilitas/add",
        formData
      );
      queryClient.invalidateQueries("fasilitasData");
      handleAddClose();
    } catch (error) {
      console.error("Failed to add facility:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Fasilitas Tersedia</h2>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={handleAddShow}
            className="text-light fw-semibold"
          >
            Tambah
          </Button>
          <Add
            show={showAddModal}
            handleClose={handleAddClose}
            handleAdd={handleSubmit}
          />
        </Col>
      </Row>
      <Row xs={1} lg={2} className="gx-3 gy-4 overflow-y-auto m-0">
        {data ? (
          data.map((item) => (
            <CardFacilities key={item.fasilitas_id} data={item} />
          ))
        ) : (
          <p>loading bolo</p>
        )}
      </Row>
    </Container>
  );
};

export default Facilities;