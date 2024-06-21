const cors = require("cors");

const corsOptions = {
  origin: "https://fe-msib-6-klinik-app-01.educalab.id/", // Ganti dengan URL frontend Anda
  optionsSuccessStatus: 200, // Beberapa browser lama (IE11, berbagai SmartTV) memerlukan ini
  credentials: true, // Izinkan kredensial (seperti cookie)
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
