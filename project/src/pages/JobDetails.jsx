import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaDollarSign,
  FaArrowLeft,
  FaBuilding,
  FaExclamationTriangle,
} from "react-icons/fa";
import { getJobById } from "../features/jobs/jobSlice";
import { applyForJob, getMyApplications, resetApplicationState } from "../features/applications/applicationSlice";
import { getMyProfile } from "../features/profile/profileSlice";
import Modal from "../components/Modal";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { job, isLoading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const { applications, isError, message } = useSelector((state) => state.applications);

  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    expectedSalary: "",
    availableFrom: "",
  });

  const alreadyApplied = applications.some(
    (app) => app.jobId === id || app.job?._id === id || app.job === id
  );

  useEffect(() => {
    dispatch(getJobById(id));
    if (user?.role === "jobseeker") {
      dispatch(getMyApplications());
      dispatch(getMyProfile());
    }
  }, [dispatch, id, user?.role]);

  const getProfileMissingFields = () => {
    if (!profile) return [];
    const missing = [];
    if (!profile.title) missing.push("Professional Title");
    if (!profile.experience) missing.push("Experience");
    if (!profile.skills || profile.skills.length === 0) missing.push("Skills");
    if (!profile.resume || !profile.resume.data) missing.push("Resume");
    if (!profile.phone) missing.push("Phone Number");
    if (!profile.location) missing.push("Location");
    return missing;
  };

  const isProfileComplete = () => {
    const missing = getProfileMissingFields();
    return missing.length === 0;
  };

  if (isLoading || !job) {
    return <p className="loading">Loading job details...</p>;
  }

  const handleApply = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!isProfileComplete()) {
      setShowIncompleteModal(true);
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
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getMyApplications());
        setShowApplyModal(false);
      }
    });
  };

  const missingFields = getProfileMissingFields();

  return (
    <div className="job-details-page">
      <div className="job-details-header">
        <div className="container">
          <button className="back-button" onClick={() => navigate("/jobs")}>
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

          <aside className="job-details-sidebar">
            <div className="action-card">
              {!user && (
                <button onClick={() => navigate("/login")} className="apply-btn">
                  Login to Apply
                </button>
              )}

              {user?.role === "jobseeker" && (
                <>
                  {missingFields.length > 0 && !alreadyApplied && (
                    <div className="profile-warning">
                      <FaExclamationTriangle className="warning-icon" />
                      <p>Complete your profile to apply</p>
                      <ul className="missing-fields-list">
                        {missingFields.map((field, i) => (
                          <li key={i}>{field}</li>
                        ))}
                      </ul>
                      <Link to="/dashboard/jobseeker" className="complete-profile-link">
                        Complete Profile
                      </Link>
                    </div>
                  )}
                  <button
                    onClick={handleApply}
                    disabled={alreadyApplied}
                    className={alreadyApplied ? "applied-btn" : "apply-btn"}
                  >
                    {alreadyApplied ? "Applied" : "Apply Now"}
                  </button>
                </>
              )}

              {user?.role === "employer" && (
                <div className="employer-notice">
                  <p>You are viewing this job as an employer. Only job seekers can apply.</p>
                </div>
              )}

              {user?.role === "admin" && (
                <div className="employer-notice">
                  <p>Admin view - applications are for job seekers only.</p>
                </div>
              )}
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

      {/* Incomplete Profile Modal */}
      <Modal
        isOpen={showIncompleteModal}
        onClose={() => setShowIncompleteModal(false)}
        title="Profile Incomplete"
      >
        <div className="incomplete-profile-modal">
          <div className="incomplete-icon">
            <FaExclamationTriangle />
          </div>
          <h3>Complete your profile before applying</h3>
          <p>To apply for jobs, you need to fill in the following:</p>
          <ul className="missing-list">
            {missingFields.map((field, i) => (
              <li key={i}>
                <span className="missing-dot"></span>
                {field}
              </li>
            ))}
          </ul>
          <div className="incomplete-actions">
            <Link
              to="/dashboard/jobseeker"
              className="go-profile-btn"
              onClick={() => setShowIncompleteModal(false)}
            >
              Go to Profile
            </Link>
            {missingFields.includes("Resume") && (
              <Link
                to="/dashboard/jobseeker/resume"
                className="go-resume-btn"
                onClick={() => setShowIncompleteModal(false)}
              >
                Upload Resume
              </Link>
            )}
          </div>
        </div>
      </Modal>

      {/* Apply Modal */}
      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title="Apply for this position"
      >
        <form onSubmit={handleSubmitApplication} className="apply-form">
          {isError && (
            <div className="apply-error-msg">
              {message}
            </div>
          )}

          <div className="applicant-preview">
            <h4>Your Profile (shared with employer)</h4>
            <div className="preview-grid">
              <span><strong>Name:</strong> {profile?.name}</span>
              <span><strong>Title:</strong> {profile?.title}</span>
              <span><strong>Experience:</strong> {profile?.experience}</span>
              <span><strong>Location:</strong> {profile?.location}</span>
              <span><strong>Skills:</strong> {profile?.skills?.join(", ")}</span>
              <span><strong>Resume:</strong> {profile?.resume?.originalName || "Uploaded"}</span>
            </div>
          </div>

          <div className="form-group">
            <label>Cover Letter *</label>
            <textarea
              value={applicationData.coverLetter}
              onChange={(e) =>
                setApplicationData({
                  ...applicationData,
                  coverLetter: e.target.value,
                })
              }
              placeholder="Tell the employer why you're a great fit for this role..."
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label>Expected Salary *</label>
            <input
              type="text"
              value={applicationData.expectedSalary}
              onChange={(e) =>
                setApplicationData({
                  ...applicationData,
                  expectedSalary: e.target.value,
                })
              }
              placeholder="e.g. 5-8 LPA or $60,000"
              required
            />
          </div>

          <div className="form-group">
            <label>Available From *</label>
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
