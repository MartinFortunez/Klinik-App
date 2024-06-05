import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CardFacilities from "../../cards/admin/CardFacilities";
import Add from "./Add";
import axios from "axios";
import { useQuery } from "react-query";

const fetchData = async () => {
  const response = await axios.get("http://localhost:3000/dashboard/fasilitas");
  return response.data;
};

const Facilities = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data, isSuccess } = useQuery("fasilitasData", fetchData, {
    refetchOnWindowFocus: false, // Tidak merender ulang data saat jendela browser mendapatkan fokus
    refetchOnMount: false, // Tidak merender ulang data saat komponen dipasang
    staleTime: Infinity, // Data tidak dianggap kadaluwarsa
  });

  console.log(data);
  const handleAddeClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  const handleAdd = () => {};

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
            handleClose={handleAddeClose}
            handleAdd={handleAdd}
          />
        </Col>
      </Row>
      <Row xs={1} lg={2} className="gx-3 gy-4 overflow-y-auto m-0 h-100">
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
