import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCalendar, FaBuilding } from "react-icons/fa";
import { getMyApplications } from "../../features/applications/applicationSlice";

const AppliedJobs = () => {
  const dispatch = useDispatch();

  const { applications, isLoading } = useSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  const getStatusClass = (status) => {
    if (!status) return "";
    switch (status.toLowerCase()) {
      case "shortlisted":
      case "interviewed":
        return "status-success";
      case "under review":
        return "status-warning";
      case "rejected":
        return "status-danger";
      default:
        return "";
    }
  };

  if (isLoading) {
    return <p className="loading">Loading applied jobs...</p>;
  }

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <div>
          <h1>Applied Jobs</h1>
          <p>Track the status of your job applications</p>
        </div>
      </div>

      {applications.length > 0 ? (
        <div className="applied-jobs-list">
          {applications.map((application) => (
  <div key={application.jobId} className="application-card">
    <div className="application-header">
      <div>
        <h3>
          <Link to={`/jobs/${application.jobId}`}>
            {application.jobTitle}
          </Link>
        </h3>

        <p className="company-name">
          <FaBuilding /> {application.company}
        </p>
      </div>

      <span
        className={`status-badge ${getStatusClass(application.status)}`}
      >
        {application.status}
      </span>
    </div>

    <div className="application-footer">
      <span className="application-date">
        <FaCalendar /> Applied on{" "}
        {new Date(application.appliedDate).toLocaleDateString()}
      </span>

      <Link
        to={`/jobs/${application.jobId}`}
        className="view-job-link"
      >
        View Job
      </Link>
    </div>
  </div>
))}

        </div>
      ) : (
        <div className="empty-state">
          <h3>No applications yet</h3>
          <p>Start applying to jobs to see your applications here</p>
          <Link to="/jobs" className="browse-jobs-btn">
            Browse Jobs
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
