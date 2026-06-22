import { Routes, Route } from 'react-router-dom';
import DashboardSidebar from '../../components/DashboardSidebar';
import EmployerProfile from './EmployerProfile';
import PostJob from './PostJob';
import ManageJobs from './ManageJobs';
import Applicants from './Applicants';
import Notifications from './Notifications';
import './Dashboard.css';

const EmployerDashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <DashboardSidebar role="employer" />
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<EmployerProfile />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="applicants/:jobId" element={<Applicants />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
