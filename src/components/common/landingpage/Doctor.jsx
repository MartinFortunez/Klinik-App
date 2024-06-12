import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardDoctor from "../cards/landingpage/CardDoctor.jsx";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import styled from 'styled-components';

const fetchDataDokter = async () => {
  const response = await axios.get(
    "http://localhost:3000/dashboard/dokter-klinik"
  );
  return response.data;
};

const Doctor = () => {
  const { data, isSuccess } = useQuery("dokterData", fetchDataDokter, {
    refetchOnWindowFocus: false, // Tidak merender ulang data saat jendela browser mendapatkan fokus
    refetchOnMount: false, // Tidak merender ulang data saat komponen dipasang
    staleTime: Infinity, // Data tidak dianggap kadaluwarsa
  });
  console.log(data);

  const CustomRow = styled(Row)`
  text-align: center;

  @media (max-width: 576px) {
    text-align: left;
    padding-left: 20px;
  }
`;

  return (
    <Container fluid className="py-5">
      <CustomRow>
      <h1 className="text-primary">Jadwal Praktek Dokter</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur. Ullamcorper vulputate non in
        lorem adipiscing tempor integer blandit commodo.
      </p>
    </CustomRow>

      <Row xs={1} md={2} className="g-4 p-5">
        {data ? (
          data.map((item) => (
            <Col lg={4} key={item.dokter_id}>
              <CardDoctor data={item} />
            </Col>
          ))
        ) : (
          <p>loading bolo</p>
        )}
      </Row>
    </Container>
  );
};

export default Doctor;
