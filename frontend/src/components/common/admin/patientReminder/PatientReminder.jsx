import React from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import CardPatientReminder from "../../cards/admin/CardPatientReminder";
import useFetch from "../../../../hooks/useFetch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientReminder = () => {
  const { data, isLoading } = useFetch("reminder", "reminderData");

  return (
    <Container
      fluid
      className="p-3 p-md-5 h-100 d-flex flex-column overflow-hidden"
    >
      <ToastContainer />
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Reminder Pasien</h2>
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-auto m-0">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : data && data.schedules.length > 0 ? (
          data.schedules.map((item) => (
            <CardPatientReminder key={item.konsul_id} data={item} />
          ))
        ) : (
          <p>Tidak ada data</p>
        )}
      </Row>
    </Container>
  );
};

export default PatientReminder;
