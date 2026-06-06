import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadResume,
  getMyResume,
  deleteMyResume,
} from "../../features/resume/resumeSlice";
import { FaFileUpload, FaFilePdf, FaTrash, FaDownload } from "react-icons/fa";

const Resume = () => {
  const dispatch = useDispatch();
  const { resume, isLoading } = useSelector((state) => state.resume);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user?.token) {
      dispatch(getMyResume());
    }
  }, [dispatch, user]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file || file.type !== "application/pdf") {
      alert("Only PDF files allowed");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    console.log(user);
    dispatch(uploadResume(formData));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete resume?")) {
      dispatch(deleteMyResume());
    }
  };

  const handleDownload = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiBaseUrl}/api/resume/download`, {
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
      a.download = resume.originalName || "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Download failed");
    }
  };
  

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <div>
          <h1>Resume Management</h1>
          <p>Upload and manage your resume</p>
        </div>
      </div>

      <div className="resume-section">
        <div className="upload-area">
          <FaFileUpload className="upload-icon" />
          <h3>Upload Your Resume</h3>
          <p>Supported format: PDF (Max size: 5MB)</p>

          <label htmlFor="resume-upload" className="upload-btn">
            Choose File
            <input
              id="resume-upload"
              type="file"
              accept=".pdf"
              hidden
              onChange={handleFileChange}
            />
          </label>
        </div>

        {isLoading && <p>Loading...</p>}

        {resume && (
          <div className="resume-preview">
            <div className="resume-file">
              <FaFilePdf className="file-icon" />

              <div className="file-info">
                <h4>{resume.originalName || "My Resume.pdf"}</h4>
                <p>Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}</p>

              </div>

              <div className="file-actions">
                <button className="action-btn download" onClick={handleDownload}>
                  <FaDownload /> Download
                </button>

                <button className="action-btn delete" onClick={handleDelete}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {!resume && <p className="no-data">No resume uploaded yet</p>}
      </div>
    </div>
  );
};

export default Resume;
