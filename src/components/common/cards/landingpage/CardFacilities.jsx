import React from "react";
import { Card, Image } from "react-bootstrap";

const CardFacilities = ({ data }) => {
  const { foto_fasilitas, judul, deskripsi } = data;

  return (
    <Card className="d-flex flex-column align-items-center h-100"> 
      <Image src={`data:image/jpeg;base64,${foto_fasilitas}`}
       width="100%"
       height={200}
       className="object-fit-cover" 
       />
      <Card.Body className="w-100 d-flex flex-column">
        <Card.Title className="fw-bold text-primary">{judul}</Card.Title>
        <Card.Text>{deskripsi}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardFacilities;
