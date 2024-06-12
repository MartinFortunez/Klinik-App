import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CardDoctorsSchedule from "../../cards/admin/CardDoctorsSchedule";
import Add from "./Add";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchData = async () => {
  const response = await axios.get(
    "http://localhost:3000/dashboard/jadwal-dokter-spesialis"
  );
  return response.data;
};

const DoctorsSchedule = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery("jadwalDokterData", fetchData, {
    refetchOnWindowFocus: false, // Tidak merender ulang data saat jendela browser mendapatkan fokus
    refetchOnMount: false, // Tidak merender ulang data saat komponen dipasang
    staleTime: Infinity, // Data tidak dianggap kadaluwarsa
  });
  // Function to sort the schedule data in ascending order by jadwal_id
  const sortedSchedules = data
    ? [...data.schedules].sort((a, b) => a.dokter_id - b.dokter_id)
    : [];

  isSuccess && console.log(data);

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { idDokter, jam, hari } = values;
    try {
      const response = {
        dokter_id: idDokter,
        sesi: `${hari} (${jam})`,
      };

      console.log(response);

      await axios.post(
        "http://localhost:3000/dashboard/jadwal-dokter-spesialis/add",
        response
      );
      queryClient.invalidateQueries("jadwalDokterData");
      handleAddClose();
    } catch (error) {
      console.error("Failed to add facility:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Jadwal Dokter</h2>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={handleAddShow}
            className="text-light fw-semibold"
          >
            Tambah
          </Button>
          <Add
            show={showAddModal}
            handleClose={handleAddClose}
            handleAdd={handleSubmit}
          />
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-scroll m-0">
        {sortedSchedules.length > 0 ? (
          sortedSchedules.map((item) => (
            <CardDoctorsSchedule
              key={item.jadwal_id}
              data={item}
              dataDoctor={data.doctors}
            />
          ))
        ) : (
          <p>loading bolo</p>
        )}
      </Row>
    </Container>
  );
};

export default DoctorsSchedule;
