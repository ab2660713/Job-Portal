import { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaFileAlt, FaCheck, FaTimes, FaMapMarkerAlt, FaDownload, FaUser, FaCalendarAlt } from 'react-icons/fa';
import Modal from '../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { changeApplicationStatus, fetchApplicants } from '../../features/applications/applicationSlice';
import { useParams } from 'react-router-dom';

const Applicants = () => {
  const dispatch = useDispatch();
  const { applications, isLoading } = useSelector((state) => state.applications);
  const user = useSelector((state) => state.auth.user);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const { jobId } = useParams();

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleStatusChange = (applicationId, newStatus) => {
    dispatch(changeApplicationStatus({ id: applicationId, status: newStatus }))
      .then(() => {
        dispatch(fetchApplicants(jobId));
      });
  };

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

  const filteredApplications = statusFilter
    ? applications.filter((app) => app.status === statusFilter)
    : applications;

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <div>
          <h1>Job Applicants</h1>
          <p>Review and manage applications ({applications.length} total)</p>
        </div>
      </div>

      <div className="applicants-filters">
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status ({applications.length})</option>
          <option value="Under Review">Under Review</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {isLoading ? (
        <div className="empty-state">
          <p>Loading applicants...</p>
        </div>
      ) : filteredApplications.length > 0 ? (
        <div className="applicants-list">
          {filteredApplications.map(application => (
            <div key={application.id} className="applicant-card">
              <div className="applicant-header">
                <div className="applicant-info">
                  <h3>{application.applicantName}</h3>
                  {application.applicantTitle && (
                    <p className="applicant-job">{application.applicantTitle}</p>
                  )}
                  <div className="applicant-contact">
                    <span><FaEnvelope /> {application.applicantEmail}</span>
                    {application.applicantPhone && (
                      <span><FaPhone /> {application.applicantPhone}</span>
                    )}
                    {application.applicantLocation && (
                      <span><FaMapMarkerAlt /> {application.applicantLocation}</span>
                    )}
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
                {application.applicantExperience && (
                  <div className="detail-item">
                    <strong>Experience:</strong>
                    <span>{application.applicantExperience}</span>
                  </div>
                )}
                <div className="detail-item">
                  <strong>Expected Salary:</strong>
                  <span>{application.expectedSalary}</span>
                </div>
                {application.availableFrom && (
                  <div className="detail-item">
                    <strong>Available From:</strong>
                    <span>{new Date(application.availableFrom).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {application.applicantSkills && application.applicantSkills.length > 0 && (
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#4a5568' }}>Skills:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {application.applicantSkills.map((skill, i) => (
                      <span key={i} style={{
                        background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                        color: '#667eea',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="applicant-actions">
                <button
                  className="action-btn view"
                  onClick={() => handleViewDetails(application)}
                >
                  <FaUser /> View Details
                </button>
                {application.resumeDownloadUrl && (
                  <button
                    className="action-btn download"
                    onClick={() => handleDownloadResume(application)}
                  >
                    <FaDownload /> Resume
                  </button>
                )}
                {application.status !== 'Shortlisted' && application.status !== 'Rejected' && (
                  <button
                    className="action-btn success"
                    onClick={() => handleStatusChange(application.id, 'Shortlisted')}
                  >
                    <FaCheck /> Shortlist
                  </button>
                )}
                {application.status !== 'Interviewed' && application.status !== 'Rejected' && (
                  <button
                    className="action-btn edit"
                    onClick={() => handleStatusChange(application.id, 'Interviewed')}
                  >
                    <FaCalendarAlt /> Interview
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
              {selectedApplication.applicantPhone && (
                <p><strong>Phone:</strong> {selectedApplication.applicantPhone}</p>
              )}
              {selectedApplication.applicantLocation && (
                <p><strong>Location:</strong> {selectedApplication.applicantLocation}</p>
              )}
              {selectedApplication.applicantTitle && (
                <p><strong>Job Title:</strong> {selectedApplication.applicantTitle}</p>
              )}
              {selectedApplication.applicantExperience && (
                <p><strong>Experience:</strong> {selectedApplication.applicantExperience}</p>
              )}
              <p><strong>Expected Salary:</strong> {selectedApplication.expectedSalary}</p>
              {selectedApplication.availableFrom && (
                <p><strong>Available From:</strong> {new Date(selectedApplication.availableFrom).toLocaleDateString()}</p>
              )}
            </div>

            {selectedApplication.applicantSkills && selectedApplication.applicantSkills.length > 0 && (
              <div className="modal-section">
                <h3>Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedApplication.applicantSkills.map((skill, i) => (
                    <span key={i} style={{
                      background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                      color: '#667eea',
                      padding: '6px 14px',
                      borderRadius: '15px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-section">
              <h3>Cover Letter</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{selectedApplication.coverLetter}</p>
            </div>

            <div className="modal-section">
              <h3>Resume</h3>
              {selectedApplication.resumeDownloadUrl ? (
                <button
                  className="download-resume-btn"
                  onClick={() => handleDownloadResume(selectedApplication)}
                >
                  <FaDownload /> Download Resume ({selectedApplication.resume})
                </button>
              ) : (
                <p style={{ color: '#a0aec0', fontStyle: 'italic' }}>No resume uploaded</p>
              )}
            </div>

            <div className="modal-section">
              <h3>Update Status</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {selectedApplication.status !== 'Shortlisted' && (
                  <button
                    className="action-btn success"
                    onClick={() => {
                      handleStatusChange(selectedApplication.id, 'Shortlisted');
                      setShowModal(false);
                    }}
                  >
                    <FaCheck /> Shortlist
                  </button>
                )}
                {selectedApplication.status !== 'Interviewed' && (
                  <button
                    className="action-btn edit"
                    onClick={() => {
                      handleStatusChange(selectedApplication.id, 'Interviewed');
                      setShowModal(false);
                    }}
                  >
                    <FaCalendarAlt /> Interview
                  </button>
                )}
                {selectedApplication.status !== 'Rejected' && (
                  <button
                    className="action-btn danger"
                    onClick={() => {
                      handleStatusChange(selectedApplication.id, 'Rejected');
                      setShowModal(false);
                    }}
                  >
                    <FaTimes /> Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Applicants;
