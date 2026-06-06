import { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaFileAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { mockApplications } from '../../data/mockUsers';
import Modal from '../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { changeApplicationStatus, fetchApplicants, getMyApplications } from '../../features/applications/applicationSlice';
import { useParams } from 'react-router-dom';

const Applicants = () => {
  const dispatch = useDispatch();
const { applications, isLoading } = useSelector(
  (state) => state.applications
);
  const user = useSelector((state) => state.auth.user);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { jobId } = useParams();
  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleStatusChange = (applicationId, newStatus) => {
    dispatch(changeApplicationStatus({ id: applicationId, status: newStatus }))
      .then(() => {
        dispatch(fetchApplicants(jobId)); // refresh list
      });
  };console.log("JOB ID:", jobId);
  const handleDownloadResume = async (application) => {
    if (!application?.resumeDownloadUrl) return;

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiBaseUrl}${application.resumeDownloadUrl}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = application.resume || "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Resume download failed");
    }
  };
  useEffect(() => {
    dispatch(fetchApplicants(jobId));
  }, [dispatch, jobId]);
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'shortlisted':
      case 'interviewed':
        return 'status-success';
      case 'under review':
        return 'status-warning';
      case 'rejected':
        return 'status-danger';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <div>
          <h1>Job Applicants</h1>
          <p>Review and manage applications</p>
        </div>
      </div>

      <div className="applicants-filters">
        <select className="filter-select">
          <option value="">All Jobs</option>
          <option value="1">Senior Frontend Developer</option>
          <option value="2">DevOps Engineer</option>
        </select>
        <select className="filter-select">
          <option value="">All Status</option>
          <option value="Under Review">Under Review</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {applications.length > 0 ? (
        <div className="applicants-list">
          {applications.map(application => (
            <div key={application.id} className="applicant-card">
              <div className="applicant-header">
                <div className="applicant-info">
                  <h3>{application.applicantName}</h3>
                  <p className="applicant-job">{application.jobTitle}</p>
                  <div className="applicant-contact">
                    <span><FaEnvelope /> {application.applicantEmail}</span>
                    <span><FaPhone /> +1 234-567-8900</span>
                  </div>
                </div>
                <span className={`status-badge ${getStatusClass(application.status)}`}>
                  {application.status}
                </span>
              </div>

              <div className="applicant-details">
                <div className="detail-item">
                  <strong>Applied:</strong>
                  <span>{new Date(application.appliedDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <strong>Experience:</strong>
                  <span>{application.experience}</span>
                </div>
                <div className="detail-item">
                  <strong>Expected Salary:</strong>
                  <span>{application.expectedSalary}</span>
                </div>
              </div>

              <div className="applicant-actions">
                <button
                  className="action-btn view"
                  onClick={() => handleViewDetails(application)}
                >
                  <FaFileAlt /> View Details
                </button>
                {application.status !== 'Shortlisted' && (
                  <button
                    className="action-btn success"
                    onClick={() => handleStatusChange(application.id, 'Shortlisted')}
                  >
                    <FaCheck /> Shortlist
                  </button>
                )}
                {application.status !== 'Rejected' && (
                  <button
                    className="action-btn danger"
                    onClick={() => handleStatusChange(application.id, 'Rejected')}
                  >
                    <FaTimes /> Reject
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No applications yet</h3>
          <p>Applications will appear here once candidates apply to your jobs</p>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Application Details"
      >
        {selectedApplication && (
          <div className="application-modal-content">
            <div className="modal-section">
              <h3>Applicant Information</h3>
              <p><strong>Name:</strong> {selectedApplication.applicantName}</p>
              <p><strong>Email:</strong> {selectedApplication.applicantEmail}</p>
              <p><strong>Experience:</strong> {selectedApplication.experience}</p>
              <p><strong>Expected Salary:</strong> {selectedApplication.expectedSalary}</p>
            </div>

            <div className="modal-section">
              <h3>Cover Letter</h3>
              <p>{selectedApplication.coverLetter}</p>
            </div>

            <div className="modal-section">
              <h3>Resume</h3>
              <button
                className="download-resume-btn"
                disabled={!selectedApplication.resumeDownloadUrl}
                onClick={() => handleDownloadResume(selectedApplication)}
              >
                <FaFileAlt /> Download Resume ({selectedApplication.resume || "Not uploaded"})
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Applicants;
