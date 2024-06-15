import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Carousel, Col, Row } from "react-bootstrap";
import CardFeedBack from "../cards/landingpage/CardFeedBack";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  CarouselControlPrev,
  CarouselControlNext,
} from "./CarouselControlButton";
import FormAddFeedBack from "./FormAddFeedBack";
import useFetch from "../../../hooks/useFetch";

const FeedBack = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [cardsPerSlide, setCardsPerSlide] = useState(2);
  const { data, isSuccess } = useFetch("feedback", "feedbackData");
  const handleResize = () => {
    const breakpoint = 900; // Example breakpoint for small screens
    setCardsPerSlide(window.innerWidth > breakpoint ? 2 : 1);
  };

  useEffect(() => {
    handleResize(); // Set initial state based on current window size
    window.addEventListener("resize", handleResize); // Adjust on window resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup on component unmount
  }, []);

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  return (
    <Container fluid id="Feedback" className="py-5">
      <h1 className="text-primary text-center mb-5">Ulasan Pasien</h1>
      <Row className="justify-content-center">
        <Col xs={11} md={10} lg={8}>
          <Carousel>
            {data ? (
              Array.from(
                { length: Math.ceil(data.length / cardsPerSlide) },
                (_, i) => {
                  const startIndex = i * cardsPerSlide;
                  const endIndex = startIndex + cardsPerSlide;
                  const filteredData = data
                    .slice(startIndex, endIndex)
                    .filter((item) => item.status === "on");
                  return (
                    <Carousel.Item key={i}>
                      <Row>
                        {filteredData.map((item) => (
                          <Col xs lg={6} key={item.ulasan_id}>
                            <CardFeedBack data={item} />
                          </Col>
                        ))}
                      </Row>
                    </Carousel.Item>
                  );
                }
              )
            ) : (
              <p>Loading...</p>
            )}
          </Carousel>
          <Col className="mt-5  d-flex justify-content-center">
            <Button
              variant="primary"
              className="text-light"
              onClick={handleAddShow}
            >
              Kirim Feedback
            </Button>
          </Col>
        </Col>
        <FormAddFeedBack
          show={showAddModal}
          handleClose={handleAddClose}
          data={data}
        />
      </Row>
    </Container>
  );
};

export default FeedBack;
