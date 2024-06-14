import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardAdmin from "./pages/DashboardAdmin";
import Dashboard from "./components/common/admin/dashboard/Dashboard";
import DoctorsSchedule from "./components/common/admin/doctorsSchedule/DoctorsSchedule";
import PatientReminder from "./components/common/admin/patientReminder/PatientReminder";
import History from "./components/common/admin/history/History";
import Doctor from "./components/common/admin/doctor/Doctor";
import PatientReviews from "./components/common/admin/patientReviews/PatientReviews";
import Facilities from "./components/common/admin/facilities/Facilities";
import IncomingConsultation from "./components/common/admin/incomingConsultation/IncomingConsultation";
import "normalize.css";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

// Fungsi untuk cek autentikasi
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const ProtectedRoute = ({ element }) => {
  const isAuth = isAuthenticated();
  return isAuth ? element : <Navigate to="/" />;
};


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<DashboardAdmin />}>
            <Route
              path="dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="jadwal-dokter"
              element={<ProtectedRoute element={<DoctorsSchedule />} />}
            />
            <Route
              path="konsultasi-masuk"
              element={<ProtectedRoute element={<IncomingConsultation />} />}
            />
            <Route
              path="reminder-pasien"
              element={<ProtectedRoute element={<PatientReminder />} />}
            />
            <Route
              path="riwayat"
              element={<ProtectedRoute element={<History />} />}
            />
            <Route
              path="dokter"
              element={<ProtectedRoute element={<Doctor />} />}
            />
            <Route
              path="ulasan-pasien"
              element={<ProtectedRoute element={<PatientReviews />} />}
            />
            <Route
              path="fasilitas"
              element={<ProtectedRoute element={<Facilities />} />}
            />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
