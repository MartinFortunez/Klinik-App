import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardHistory from "../../cards/admin/CardHistory";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchData = async () => {
  const response = await axios.get("http://localhost:3000/dashboard/riwayat");
  return response.data;
};

const History = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery("riwayatData", fetchData, {
    refetchOnWindowFocus: false, // Tidak merender ulang data saat jendela browser mendapatkan fokus
    refetchOnMount: false, // Tidak merender ulang data saat komponen dipasang
    staleTime: Infinity, // Data tidak dianggap kadaluwarsa
  });

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Riwayat</h2>
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-scroll m-0">
        {data && data.schedules.length > 0 ? (
          data.schedules.map((item) => (
            <CardHistory key={item.konsul_id} data={item} />
          ))
        ) : data && data.schedules.length === 0 ? (
          <p>No Data</p>
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </Container>
  );
};

export default History;
