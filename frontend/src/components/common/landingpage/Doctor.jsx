import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardDoctor from "../cards/landingpage/CardDoctor.jsx";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import useFetch from "../../../hooks/useFetch.js";

const Doctor = () => {
  const { data, isLoading } = useFetch("dokter-klinik", "doctorData");
  data && console.log("Dokter", data);

  return (
    <Container id="Doctor" fluid className="p-4 p-md-5">
      <Row>
        <h1 className="text-primary text-md-center">Jadwal Praktek Dokter</h1>
        <p className="text-md-center">
          Atur janji temu Anda dengan dokter kami secara online untuk konsultasi
          dan perawatan yang sesuai dengan kebutuhan kesehatan Anda.
        </p>
      </Row>
      <Row xs={1} md={2} className="g-4 py-3 px-lg-5">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : data && Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <Col xs lg={4} key={item.dokter_id}>
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
