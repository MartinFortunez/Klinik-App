import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Carousel,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";
import CardFeedBack from "../cards/landingpage/CardFeedBack";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FormAddFeedBack from "./FormAddFeedBack";
import useFetch from "../../../hooks/useFetch";

const FeedBack = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [cardsPerSlide, setCardsPerSlide] = useState(2);
  const { data, isLoading, isSuccess, isError, error } = useFetch(
    "feedback",
    "feedbackData"
  );
  data && console.log("Feedback", data);
  isError && console.log("Feedback", error.message);

  const handleResize = () => {
    const breakpoint = 900;
    setCardsPerSlide(window.innerWidth > breakpoint ? 2 : 1);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  return (
    <Container fluid id="Feedback" className="py-5">
      <h1 className="text-primary text-center mb-5">Ulasan Pasien</h1>
      <Row className="justify-content-center">
        <Col xs={11} md={10} lg={8}>
          <Carousel>
            {isLoading ? (
              <Carousel.Item>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </Carousel.Item>
            ) : isSuccess && data && Array.isArray(data) && data.length > 0 ? (
              data.filter((item) => item.status === "on").length > 0 ? (
                data
                  .filter((item) => item.status === "on")
                  .reduce((acc, item, index) => {
                    const chunkIndex = Math.floor(index / cardsPerSlide);
                    if (!acc[chunkIndex]) {
                      acc[chunkIndex] = [];
                    }
                    acc[chunkIndex].push(item);
                    return acc;
                  }, [])
                  .map((chunk, index) => (
                    <Carousel.Item key={index}>
                      <Row>
                        {chunk.map((feedback) => (
                          <Col key={feedback.id} md={6}>
                            <CardFeedBack data={feedback} />
                          </Col>
                        ))}
                      </Row>
                    </Carousel.Item>
                  ))
              ) : (
                <Carousel.Item>
                  <p className="text-center">Tidak ada ulasan</p>
                </Carousel.Item>
              )
            ) : (
              <Carousel.Item>
                <p className="text-center">Tidak ada ulasan</p>
              </Carousel.Item>
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
