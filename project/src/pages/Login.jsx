import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaBriefcase } from 'react-icons/fa';
import './Auth.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { loginUser } from '../features/auth/authSlice';
const Login = () => {
  const navigate = useNavigate();
  const {user,isLoading,isSuccess,isError,message}=useSelector(state=>state.auth)  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'jobseeker'
  });
  const [error, setError] = useState('');
const dispatch=useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
  };


  useEffect(() => {
    if (isError && message) {
      toast.error(message, { position: "top-center" });
    }
  
    if (isSuccess && user) {
      const role = user.role;
  
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "employer") {
        navigate("/dashboard/employer");
      } else {
        navigate("/dashboard/jobseeker");
      }
    }
    
  }, [user, isError, isSuccess, message, navigate]);
  
  
 if(isLoading){
  return(
  <Loader/>
  )
 }
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <FaBriefcase className="auth-logo" />
            <h1>Welcome Back</h1>
            <p>Login to your account</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Select Role</label>
              <div className="role-selector">
                <label className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value="jobseeker"
                    checked={formData.role === 'jobseeker'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  <span>Job Seeker</span>
                </label>
                <label className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value="employer"
                    checked={formData.role === 'employer'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  <span>Employer</span>
                </label>
                <label className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === 'admin'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  <span>Admin</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              Login
            </button>
          </form>

       

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
