import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardFacilities from "../cards/landingpage/CardFacilities.jsx";
import dataFacilities from "../../../data/facilities.js";
import { Container } from "react-bootstrap";

const Facilities = () => {
  return (
    <Container fluid className="bg-secondary py-5">
      <Row className="text-center">
        <h1 className="text-primary">Fasilitas Klinik</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Ullamcorper vulputate non in
          lorem adipiscing tempor integer blandit commodo.
        </p>
      </Row>
      
      <Row xs={1} md={2} className="g-4 p-5">
        {dataFacilities.map((data, index) => (
          <Col lg={4} key={index}>
            <CardFacilities 
              key={index}
              imgSrc={data.img}
              title={data.title}
              desc={data.desc}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Facilities;
