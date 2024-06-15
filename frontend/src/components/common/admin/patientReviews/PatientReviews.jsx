import React from "react";
import { Col, Container, Row, Spinner} from "react-bootstrap";
import CardPatientReviews from "../../cards/admin/CardPatientReviews";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import useFetch from "../../../../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientReviews = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetch("feedback", "feedbackData");
  
  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <ToastContainer />
      <Row className="align-items-center">
        <Col>
          <h2>Ulasan Pasien</h2>
        </Col>
      </Row>
      <Row xs={1} lg={2} className="gx-3 gy-4 overflow-y-auto m-0">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : data && data.length > 0 ? (
          data.map((item) => (
            <CardPatientReviews key={item.ulasan_id} data={item} />
          ))
        ) : (
          <p>Tidak ada data</p>
        )}
      </Row>
    </Container>
  );
};

export default PatientReviews;
