import { Card, Image, Button } from "react-bootstrap";
import React, { useState } from "react";
import FormConsul from "../../landingpage/FormConsul";
import DoctorSchedule from "./DoctorSchedule";
import { useQueryClient } from "react-query";
import { formDataAddKonsul } from "../../../../utils/body";
import { handleSubmit } from "../../../../utils/handleFunction";
import { toast } from "react-toastify";

const CardDoctor = ({ data }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { dokter_id, nama_dokter, spesialis, foto_dokter } = data;
  const queryClient = useQueryClient();

  const styleUnderline = {
    position: "absolute",
    bottom: "-5px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "50%",
    borderBottom: "2px solid #58a399",
  };

  const onSubmit = async (values, actions) => {
    try {
      await handleSubmit(
        "post",
        "jadwal-konsultasi/add",
        formDataAddKonsul(values),
        actions,
        handleAddClose,
        queryClient,
        "konsultasiMasukData"
      );
      // Display toast notification upon successful addition
      toast.success("Berhasil mengirimkan konsultasi!");
    } catch (error) {
      console.error("Error adding consul:", error);
      // Handle error
    }
  };

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  return (
    <Card className="d-flex flex-column align-items-center p-3 h-100">
      <Image
        src={`data:image/jpeg;base64,${foto_dokter}`}
        width={150}
        height={150}
        className="object-fit-cover"
        roundedCircle
      />
      <Card.Body className="text-center">
        <Card.Title className="fw-bold position-relative">
          {nama_dokter} <span style={styleUnderline}></span>
        </Card.Title>
        <Card.Text className="text-muted">{spesialis}</Card.Text>
        <DoctorSchedule id={dokter_id} />
        <Button
          className="text-light"
          variant="primary"
          onClick={handleAddShow}
        >
          Daftar Konsultasi
        </Button>

        <FormConsul
          show={showAddModal}
          handleClose={handleAddClose}
          handleAdd={onSubmit}
          dataDoctor={data}
        />
      </Card.Body>
    </Card>
  );
};

export default CardDoctor;
