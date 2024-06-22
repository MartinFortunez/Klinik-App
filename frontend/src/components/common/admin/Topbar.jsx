import axios from "axios";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { useQuery } from "react-query";

const fetchProfileData = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/features/profile`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile data");
  }
};

const Topbar = () => {
  useEffect(() => {
    // Ambil token dari local storage
    const token = localStorage.getItem("token");
    // Atur header Authorization jika token ada
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);
  const { data } = useQuery("profileData", fetchProfileData);

  return (
    <Row xs={12} className="bg-light p-2 justify-content-end m-0">
      <Col className="d-flex justify-content-end align-items-center gap-3">
        {data ? (
          <div className="d-flex flex-column align-items-end">
            <span className="fw-semibold text-primary">{data.username}</span>
            <span>Akses</span>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-end">
            <span className="fw-semibold text-primary">memuat...</span>
            <span>memuat...</span>
          </div>
        )}
        <PersonCircle size={40} />
      </Col>
    </Row>
  );
};

export default Topbar;
