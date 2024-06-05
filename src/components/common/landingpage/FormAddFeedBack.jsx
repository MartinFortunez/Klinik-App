import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import "../../sass/StyledFeedBack.scss";

const FormAddFeedBack = ({ handleCloseModal }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div className="StyledKirimFeedback">
      <div className="text-wrapper">Kirim Feedback</div>
      <p className="div">
        Masukkan data sesuai dengan data yang Anda masukkan ketika pendaftaran
        konsultasi
      </p>
      <div className="frame-wrapper">
        <div className="frame-2">
          {[1, 2, 3, 4, 5].map((index) => (
            <BsStarFill
              key={index}
              className={`star ${index <= rating ? "selected" : ""}`}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>
      </div>
      <Form>
        <Form.Group controlId="formNIK" className="form-group">
          <Form.Label>NIK</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan NIK"
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="formNama" className="form-group">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Nama"
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="formPenilaian" className="form-group">
          <Form.Label>Penilaian</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Masukkan Komentar"
            className="form-control"
          />
        </Form.Group>
        <div className="frame-3">
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" type="submit">
            Kirim
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FormAddFeedBack;
