const cors = require("cors");

const corsOptions = {
  origin: "http://192.168.192.61:3000/",
  optionsSuccessStatus: 200,
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
