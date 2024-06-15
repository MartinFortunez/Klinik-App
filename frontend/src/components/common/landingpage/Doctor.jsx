import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardDoctor from "../cards/landingpage/CardDoctor.jsx";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import useFetch from "../../../hooks/useFetch.js";

const Doctor = () => {
  const { data, isLoading } = useFetch("dokter-klinik", "doctorData");

  const CustomRow = styled(Row)`
    text-align: center;

    @media (max-width: 576px) {
      text-align: left;
      padding-left: 20px;
    }
  `;

  return (
    <Container id="Doctor" fluid className="py-5">
      <CustomRow>
        <h1 className="text-primary">Jadwal Praktek Dokter</h1>
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
              <Col lg={4} key={item.dokter_id}>
                <CardDoctor data={item} />
              </Col>
          ))
        ) : (
          <p>Tidak ada data</p>
        )}
      </Row>
    </Container>
  );
};

export default Doctor;
