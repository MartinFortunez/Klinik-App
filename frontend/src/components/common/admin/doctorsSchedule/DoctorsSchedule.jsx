import React, { useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import CardDoctorsSchedule from "../../cards/admin/CardDoctorsSchedule";
import Add from "./Add";
import { useQueryClient } from "react-query";
import { formDataAddSchedule } from "../../../../utils/body";
import { handleSubmit } from "../../../../utils/handleFunction";
import useFetch from "../../../../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorsSchedule = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const { data, isLoading } = useFetch(
    "jadwal-dokter-spesialis",
    "jadwalDokterData"
  );

  const sortedSchedules =
    data && Array.isArray(data.schedules)
      ? [...data.schedules].sort((a, b) => a.dokter_id - b.dokter_id)
      : [];

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  const onSubmit = async (values, actions) => {
    setLoading(true);

    try {
      // Check for duplicate schedule
      const isDuplicate = data.schedules.some(
        (schedule) =>
          schedule.dokter_id === values.idDokter &&
          schedule.sesi === `${values.hari} (${values.jam})`
      );

      if (isDuplicate) {
        toast.error("Jadwal dokter sudah ada!");
        return;
      }

      const doctorSchedules = data.schedules.filter(
        (schedule) => schedule.dokter_id === values.idDokter
      );

      // Validate the number of schedules
      if (doctorSchedules.length >= 3) {
        toast.error("Dokter ini sudah memiliki 3 jadwal!");
        return;
      }

      handleSubmit(
        "post",
        "jadwal-dokter-spesialis/add",
        formDataAddSchedule(values),
        actions,
        handleAddClose,
        queryClient,
        "jadwalDokterData"
      );

      // Update query client to refetch data
      await queryClient.invalidateQueries("jadwalDokterData");

      // Display toast notification upon successful addition
      toast.success("Berhasil menambahkan jadwal dokter!");

      // Close modal after successful addition
      handleAddClose();
    } catch (error) {
      toast.error("Gagal menambahkan jadwal dokter!");
      console.error("Error adding doctor schedule:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="p-3 p-md-5 h-100 d-flex flex-column overflow-hidden"
    >
      <ToastContainer />
      <Row className="align-items-center mb-3">
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
            handleAdd={onSubmit}
            isLoading={loading}
          />
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-auto m-0">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : sortedSchedules &&
          Array.isArray(sortedSchedules) &&
          sortedSchedules.length > 0 ? (
          sortedSchedules.map((item) => (
            <CardDoctorsSchedule
              key={item.jadwal_id}
              data={item}
              dataDoctor={data.doctors}
            />
          ))
        ) : (
          <p>Tidak ada data</p>
        )}
      </Row>
    </Container>
  );
};

export default DoctorsSchedule;
