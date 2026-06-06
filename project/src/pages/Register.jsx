import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaBriefcase, FaPhone, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Auth.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { registerUser } from '../features/auth/authSlice';
const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const {user,isLoading,isSuccess,isError,message}=useSelector(state=>state.auth)
//  console.log(user)
  const [formData, setFormData] = useState({
    role: 'jobseeker',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    companyName: '',
    title: ''
  });
  const [error, setError] = useState('');
  const dispatch=useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
  
    dispatch(registerUser(formData));
  };
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    if(isSuccess&&user){
      navigate("/")
    }
     if(isError&&message){
      toast.error(message,{position:"top-center"})
     }
  },[isError,message,user])
 if(isLoading){
  return(
  <Loader/>
  )
 }
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card register-card">
          <div className="auth-header">
            <FaBriefcase className="auth-logo" />
            <h1>Create Account</h1>
            <p>Join JobPortal today</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>I want to</label>
              <div className="role-selector">
                <label className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value="jobseeker"
                    checked={formData.role === 'jobseeker'}
                    onChange={handleInputChange}
                  />
                  <span>Find a Job</span>
                </label>
                <label className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value="employer"
                    checked={formData.role === 'employer'}
                    onChange={handleInputChange}
                  />
                  <span>Hire Talent</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>{formData.role === 'employer' ? 'Contact Name' : 'Full Name'}</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            {formData.role === 'employer' && (
              <div className="form-group">
                <label>Company Name</label>
                <div className="input-with-icon">
                  <FaBuilding className="input-icon" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    required
                  />
                </div>
              </div>
            )}

            {formData.role === 'jobseeker' && (
              <div className="form-group">
                <label>Professional Title</label>
                <div className="input-with-icon">
                  <FaBriefcase className="input-icon" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Developer"
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-with-icon">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <div className="input-with-icon">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
