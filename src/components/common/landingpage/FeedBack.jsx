import React, { useState } from "react";
import { Modal, Button, Container, Carousel } from "react-bootstrap";
import CardFeedBack from "../cards/landingpage/CardFeedBack";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  CarouselControlPrev,
  CarouselControlNext,
} from "./CarouselControlButton";
import FormAddFeedBack from "./FormAddFeedBack";
import "../../sass/StyledFeedBack.scss";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchData = async () => {
  const response = await axios.get("http://localhost:3000/dashboard/feedback");
  return response.data;
};

const FeedBack = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { data, isSuccess } = useQuery("feedbackData", fetchData, {
    refetchOnWindowFocus: false, // Tidak merender ulang data saat jendela browser mendapatkan fokus
    refetchOnMount: false, // Tidak merender ulang data saat komponen dipasang
    staleTime: Infinity, // Data tidak dianggap kadaluwarsa
  });

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);
  return (
    <div className="StyledFeedBack">
      <div className="Title">Ulasan Pasien</div>
      <Container>
        <Carousel
          prevIcon={<CarouselControlPrev />}
          nextIcon={<CarouselControlNext />}
        >
          {data ? (
            Array.from({ length: Math.ceil(data.length / 2) }, (_, i) => {
              const startIndex = i * 2;
              const endIndex = startIndex + 2;
              return (
                <Carousel.Item key={i}>
                  <div className="d-flex justify-content-around">
                    {data.slice(startIndex, endIndex).map((item) => (
                      <CardFeedBack key={item.ulasan_id} data={item} />
                    ))}
                  </div>
                  s
                </Carousel.Item>
              );
            })
          ) : (
            <p>loading bolo</p>
          )}
        </Carousel>
        <div className="d-flex justify-content-center mt-3">
          <Button className="CustomButton" onClick={handleAddShow}>
            Kirim Feedback
          </Button>
        </div>
        <FormAddFeedBack
          show={showAddModal}
          handleClose={handleAddClose}
          data={data}
        />
      </Container>
    </div>
  );
};

export default FeedBack;
