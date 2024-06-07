import { Card, Image, Button } from "react-bootstrap";
import React, { useState } from "react";
import FormConsul from "../../landingpage/FormConsul";

const CardDoctor = ({ data }) => {
  const { dokter_id, sip, nama_dokter, spesialis, foto_dokter } = data;
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
      <Image
        src={`data:image/jpeg;base64,${foto_dokter}`}
        width={150}
        roundedCircle
      />
      <Card.Body className="text-center">
        <Card.Title className="fw-bold position-relative">
          {nama_dokter} <span style={styleUnderline}></span>
        </Card.Title>
        {/* <Card.Text className="text-muted">{desc}</Card.Text>
        <Card.Text className="text-info">
          {sesi.sesi1}
          <br />
          {sesi.sesi2}
          <br />
          {sesi.sesi3}
        </Card.Text> */}
        <Button
          className="text-light"
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          Daftar Konsultasi
        </Button>

        <FormConsul show={modalShow} onHide={() => setModalShow(false)} />
      </Card.Body>
    </Card>
  );
};

export default CardDoctor;
