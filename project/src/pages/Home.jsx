import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaUsers, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import { jobCategories } from '../data/mockJobs';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [stats, setStats] = useState({
    activeJobs: 0,
    companies: 0,
    jobSeekers: 0,
  });

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [jobsResponse, statsResponse] = await Promise.all([
          axios.get('/api/jobs/featured'),
          axios.get('/api/stats/home'),
        ]);

        setFeaturedJobs(jobsResponse.data);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Failed to load home data', error);
      }
    };

    loadHomeData();
  }, []);

  const handleSearch = (searchData) => {
    navigate('/jobs', { state: searchData });
  };

  const handleCategoryClick = (category) => {
    navigate('/jobs', { state: { category: category.name } });
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Dream <span className="highlight">Career</span> Today
          </h1>
          <p className="hero-subtitle">
            Connect with thousands of employers and discover opportunities that match your skills and aspirations
          </p>
          <div className="hero-search">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="hero-stats">
            <div className="stat-item">
                <FaBriefcase className="stat-icon" />
                <div>
                <h3>{stats.activeJobs}</h3>
                <p>Active Jobs</p>
              </div>
            </div>
            <div className="stat-item">
              <FaBuilding className="stat-icon" />
              <div>
                <h3>{stats.companies}</h3>
                <p>Companies</p>
              </div>
            </div>
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <div>
                <h3>{stats.jobSeekers}</h3>
                <p>Job Seekers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-jobs-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Jobs</h2>
            <p>Discover opportunities from top companies</p>
          </div>
          <div className="jobs-grid">
            {featuredJobs.length > 0 ? (
              featuredJobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))
            ) : (
              <div className="home-empty-state">
                <h3>No featured jobs yet</h3>
                <p>New active job posts will appear here automatically.</p>
              </div>
            )}
          </div>
          <div className="section-footer">
            <button className="view-all-btn" onClick={() => navigate('/jobs')}>
              View All Jobs
            </button>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Popular Categories</h2>
            <p>Explore jobs by category</p>
          </div>
          <div className="categories-grid">
            {jobCategories.map((category, index) => (
              <div
                key={index}
                className="category-card"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.count} Open Positions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose JobPortal</h2>
            <p>Your success is our priority</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <FaCheckCircle className="feature-icon" />
              <h3>Easy Job Search</h3>
              <p>Find relevant opportunities with our advanced search and filter options</p>
            </div>
            <div className="feature-card">
              <FaCheckCircle className="feature-icon" />
              <h3>Top Companies</h3>
              <p>Connect with leading employers across various industries</p>
            </div>
            <div className="feature-card">
              <FaCheckCircle className="feature-icon" />
              <h3>Quick Applications</h3>
              <p>Apply to multiple jobs with just a few clicks</p>
            </div>
            <div className="feature-card">
              <FaCheckCircle className="feature-icon" />
              <h3>Career Resources</h3>
              <p>Access tips, guides, and resources to boost your career</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Take the Next Step?</h2>
            <p>Join thousands of professionals who found their dream jobs through JobPortal</p>
            <div className="cta-buttons">
              <button className="cta-btn primary" onClick={() => navigate('/register')}>
                Get Started
              </button>
              <button className="cta-btn secondary" onClick={() => navigate('/jobs')}>
                Browse Jobs
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
