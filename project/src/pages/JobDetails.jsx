import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaDollarSign,
  FaArrowLeft,
  FaBuilding,
} from "react-icons/fa";
import { getJobById } from "../features/jobs/jobSlice";
import { applyForJob, getMyApplications } from "../features/applications/applicationSlice";
import Modal from "../components/Modal";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { job, isLoading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const { applications,isError,message} = useSelector((state) => state.applications);

  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    expectedSalary: "",
    availableFrom: "",
  });
  const alreadyApplied = applications.some(
    (app) => app.jobId === id || app.job?._id === id || app.job === id
  );
  
  /* ================= FETCH JOB ================= */
  useEffect(() => {
    dispatch(getJobById(id));
    if (user?.role === "jobseeker") {
      dispatch(getMyApplications());
    }
    if (isError) {
      alert(message);
    }
  }, [dispatch, id, isError, message, user?.role]);

  if (isLoading || !job) {
    return <p className="loading">Loading job details...</p>;
  }

  /* ================= APPLY ================= */
  const handleApply = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowApplyModal(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
  
    dispatch(
      applyForJob({
        jobId: id,
        data: applicationData,
      })
    ).then(() => {
      dispatch(getMyApplications()); // refresh
    });
  
    setShowApplyModal(false);
  };
  

  return (
    <div className="job-details-page">
      {/* HEADER */}
      <div className="job-details-header">
        <div className="container">
          <button
            className="back-button"
            onClick={() => navigate("/jobs")}
          >
            <FaArrowLeft /> Back to Jobs
          </button>
        </div>
      </div>

      <div className="container">
        <div className="job-details-layout">
          <main className="job-details-main">
            <div className="job-header-card">
              <div className="job-header-top">
                <div className="job-header-info">
                  <h1>{job.title}</h1>

                  <div className="company-info">
                    <FaBuilding />
                    <span>{job.createdBy?.companyName || job.createdBy?.name || "Company"}</span>
                  </div>

                  <div className="job-meta">
                    <span><FaMapMarkerAlt /> {job.location}</span>
                    <span><FaBriefcase /> {job.type}</span>
                    <span><FaClock /> {job.experience}</span>
                    <span><FaDollarSign /> {job.salary}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="job-section">
              <h2>Job Description</h2>
              <p>{job.description}</p>
            </div>

            <div className="job-section">
              <h2>Requirements</h2>
              <ul className="job-list">
                {job.requirements?.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </main>

          {/* SIDEBAR */}
          <aside className="job-details-sidebar">
            <div className="action-card">
            <button
  onClick={handleApply}
  disabled={alreadyApplied}
  className={alreadyApplied ? "applied-btn" : "apply-btn"}
>
  {alreadyApplied ? "Applied" : "Apply Now"}
</button>

            </div>

            <div className="job-overview-card">
              <h3>Job Overview</h3>
              <div><strong>Location:</strong> {job.location}</div>
              <div><strong>Type:</strong> {job.type}</div>
              <div><strong>Experience:</strong> {job.experience}</div>
              <div><strong>Salary:</strong> {job.salary}</div>
            </div>
          </aside>
        </div>
      </div>

      {/* APPLY MODAL */}
      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title="Apply for this position"
      >
        <form onSubmit={handleSubmitApplication} className="apply-form">
          <div className="form-group">
            <label>Cover Letter</label>
            <textarea
              value={applicationData.coverLetter}
              onChange={(e) =>
                setApplicationData({
                  ...applicationData,
                  coverLetter: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Expected Salary</label>
            <input
              type="text"
              value={applicationData.expectedSalary}
              onChange={(e) =>
                setApplicationData({
                  ...applicationData,
                  expectedSalary: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Available From</label>
            <input
              type="date"
              value={applicationData.availableFrom}
              onChange={(e) =>
                setApplicationData({
                  ...applicationData,
                  availableFrom: e.target.value,
                })
              }
              required
            />
          </div>

          <button type="submit" className="submit-application-btn">
            Submit Application
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default JobDetails;
