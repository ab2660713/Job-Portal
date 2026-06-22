import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaDollarSign,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSaveJob } from "../features/savedJobs/savedJobsSlice";
import "./JobCard.css";

const JobCard = ({ job }) => {
  const dispatch = useDispatch();

  const { savedJobIds } = useSelector((state) => state.savedJobs);
  const { user } = useSelector((state) => state.auth);

  const isSaved = savedJobIds?.some(
    (id) => id.toString() === job._id.toString()
  );
  

  const handleSaveJob = (e) => {
    e.preventDefault();
    dispatch(toggleSaveJob(job._id));
  };
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-card-title-section">
          <h3 className="job-title">
            <Link to={`/jobs/${job._id}`}>{job.title}</Link>
          </h3>

          <p className="company-name">
            {job.createdBy?.companyName || "Company"}
          </p>
        </div>

        {user?.role === "jobseeker" && (
          <button
            className={`save-job-btn ${isSaved ? "saved" : ""}`}
            onClick={handleSaveJob}
            title={isSaved ? "Unsave job" : "Save job"}
          >
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        )}
      </div>

      <div className="job-card-details">
        <div className="job-detail-item">
          <FaMapMarkerAlt />
          <span>{job.location}</span>
        </div>

        <div className="job-detail-item">
          <FaBriefcase />
          <span>{job.type}</span>
        </div>

        <div className="job-detail-item">
          <FaClock />
          <span>{job.experience}</span>
        </div>

        <div className="job-detail-item">
          <FaDollarSign />
          <span>{job.salary}</span>
        </div>
      </div>

      <p className="job-description">
        {job.description?.substring(0, 150)}...
      </p>

      <div className="job-card-footer">
        <span className="job-category">{job.category}</span>
        <span className="job-posted-date">
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
      </div>

      <Link to={`/jobs/${job._id}`} className="view-job-btn">
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
