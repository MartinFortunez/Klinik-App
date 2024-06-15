import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { format } from "date-fns";

const CardFeedBack = ({ data, className }) => {
  const { nama_pasien, penilaian, tgl_ulasan, rating, status } = data;
  const formattedDate = format(new Date(tgl_ulasan), "dd/MM/yyyy");

  const yellowStars = Math.floor(rating);
  const whiteStars = 5 - yellowStars;

  return (
    <Card className="rounded-3 p-5">
      <BiSolidQuoteLeft size={48} className="text-primary" />
      <Card.Body>
        <Row>
          <Col xs={12}>
            <p>{penilaian}</p>
          </Col>
        </Row>
      </Card.Body>
      <Row className="mt-3 align-items-center">
        <Col xs className="d-flex flex-column">
          <span className="text-primary fw-bold">{nama_pasien}</span>
          <span className="text-date">{formattedDate}</span>
        </Col>
        <Col xs="auto">
          {[...Array(yellowStars)].map((_, index) => (
            <BsStarFill key={index} className="star-color" size={24} />
          ))}
          {[...Array(whiteStars)].map((_, index) => (
            <BsStarFill
              key={index + yellowStars}
              className="text-secondary"
              size={24}
            />
          ))}
        </Col>
      </Row>
    </Card>
  );
};

CardFeedBack.propTypes = {
  feedback: PropTypes.shape({
    ulasan: PropTypes.string.isRequired,
    nama: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default CardFeedBack;
