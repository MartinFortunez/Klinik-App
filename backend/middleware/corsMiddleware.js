const cors = require("cors");

const corsOptions = {
  origin: "https://fe-msib-6-klinik-app-01.educalab.id",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
