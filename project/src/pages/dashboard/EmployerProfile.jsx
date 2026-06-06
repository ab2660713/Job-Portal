import { useState } from 'react';
import { FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaEdit } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const EmployerProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    companyName: user?.companyName || '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    website: user?.website || '',
    companySize: user?.companySize || '',
    industry: user?.industry || '',
    description: user?.description || ''
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <div>
          <h1>Company Profile</h1>
          <p>Manage your company information</p>
        </div>
        <button
          className="edit-profile-btn"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          <FaEdit /> {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-number">{user?.postedJobs?.length || 0}</div>
          <div className="stat-label">Posted Jobs</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">23</div>
          <div className="stat-label">Total Applicants</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5</div>
          <div className="stat-label">Active Jobs</div>
        </div>
      </div>

      <div className="profile-card">
        <h2>Company Information</h2>
        <div className="profile-grid">
          <div className="profile-field">
            <label><FaBuilding /> Company Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.companyName}
                onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
              />
            ) : (
              <p>{profileData.companyName}</p>
            )}
          </div>

          <div className="profile-field">
            <label><FaBuilding /> Industry</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.industry}
                onChange={(e) => setProfileData({ ...profileData, industry: e.target.value })}
              />
            ) : (
              <p>{profileData.industry}</p>
            )}
          </div>

          <div className="profile-field">
            <label><FaBuilding /> Company Size</label>
            {isEditing ? (
              <select
                value={profileData.companySize}
                onChange={(e) => setProfileData({ ...profileData, companySize: e.target.value })}
              >
                <option value="">Select Size</option>
                <option value="1-10 employees">1-10 employees</option>
                <option value="11-50 employees">11-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option value="201-500 employees">201-500 employees</option>
                <option value="501+ employees">501+ employees</option>
              </select>
            ) : (
              <p>{profileData.companySize}</p>
            )}
          </div>

          <div className="profile-field">
            <label><FaGlobe /> Website</label>
            {isEditing ? (
              <input
                type="url"
                value={profileData.website}
                onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
              />
            ) : (
              <p>{profileData.website}</p>
            )}
          </div>

          <div className="profile-field">
            <label><FaMapMarkerAlt /> Location</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
              />
            ) : (
              <p>{profileData.location}</p>
            )}
          </div>

          <div className="profile-field">
            <label><FaPhone /> Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            ) : (
              <p>{profileData.phone}</p>
            )}
          </div>
        </div>
      </div>

      <div className="profile-card">
        <h2>Contact Person</h2>
        <div className="profile-grid">
          <div className="profile-field">
            <label><FaEnvelope /> Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            ) : (
              <p>{profileData.name}</p>
            )}
          </div>

          <div className="profile-field">
            <label><FaEnvelope /> Email</label>
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            ) : (
              <p>{profileData.email}</p>
            )}
          </div>
        </div>
      </div>

      <div className="profile-card">
        <h2>Company Description</h2>
        {isEditing ? (
          <textarea
            value={profileData.description}
            onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
            rows="6"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
        ) : (
          <p style={{ lineHeight: '1.6', color: '#4a5568' }}>
            {profileData.description || 'No description provided'}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;
