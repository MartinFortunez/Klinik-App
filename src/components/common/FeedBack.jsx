import React, { useState } from "react";
import { Modal, Button, Container, Carousel } from "react-bootstrap";
import CardFeedBack from "./CardFeedBack";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CarouselControlPrev, CarouselControlNext } from "./CarouselControlButton";
import FormAddFeedBack from "./FormAddFeedBack"; 
import "../sass/StyledFeedBack.scss";


const FeedBack = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const slicedData = [];
  for (let i = 0; i < data.length; i += 2) {
    slicedData.push(data.slice(i, i + 2));
  }

  return (
    <div className="StyledFeedBack">
      <div className="Title">Ulasan Pasien</div>
      <Container>
        <Carousel
          prevIcon={<CarouselControlPrev />}
          nextIcon={<CarouselControlNext />}
        >
          {slicedData.map((slice, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-around">
                {slice.map((feedback, idx) => (
                  <CardFeedBack key={idx} feedback={feedback} />
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="d-flex justify-content-center mt-3">
          <Button className="CustomButton" onClick={handleShowModal}>Kirim Feedback</Button>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Kirim Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormAddFeedBack handleCloseModal={handleCloseModal} />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default FeedBack;

const data = [
  {
    ulasan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vel quam elementum pulvinar etiam non quam. Nunc id cursus metus aliquam. Iaculis at erat pellentesque adipiscing commodo. At elementum eu facilisis sed odio morbi.",
    nama: "John Doe",
    role: "Pasien",
    stars: 1
  },
  {
    ulasan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vel quam elementum pulvinar etiam non quam. Nunc id cursus metus aliquam. Iaculis at erat pellentesque adipiscing commodo. At elementum eu facilisis sed odio morbi.",
    nama: "Jane Smith",
    role: "Pasien",
    stars: 2
  },
  {
    ulasan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vel quam elementum pulvinar etiam non quam. Nunc id cursus metus aliquam. Iaculis at erat pellentesque adipiscing commodo. At elementum eu facilisis sed odio morbi.",
    nama: "Luis G Montana",
    role: "Pasien",
    stars: 3
  },
  {
    ulasan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vel quam elementum pulvinar etiam non quam. Nunc id cursus metus aliquam. Iaculis at erat pellentesque adipiscing commodo. At elementum eu facilisis sed odio morbi.",
    nama: "Ariel Cuiras",
    role: "Pasien",
    stars: 4
  },
];
