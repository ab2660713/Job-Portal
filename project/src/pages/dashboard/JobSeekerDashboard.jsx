import { Routes, Route } from 'react-router-dom';
import DashboardSidebar from '../../components/DashboardSidebar';
import JobSeekerProfile from './JobSeekerProfile';
import AppliedJobs from './AppliedJobs';
import SavedJobs from './SavedJobs';
import Resume from './Resume';
import './Dashboard.css';

const JobSeekerDashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <DashboardSidebar role="jobseeker" />
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<JobSeekerProfile />} />
            <Route path="/applied" element={<AppliedJobs />} />
            <Route path="/saved" element={<SavedJobs />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
