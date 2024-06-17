import React, { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import CardHistory from "../../cards/admin/CardHistory";
import useFetch from "../../../../hooks/useFetch";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const { data, isLoading } = useFetch("riwayat", "riwayatData");

  // Filter data berdasarkan kata kunci pencarian dan status
  const filteredData =
    data && Array.isArray(data.schedules)
      ? data.schedules.filter(
          (item) =>
            item.nik.startsWith(searchQuery) && // Pencarian dimulai dari awal angka NIK
            (filterStatus
              ? item.status.toLowerCase() === filterStatus.toLowerCase()
              : true)
        )
      : [];

  // Fungsi untuk menangani perubahan status filter
  const handleStatusFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <Container
      fluid
      className="p-3 p-md-5 h-100 d-flex flex-column overflow-hidden"
    >
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Riwayat</h2>
        </Col>
        <Col md={4}>
          {/* Input field untuk pencarian */}
          <Form.Control
            type="text"
            placeholder="Masukkan NIK pasien"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md="auto" className="mt-2 mt-md-0 mt-md-0">
          {/* Dropdown untuk filter status */}
          <Form.Select
            onChange={handleStatusFilterChange}
            value={filterStatus}
            aria-label="Filter by status"
          >
            <option value="">Semua Status</option>
            <option value="Complete">Selesai</option>
            <option value="Cancel">Dibatalkan</option>
          </Form.Select>
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-auto m-0">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : filteredData &&
          Array.isArray(filteredData) &&
          filteredData.length > 0 ? (
          filteredData.map((item) => (
            <CardHistory key={item.konsul_id} data={item} />
          ))
        ) : (
          <p>Tidak ada data</p>
        )}
      </Row>
    </Container>
  );
};

export default History;
