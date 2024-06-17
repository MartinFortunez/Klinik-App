import React from "react";
import { Button, Image, Container, Col, Row} from "react-bootstrap";
import imgHero from "../../../assets/img-hero.png";

const Hero = () => {
  return (
    <Container id="Hero" fluid className="pt-4 pt-md-5 px-4 px-md-5">
      <Row className="align-items-lg-center justify-content-lg-center">
        <Col xs={12} md={10} lg={5}>
          <h1 className="text-primary fs-1">Klinik App</h1>
          <p>
            Kami berkomitmen untuk memberikan pelayanan kesehatan terbaik dengan
            pendekatan yang holistik dan ramah pasien. Dengan tim medis terbaik
            kami yang berdedikasi dan fasilitas modern, kami siap memberikan
            perawatan yang Anda butuhkan untuk memastikan kesehatan dan
            kesejahteraan Anda.
          </p>
          <p>
            <Button variant="primary" href="#Doctor" className="text-light">
              Konsultasi Sekarang
            </Button>
          </p>
        </Col>
        <Col md={5} className="d-none d-lg-block">
          <Image src={imgHero} fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
