const cors = require("cors");

const corsOptions = {
  origin: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
