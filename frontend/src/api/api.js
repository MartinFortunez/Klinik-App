import axios from "axios";

export const fetchData = async (url) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}dashboard/${url}`
  );
  return response.data;
};
export const postData = async (url, data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}dashboard/${url}`,
    data
  );
  return response.data;
};
export const api = async (method, url, data) => {
  const response = await axios[method](
    `${process.env.REACT_APP_BACKEND_URL}dashboard/${url}`,
    data
  );
  return response.data;
};
