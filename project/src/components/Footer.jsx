import { Link } from 'react-router-dom';
import { FaBriefcase, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-brand">
            <FaBriefcase className="footer-logo-icon" />
            <h3>JobPortal</h3>
          </div>
          <p className="footer-description">
            Your gateway to finding the perfect career opportunity. Connect with top employers and advance your professional journey.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon"><FaFacebook /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaLinkedin /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>For Job Seekers</h4>
          <ul className="footer-links">
            <li><Link to="/jobs">Browse Jobs</Link></li>
            <li><Link to="/register">Create Account</Link></li>
            <li><Link to="/dashboard/jobseeker">My Dashboard</Link></li>
            <li><a href="#">Career Resources</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>For Employers</h4>
          <ul className="footer-links">
            <li><Link to="/register">Post a Job</Link></li>
            <li><Link to="/dashboard/employer">Employer Dashboard</Link></li>
            <li><a href="#">Pricing Plans</a></li>
            <li><a href="#">Success Stories</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 JobPortal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
