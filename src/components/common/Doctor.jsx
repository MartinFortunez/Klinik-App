import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardDoctor from "./cards/CardDoctor.jsx";
import dataDoctor from "../../data/doctor.js";

const Doctor = () => {
    return (
        <div>
            <Row className="text-center">
                <h1>Jadwal Praktek Dokter</h1>
                <p>
                Lorem ipsum dolor sit amet consectetur. Ullamcorper vulputate non in lorem adipiscing tempor integer blandit commodo.
                </p>
            </Row>
            <Row className="position-absolute w-100 px-5">
                <Row xs={1} md={2} className="g-4">
                {dataDoctor.map((data, index) => (
                    <Col lg={4} key={index}>
                    <CardDoctor
                    key={index}
                    imgSrc={data.img}
                    title={data.title} 
                    desc={data.desc}
                    sesi={data.sesi}
                    />
                    </Col>
                ))}
            </Row>
            </Row>
        </div>
    );
};

export default Doctor;