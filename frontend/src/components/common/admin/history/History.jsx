import React, { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import CardHistory from "../../cards/admin/CardHistory";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import useFetch from "../../../../hooks/useFetch";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // State untuk status filter
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetch("riwayat", "riwayatData");

  // Filter data berdasarkan kata kunci pencarian dan status
  const filteredData = data
    ? data.schedules.filter(
        (item) =>
          item.nik.startsWith(searchQuery) && // Pencarian dimulai dari awal angka NIK
          (filterStatus
            ? item.status.toLowerCase() === filterStatus.toLowerCase()
            : true) // Filter berdasarkan status jika ada
      )
    : [];

  // Fungsi untuk menangani perubahan status filter
  const handleStatusFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Riwayat</h2>
        </Col>
        <Col xs={4}>
          {/* Input field untuk pencarian */}
          <Form.Control
            type="text"
            placeholder="Masukkan NIK pasien"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          {/* Dropdown untuk filter status */}
          <Form.Select
            onChange={handleStatusFilterChange}
            value={filterStatus}
            aria-label="Filter by status"
          >
            <option value="">All Status</option>
            <option value="Complete">Complete</option>
            <option value="Cancel">Cancel</option>
          </Form.Select>
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-scroll m-0">
        {isLoading ? (
          <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : data && data.length > 0 ? (
        data.map((item) => (
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
