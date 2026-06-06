import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import JobSeekerDashboard from './pages/dashboard/JobSeekerDashboard';
import EmployerDashboard from './pages/dashboard/EmployerDashboard';
import Admin from './pages/Admin';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard/jobseeker/*" element={<JobSeekerDashboard />} />
              <Route path="/dashboard/employer/*" element={<EmployerDashboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer/>
      </Router>
    </AuthProvider>
  );
}

export default App;
