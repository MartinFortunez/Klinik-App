import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardPatientReminder from "../../cards/admin/CardPatientReminder";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchData = async () => {
  const response = await axios.get("http://localhost:3000/dashboard/reminder");
  return response.data;
};

const PatientReminder = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery("reminderData", fetchData, {
    refetchOnWindowFocus: false, // Tidak merender ulang data saat jendela browser mendapatkan fokus
    refetchOnMount: false, // Tidak merender ulang data saat komponen dipasang
    staleTime: Infinity, // Data tidak dianggap kadaluwarsa
  });

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);
  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Reminder Pasien</h2>
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-scroll m-0">
        {data && data.schedules.length > 0 ? (
          data.schedules.map((item) => (
            <CardPatientReminder key={item.konsul_id} data={item} />
          ))
        ) : data && data.schedules.length === 0 ? (
          <p>No Data</p>
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </Container>
  );
};

export default PatientReminder;
