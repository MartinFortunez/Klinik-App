import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import CardFacilities from "../cards/landingpage/CardFacilities.jsx";
import dataFacilities from "../../../data/facilities.js";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import styled from 'styled-components';

const fetchData = async () => {
  const response = await axios.get("http://localhost:3000/dashboard/fasilitas");
  return response.data;
};

const Facilities = () => {
  const { data, isLoading } = useQuery("fasilitasData", fetchData, {
    refetchOnWindowFocus: false, // Tidak merender ulang data saat jendela browser mendapatkan fokus
    refetchOnMount: false, // Tidak merender ulang data saat komponen dipasang
    staleTime: Infinity, // Data tidak dianggap kadaluwarsa
  });

  const CustomRow = styled(Row)`
  text-align: center;

  @media (max-width: 576px) {
    text-align: left;
    padding-left: 20px;
  }
`;

  return (
    <Container fluid className="bg-secondary py-2">
      <CustomRow>
      <h1 className="text-primary">Fasilitas Klinik</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur. Ullamcorper vulputate non in
        lorem adipiscing tempor integer blandit commodo.
      </p>
    </CustomRow>

      <Row xs={1} md={2} className="g-4 p-5">
      {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
      ) : data && data.length > 0 ? (
          data.map((item) => (
            <Col lg={4} key={item.fasilitas_id}>
              <CardFacilities data={item} />
            </Col>
          ))
        ) : (
          <p>Tidak ada data</p>
        )}
      </Row>
    </Container>
  );
};

export default Facilities;
