import React from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "react-query";

const fetchData = async (jadwalId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}dashboard/jadwal-dokter/${jadwalId}`
  );
  return response.data;
};

const DoctorSchedule = ({ id }) => {
  const { data, isLoading } = useQuery(["jadwalData", id], () => fetchData(id));

  return (
    <>
      {isLoading ? (
        <p>loading data...</p>
      ) : data && Array.isArray(data) ? (
        data.map((item) => (
          <Card.Text key={item.jadwal_id}>{item.sesi}</Card.Text>
        ))
      ) : (
        <p>Tidak ada data</p>
      )}
    </>
  );
};

export default DoctorSchedule;
