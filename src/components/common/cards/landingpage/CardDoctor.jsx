import { Card, Image, Button } from "react-bootstrap";
import React, { useState } from "react";
import FormConsul from "../../landingpage/FormConsul";

const CardDoctor = ({ imgSrc, title, desc, sesi }) => {
  const styleUnderline = {
    position: "absolute",
    bottom: "-5px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "50%",
    borderBottom: "2px solid #58a399",
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <Card className="d-flex flex-column align-items-center p-3">
      <Image src={imgSrc} width={150} roundedCircle />
      <Card.Body className="text-center">
        <Card.Title className="fw-bold position-relative">
          {title} <span style={styleUnderline}></span>
        </Card.Title>
        <Card.Text className="text-muted">{desc}</Card.Text>
        <Card.Text className="text-info">
          {sesi.sesi1}
          <br />
          {sesi.sesi2}
          <br />
          {sesi.sesi3}
        </Card.Text>
        <Button className="text-light" variant="primary" onClick={() => setModalShow(true)}>
          Daftar Konsultasi
        </Button>

        <FormConsul show={modalShow} onHide={() => setModalShow(false)} />
      </Card.Body>
    </Card>
  );
};

export default CardDoctor;
