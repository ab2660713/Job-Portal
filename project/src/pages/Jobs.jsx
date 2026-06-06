import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import JobCard from "../components/JobCard";
import { searchJobs } from "../features/jobs/jobSlice";
import "./Jobs.css";

const Jobs = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { jobs, isLoading } = useSelector((state) => state.jobs);
  const [searchData, setSearchData] = useState(location.state || {});
  const [filters, setFilters] = useState({
    jobType: [],
    experience: [],
    location: [],
    category: [],
  });

  const handleSearch = (data) => {
    setSearchData(data);
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  useEffect(() => {
    dispatch(searchJobs({ ...searchData, ...filters }));
  }, [dispatch, searchData, filters]);

  if (isLoading) {
    return <p className="loading">Loading jobs...</p>;
  }

  return (
    <div className="jobs-page">
      <div className="jobs-search-section">
        <div className="container">
          <h1>Find Your Perfect Job</h1>
          <SearchBar onSearch={handleSearch}/>
        </div>
      </div>

      <div className="jobs-content">
        <div className="container">
          <div className="jobs-layout">
            <aside className="jobs-sidebar">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </aside>

            <main className="jobs-main">
              <div className="jobs-header">
                <h2>{jobs.length} Jobs Found</h2>
              </div>

              {jobs.length > 0 ? (
                <div className="jobs-list">
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="no-jobs-found">
                  <h3>No jobs found</h3>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
