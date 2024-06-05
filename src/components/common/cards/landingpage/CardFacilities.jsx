import React from "react";
import { Card, Image } from "react-bootstrap";

const CardFacilities = ({ imgSrc, title, desc }) => {
    return (
        <Card className="d-flex flex-column align-items-center">
            <Image src={imgSrc} fluid/>
            <Card.Body>
                <Card.Title className="fw-bold text-primary">{title}</Card.Title>
                <Card.Text>{desc}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CardFacilities;