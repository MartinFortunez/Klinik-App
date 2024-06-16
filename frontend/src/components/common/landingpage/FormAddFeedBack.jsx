import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import { Formik } from "formik";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../../../api/api";
import * as yup from "yup";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  NIK: yup
    .string()
    .matches(/^[0-9]+$/, "NIK harus berupa angka")
    .length(16, "NIK harus terdiri dari 16 digit")
    .required("NIK wajib diisi"),
  namaPasien: yup
    .string()
    .matches(/^[^0-9]+$/, "Nama tidak boleh mengandung angka")
    .required("Nama wajib diisi"),
  penilaian: yup.string().required("Penilaian wajib diisi"),
  rating: yup
    .number()
    .moreThan(0, "Rating wajib diisi")
    .required("Rating wajib diisi"),
});

const FormAddFeedBack = ({ data, show, handleClose }) => {
  const [ratingPasien, setRatingPasien] = useState(0);
  const queryClient = useQueryClient();
  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api("get", "riwayat");

        setAppointmentData(result);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    fetchData();
  }, []);

  const handleStarClick = (selectedRating, setFieldValue) => {
    setRatingPasien(selectedRating);
    setFieldValue("rating", selectedRating);
  };

  const addFeedbackMutation = useMutation(
    (feedbackData) =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_URL}dashboard/feedback/add`,
        feedbackData
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("feedbackData");
        handleClose();
        toast.success(
          "Berhasil menambahkan ulasan, perlu persetujuan admin untuk ditampilkan!"
        );
      },
    }
  );

  const getAppointmentStatus = (NIK, namaPasien) => {
    const appointment = appointmentData.schedules.find((appointment) => {
      return appointment.nik === NIK && appointment.nama_pasien === namaPasien;
    });

    return appointment ? appointment.status : "";
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const { NIK, namaPasien, penilaian, rating } = values;
    try {
      if (!appointmentData) {
        console.error("Appointment data is not available yet.");
        return;
      }

      const appointmentStatus = getAppointmentStatus(NIK, namaPasien);

      if (appointmentStatus !== "complete") {
        toast.error("Data yang Anda masukkan belum melakukan konsultasi!");
        console.log(
          "Cannot add feedback for appointments that are not complete."
        );
        return;
      }

      const response = {
        nik: NIK,
        nama_pasien: namaPasien,
        penilaian: penilaian,
        rating: rating,
      };

      await addFeedbackMutation.mutateAsync(response);
    } catch (error) {
      console.error("Failed to add feedback:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setRatingPasien(0);
        handleClose();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="border-0" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Kirim Feedback
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            NIK: "",
            namaPasien: "",
            penilaian: "",
            rating: 0,
          }}
        >
          {({
            handleSubmit,
            values,
            touched,
            errors,
            handleChange,
            handleReset,
            setFieldValue,
          }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="d-flex flex-column gap-2"
            >
              <Form.Text>
                Masukkan data sesuai dengan data yang Anda masukkan ketika
                pendaftaran konsultasi
              </Form.Text>
              <Form.Group>
                {[1, 2, 3, 4, 5].map((index) => (
                  <BsStarFill size={24}
                    key={index}
                    className={`star ${
                      index <= ratingPasien ? "star-color" : "text-secondary"
                    }`}
                    onClick={() => handleStarClick(index, setFieldValue)}
                  />
                ))}
                {touched.rating && errors.rating && (
                  <div className="text-danger">{errors.rating}</div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Group controlId="validationNIK" className="mb-3">
                  <Form.Label>NIK</Form.Label>
                  <Form.Control
                    name="NIK"
                    type="text"
                    placeholder="NIK"
                    value={values.NIK}
                    onChange={handleChange}
                    isValid={touched.NIK && !errors.NIK}
                    isInvalid={touched.NIK && !!errors.NIK}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.NIK}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationNama" className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    name="namaPasien"
                    type="text"
                    placeholder="Masukkan nama Anda sesuai KTP"
                    value={values.namaPasien}
                    onChange={handleChange}
                    isValid={touched.namaPasien && !errors.namaPasien}
                    isInvalid={touched.namaPasien && !!errors.namaPasien}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.namaPasien}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationNama" className="mb-3">
                  <Form.Label>Penilaian</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="penilaian"
                    type="text"
                    placeholder="Masukkan penilaian Anda"
                    value={values.penilaian}
                    onChange={handleChange}
                    isValid={touched.penilaian && !errors.penilaian}
                    isInvalid={touched.penilaian && !!errors.penilaian}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.penilaian}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Button
                    variant="secondary"
                    type="button"
                    className="w-100 bg-transparent border-0"
                    onClick={() => {
                      setFieldValue("rating", 0);
                      setRatingPasien(0);
                      handleReset();
                      handleClose();
                    }}
                  >
                    Batal
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 text-light"
                  >
                    Kirim Feedback
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default FormAddFeedBack;
