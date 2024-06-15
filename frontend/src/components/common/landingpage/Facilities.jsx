import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import CardFacilities from "../cards/landingpage/CardFacilities.jsx";
import dataFacilities from "../../../data/facilities.js";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import useFetch from "../../../hooks/useFetch.js";

const Facilities = () => {
  const { data, isLoading } = useFetch("fasilitas", "fasilitasData");

  const CustomRow = styled(Row)`
    text-align: center;

    @media (max-width: 576px) {
      text-align: left;
      padding-left: 20px;
    }
  `;

  return (
    <Container id="Facilities" fluid className="bg-secondary py-5">
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
