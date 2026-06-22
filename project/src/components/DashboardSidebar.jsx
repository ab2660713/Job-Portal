import { NavLink } from 'react-router-dom';
import { FaUser, FaBriefcase, FaBookmark, FaFileAlt, FaBuilding, FaPlusCircle, FaChartBar, FaBell } from 'react-icons/fa';
import './DashboardSidebar.css';

const DashboardSidebar = ({ role }) => {
  const jobSeekerLinks = [
    { path: '/dashboard/jobseeker', icon: <FaUser />, label: 'Profile' },
    { path: '/dashboard/jobseeker/applied', icon: <FaBriefcase />, label: 'Applied Jobs' },
    { path: '/dashboard/jobseeker/saved', icon: <FaBookmark />, label: 'Saved Jobs' },
    { path: '/dashboard/jobseeker/resume', icon: <FaFileAlt />, label: 'Resume' },
    { path: '/dashboard/jobseeker/notifications', icon: <FaBell />, label: 'Notifications' }
  ];

  const employerLinks = [
    { path: '/dashboard/employer', icon: <FaBuilding />, label: 'Company Profile' },
    { path: '/dashboard/employer/post-job', icon: <FaPlusCircle />, label: 'Post New Job' },
    { path: '/dashboard/employer/manage-jobs', icon: <FaBriefcase />, label: 'Manage Jobs' },
    { path: '/dashboard/employer/notifications', icon: <FaBell />, label: 'Notifications' }
  ];

  const links = role === 'jobseeker' ? jobSeekerLinks : employerLinks;

  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-header">
        <FaChartBar className="sidebar-header-icon" />
        <h3>Dashboard</h3>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            end
          >
            <span className="sidebar-link-icon">{link.icon}</span>
            <span className="sidebar-link-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
