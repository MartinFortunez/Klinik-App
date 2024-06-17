import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "../../sass/StyledFooter.scss";

const Footer = () => {
  return (
    <footer className="py-5 px-3 text-light bg-footer">
      <Container>
        <Row>
          <Col md={8} className="d-flex flex-column gap-2">
            <h5>Alamat</h5>
            <p>
              Jl. Ambulu No.48, Krajan Kulon, Tj. Rejo, Kec. Wuluhan, Kabupaten
              Jember, Jawa Timur 68162
            </p>
          </Col>
          <Col
            md={4}
            className="text-md-right d-flex flex-column align-items-md-end gap-2"
          >
            <h5>Media Sosial</h5>
            <Col className="d-flex gap-2">
              <a
                href="https://www.instagram.com"
                target="_blank"
                className="SocialLink bg-red"
                rel="noopener noreferrer"
              >
                <FaInstagram color="white" />
              </a>
              <a
                href="https://www.whatsapp.com"
                target="_blank"
                className="SocialLink bg-green"
                rel="noopener noreferrer"
              >
                <FaWhatsapp color="white" />
              </a>
              <a
                href="mailto:someone@example.com"
                target="_blank"
                className="SocialLink bg-blue"
                rel="noopener noreferrer"
              >
                <FaEnvelope color="white" />
              </a>
            </Col>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <hr className="border-light" />
            <p className="mb-0">
              Created by Klinik App | &copy; 2024 All Rights Reserved by Gamelab
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
