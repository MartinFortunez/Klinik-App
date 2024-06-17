import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Reject from "../../admin/patientReviews/Reject";
import { BsStarFill } from "react-icons/bs";
import { api } from "../../../../api/api";
import { useQueryClient } from "react-query";
import { handleDelete } from "../../../../utils/handleFunction";
import { format } from "date-fns";
import { toast } from "react-toastify";

const CardPatientReviews = ({ data }) => {
  const { ulasan_id, nik, nama_pasien, penilaian, tgl_ulasan, rating, status } =
    data;
  const [isLoading, setIsLoading] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState(status);
  const queryClient = useQueryClient();

  const formattedDate = format(new Date(tgl_ulasan), "dd/MM/yyyy");

  const yellowStars = Math.floor(rating);
  const whiteStars = 5 - yellowStars;

  const handleRejectClose = () => setShowRejectModal(false);
  const handleRejectShow = () => setShowRejectModal(true);

  const onSubmit = async () => {
    const newStatus = statusFeedback === "on" ? "off" : "on";
    setStatusFeedback(newStatus);

    const response = {
      status: newStatus,
    };
    try {
      await api("put", `feedback/edit/${ulasan_id}`, response);
      await queryClient.refetchQueries("feedbackData");
      newStatus === "on"
        ? toast.success("Berhasil menampilkan ulasan ke landing page!")
        : toast.success("Berhasil menyembunyikan ulasan dari landing page!");
    } catch {
      toast.error("Gagal menampilkan ulasan ke landing page!");
    }
    // Menunggu hingga refetch selesai
  };

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await handleDelete(
        "delete",
        `feedback/delete/${ulasan_id}`,
        queryClient,
        "feedbackData"
      );
      // Display toast notification upon successful deletion
      toast.success("Berhasil menghapus ulasan pasien!");
    } catch (error) {
      console.error("Error deleting patient reviews:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Col>
      <Card>
        <Card.Body className="d-flex flex-column gap-3">
          <Row className="d-flex flex-column flex-md-row">
            <Col>
              <Card.Subtitle className="opacity-50">NIK</Card.Subtitle>
              <Card.Text>{nik}</Card.Text>
            </Col>
            <Col className="text-md-end mt-3 mt-md-0">
              <Card.Subtitle className="opacity-50">
                Tanggal Ulasan
              </Card.Subtitle>
              <Card.Text>{formattedDate}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Nama</Card.Subtitle>
              <Card.Text>{nama_pasien}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Penilaian</Card.Subtitle>
              <Card.Text>{penilaian}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Rating</Card.Subtitle>
              <Col>
                <div className="stars">
                  {[...Array(yellowStars)].map((_, index) => (
                    <BsStarFill key={index} className="star-color" />
                  ))}
                  {[...Array(whiteStars)].map((_, index) => (
                    <BsStarFill
                      key={index + yellowStars}
                      className="text-secondary"
                    />
                  ))}
                </div>
              </Col>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-transparent d-flex justify-content-end gap-2">
          <Button variant="outline-danger" onClick={handleRejectShow}>
            Hapus
          </Button>
          <Button variant="primary" onClick={onSubmit} className="text-light">
            {status === "off" ? "Tampilkan" : "Sembunyikan"}
          </Button>

          <Reject
            show={showRejectModal}
            handleClose={handleRejectClose}
            handleReject={onDelete}
            data={data}
            isLoading={isLoading}
          />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardPatientReviews;
