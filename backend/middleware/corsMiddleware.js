const cors = require("cors");

const corsOptions = {
  origin: "https://fe-msib-6-klinik-app-01.educalab.id",
  optionsSuccessStatus: 200,
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
