import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBriefcase, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const dispatch=useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  const getProfileRoute = () => {
    const role = user?.role;
  
    if (role === "admin") return "/admin";
    if (role === "employer") return "/dashboard/employer";
    return "/dashboard/jobseeker";
  };
    
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <FaBriefcase className="logo-icon" />
          <span>JobPortal</span>
        </Link>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={mobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="nav-link" onClick={closeMobileMenu}>
              Find Jobs
            </Link>
          </li>

          {!user ? (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link-button" onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              {user.role === 'jobseeker' && (
                <li className="nav-item">
                  <Link to="/dashboard/jobseeker" className="nav-link" onClick={closeMobileMenu}>
                    Dashboard
                  </Link>
                </li>
              )}

              {user.role === 'employer' && (
                <li className="nav-item">
                  <Link to="/dashboard/employer" className="nav-link" onClick={closeMobileMenu}>
                    Dashboard
                  </Link>
                </li>
              )}

              {user.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link" onClick={closeMobileMenu}>
                    Admin Panel
                  </Link>
                </li>
              )}

              <li className="nav-item nav-user">
  <Link
    to={getProfileRoute()}
    onClick={closeMobileMenu}
    className="flex items-center gap-2 text-white no-underline"
  >
    <FaUser className="user-icon" />
    <span className="user-name">{user.name}</span>
  </Link>
</li>

              <li className="nav-item">
                <Link to={"/"} className="nav-link-button logout" onClick={()=>handleLogout()}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
