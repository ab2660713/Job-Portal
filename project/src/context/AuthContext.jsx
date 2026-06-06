import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockUsers';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.role === 'jobseeker' && parsedUser.savedJobs) {
        setSavedJobs(parsedUser.savedJobs);
      }
    }
  }, []);

  const login = (email, password, role) => {
    let userData;

    if (role === 'jobseeker') {
      userData = mockUsers.jobSeeker;
    } else if (role === 'employer') {
      userData = mockUsers.employer;
    } else if (role === 'admin') {
      userData = mockUsers.admin;
    }

    if (userData && userData.email === email) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      if (userData.savedJobs) {
        setSavedJobs(userData.savedJobs);
      }
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      savedJobs: [],
      appliedJobs: []
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setSavedJobs([]);
    localStorage.removeItem('user');
  };

  const saveJob = (jobId) => {
    if (!savedJobs.includes(jobId)) {
      const updatedSavedJobs = [...savedJobs, jobId];
      setSavedJobs(updatedSavedJobs);

      const updatedUser = {
        ...user,
        savedJobs: updatedSavedJobs
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const unsaveJob = (jobId) => {
    const updatedSavedJobs = savedJobs.filter(id => id !== jobId);
    setSavedJobs(updatedSavedJobs);

    const updatedUser = {
      ...user,
      savedJobs: updatedSavedJobs
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const isJobSaved = (jobId) => {
    return savedJobs.includes(jobId);
  };

  const value = {
    user,
    login,
    logout,
    register,
    saveJob,
    unsaveJob,
    isJobSaved,
    savedJobs
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
