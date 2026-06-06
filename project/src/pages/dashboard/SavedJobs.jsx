import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedJobs } from "../../features/savedJobs/savedJobsSlice";
import JobCard from "../../components/JobCard";
import { Link } from "react-router-dom";

const SavedJobs = () => {
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((state) => state.savedJobs);

  useEffect(() => {
    dispatch(getSavedJobs());
  }, [dispatch]);

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <div>
          <h1>Saved Jobs</h1>
          <p>Jobs you have bookmarked for later</p>
        </div>
      </div>

      {savedJobs.length > 0 ? (
        <div className="jobs-grid">
          {savedJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No saved jobs</h3>
          <p>Save jobs you're interested in to view them later</p>

          <Link to="/jobs" className="browse-jobs-btn">
            Browse Jobs
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
