import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import CardFacilities from "../cards/landingpage/CardFacilities.jsx";
import useFetch from "../../../hooks/useFetch.js";

const Facilities = () => {
  const { data, isLoading } = useFetch("fasilitas", "fasilitasData");
  data && console.log("Fasilitas", data);

  return (
    <Container id="Facilities" fluid className="bg-secondary p-4 p-md-5">
      <Row>
        <h1 className="text-primary text-md-center">Fasilitas Klinik</h1>
        <p className="text-md-center">
          Klinik kami dilengkapi dengan fasilitas modern dan nyaman untuk
          memastikan Anda mendapatkan perawatan kesehatan terbaik.
        </p>
      </Row>

      <Row xs={1} md={2} className="g-4 py-3 px-lg-5">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : data && Array.isArray(data) && data.length > 0 ? (
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
