import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardIncomingConsultation from "../../cards/admin/CardIncomingConsultation";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchData = async () => {
  const response = await axios.get(
    "http://localhost:3000/dashboard/jadwal-konsultasi"
  );
  return response.data;
};

const IncomingConsultation = () => {
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery("konsultasiMasukData", fetchData, {
    refetchOnWindowFocus: false, // Tidak merender ulang data saat jendela browser mendapatkan fokus
    refetchOnMount: false, // Tidak merender ulang data saat komponen dipasang
    staleTime: Infinity, // Data tidak dianggap kadaluwarsa
  });

  console.log(data);

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Konsultasi Masuk</h2>
        </Col>
      </Row>
      <Row xs={1} lg={2} className="gx-3 gy-4 overflow-y-auto m-0">
        {data ? (
          data.schedules.map((item) => (
            <CardIncomingConsultation key={item.konsul_id} data={item} />
          ))
        ) : (
          <p>loading bolo</p>
        )}
      </Row>
    </Container>
  );
};

export default IncomingConsultation;
