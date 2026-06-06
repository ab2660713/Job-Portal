import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';
import { fetchMyJobs } from '../../features/jobs/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createJobPost } from '../../features/jobs/jobSlice';
const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: 'Full-time',
    location: '',
    experience: '',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: ''
  });
const dispatch=useDispatch()
const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(createJobPost(formData));
};

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const user=useSelector((state)=>state.auth)
  const { isSuccess } = useSelector((state) => state.jobs);

useEffect(() => {
  if (isSuccess) {
    alert("Job posted successfully!");
    navigate('/dashboard/employer/manage-jobs');
  }
}, [isSuccess, navigate]);
  
  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <div>
          <h1>Post a New Job</h1>
          <p>Fill in the details to create a job posting</p>
        </div>
      </div>

      <div className="profile-card">
        <form onSubmit={handleSubmit} className="job-form">
          <div className="form-row">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Senior Software Engineer"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleInputChange} required>
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Data Science">Data Science</option>
                <option value="Product">Product</option>
                <option value="Content">Content</option>
                <option value="Security">Security</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Type *</label>
              <select name="type" value={formData.type} onChange={handleInputChange} required>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., San Francisco, CA or Remote"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Experience Required *</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 3-5 years"
                required
              />
            </div>

            <div className="form-group">
              <label>Salary Range *</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g., $80k - $120k"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Job Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide a detailed description of the role..."
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Requirements *</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              placeholder="List the requirements (one per line)..."
              rows="5"
              required
            />
            <small>Enter each requirement on a new line</small>
          </div>

          <div className="form-group">
            <label>Responsibilities *</label>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleInputChange}
              placeholder="List the key responsibilities (one per line)..."
              rows="5"
              required
            />
            <small>Enter each responsibility on a new line</small>
          </div>

          <div className="form-group">
            <label>Benefits</label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleInputChange}
              placeholder="List the benefits (one per line)..."
              rows="4"
            />
            <small>Enter each benefit on a new line</small>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate('/dashboard/employer')}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              <FaBriefcase /> Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
