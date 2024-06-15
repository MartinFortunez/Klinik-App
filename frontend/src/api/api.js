import axios from "axios";

export const api = async (method, url, data) => {
  console.log("apiurl:",process.env.REACT_APP_BACKEND_URL)
  const response = await axios[method](
    `http://localhost:3000/dashboard/${url}
`,
    data
  );

  return response.data;
};
