import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardFacilities from "./cards/CardFacilities.jsx";
import dataFacilities from "../../data/facilities.js";

const facilities = () => {
    return (
        <div>
            <Row className="text-center">
                <h1>Fasilitas Klinik</h1>
                <p>
                Lorem ipsum dolor sit amet consectetur. Ullamcorper vulputate non in lorem adipiscing tempor integer blandit commodo.
                </p>
            </Row>
            <Row className="position-absolute w-100 px-5">
                <Row xs={1} md={2} className="g-4">
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
            </Row>
        </div>
    );
};

export default facilities;