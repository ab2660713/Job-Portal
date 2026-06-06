import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaToggleOn, FaToggleOff, FaUser } from 'react-icons/fa';
import { mockJobs } from '../../data/mockJobs';
import { useAuth } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { fetchMyJobs, removeJob, toggleJob } from '../../features/jobs/jobSlice';
const ManageJobs = () => {
  const { user } = useAuth();
  const employerJobs = mockJobs.filter(job => user?.postedJobs?.includes(job.id));
  // const [jobs, setJobs] = useState(employerJobs);
  const dispatch = useDispatch();
  const { jobs, isLoading } = useSelector((state) => state.jobs);
  // const handleToggleStatus = (jobId) => {
  //   setJobs(jobs.map(job => {
  //     if (job._id === jobId) {
  //       return { ...job, status: job.status === 'active' ? 'inactive' : 'active' };
  //     }
  //     return job;
  //   }));
  // };
  const handleToggleStatus = (jobId) => {
    dispatch(toggleJob(jobId));
  };
  useEffect(() => {
    dispatch(fetchMyJobs());
  }, [dispatch]);
  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      dispatch(removeJob(jobId));
    }
  };

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <div>
          <h1>Manage Jobs</h1>
          <p>View and manage your job postings</p>
        </div>
        <Link to="/dashboard/employer/post-job" className="edit-profile-btn">
          + Post New Job
        </Link>
      </div>

      {jobs.length > 0 ? (
        <div className="manage-jobs-list">
          {jobs.map(job => (
            <div key={job._id} className="manage-job-card">
              <div className="manage-job-header">
                <div>
                  <h3>{job.title}</h3>
                  <p className="job-meta-info">
                    {job.location} • {job.type} • Posted {job.postedDate}
                  </p>
                </div>
                <span className={`job-status-badge ${job.status}`}>
                  {job.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="manage-job-stats">
                <div className="job-stat">
                  <strong>12</strong>
                  <span>Applications</span>
                </div>
                <div className="job-stat">
                  <strong>45</strong>
                  <span>Views</span>
                </div>
                <div className="job-stat">
                  <strong>3</strong>
                  <span>Shortlisted</span>
                </div>
              </div>

              <div className="manage-job-actions">
              <Link
  to={`/dashboard/employer/applicants/${job._id}`}
  className="action-btn applicants"
>
  <FaUser /> Applicants
</Link>
             
              
                <button
                  className="action-btn toggle"
                  onClick={() => handleToggleStatus(job._id)}
                >
                  {job.status === 'active' ? <FaToggleOn /> : <FaToggleOff />}
                  {job.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(job._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No jobs posted yet</h3>
          <p>Start posting jobs to attract talented candidates</p>
          <Link to="/dashboard/employer/post-job" className="browse-jobs-btn">
            Post Your First Job
          </Link>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
