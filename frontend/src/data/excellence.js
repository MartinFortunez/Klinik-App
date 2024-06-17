import {
  CalendarWeek,
  HospitalFill,
  PersonCheckFill,
  PersonWheelchair,
} from "react-bootstrap-icons";

const data = [
  {
    icon: <HospitalFill size={40} />,
    title: "Lokasi Strategis dan Aksesibilitas",
    desc: "Terletak di pusat kota yang mudah dijangkau, klinik kami memberikan aksesibilitas yang baik bagi pasien dari berbagai wilayah",
  },
  {
    icon: <PersonWheelchair size={40} />,
    title: "Fasilitas Modern dan Nyaman",
    desc: "Klinik kami dilengkapi dengan fasilitas medis terbaru untuk memastikan Anda mendapatkan perawatan yang optimal ",
  },
  {
    icon: <PersonCheckFill size={40} />,
    title: "Dokter Berpengalaman dan Ahli",
    desc: "Kami memiliki tim dokter yang terampil dan berpengalaman di berbagai spesialisasi medis",
  },
  {
    icon: <CalendarWeek size={40} />,
    title: "Sistem Janji Temu yang Efisien",
    desc: "Klinik kami menggunakan sistem janji temu online yang efisien dan mudah digunakan",
  },
];

export default data;
