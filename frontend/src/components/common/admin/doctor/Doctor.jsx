import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CardDoctor from "../../cards/admin/CardDoctor";
import Add from "./Add";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchData = async () => {
  const response = await axios.get("http://localhost:3000/dashboard/dokter-klinik");
  return response.data;
};

const Doctor = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery("dokterData", fetchData, {
    refetchOnWindowFocus: false, // Tidak merender ulang data saat jendela browser mendapatkan fokus
    refetchOnMount: false, // Tidak merender ulang data saat komponen dipasang
    staleTime: Infinity, // Data tidak dianggap kadaluwarsa
  });

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("foto_dokter", values.imageFile);
      formData.append("nama_dokter", values.namaDokter);
      formData.append("sip", values.sip);
      formData.append("spesialis", values.spesialis);

      await axios.post(
        "http://localhost:3000/dashboard/dokter-klinik/add",
        formData
      );
      queryClient.invalidateQueries("dokterData");
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
          <h2>Data Dokter</h2>
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
      <Row xs={1} className="gx-3 gy-4 overflow-y-scroll m-0">
      {data ? (
          data.map((item) => (
            <CardDoctor key={item.dokter_id} data={item} />
          ))
        ) : (
          <p>loading bolo</p>
        )}
      </Row>
    </Container>
  );
};

export default Doctor;
