import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaEdit,
} from "react-icons/fa";
import {
  getMyProfile,
  updateMyProfile,
} from "../../features/profile/profileSlice";

const JobSeekerProfile = () => {
  const dispatch = useDispatch();

  const { profile, profileComplete, isLoading } = useSelector(
    (state) => state.profile
  );

  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    experience: "",
    skills: [],
  });

  const [newSkill, setNewSkill] = useState("");

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  /* ================= SET LOCAL STATE ================= */
  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        title: profile.title || "",
        experience: profile.experience || "",
        skills: profile.skills || [],
      });
    }
  }, [profile]);

  /* ================= SAVE PROFILE ================= */
  const handleSave = () => {
    dispatch(updateMyProfile(profileData));
    setIsEditing(false);
  };

  /* ================= SKILLS ================= */
  const handleAddSkill = () => {
    if (
      newSkill.trim() &&
      !profileData.skills.includes(newSkill.trim())
    ) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((s) => s !== skill),
    });
  };

  if (isLoading) {
    return <p className="loading">Loading profile...</p>;
  }

  return (
    <div className="dashboard-section">
      {/* ================= HEADER ================= */}
      <div className="dashboard-header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal information</p>
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          <FaEdit /> {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-number">{profileComplete}%</div>
          <div className="stat-label">Profile Complete</div>
        </div>
      </div>

      {/* ================= PERSONAL INFO ================= */}
      <div className="profile-card">
        <h2>Personal Information</h2>

        <div className="profile-grid">
          <div className="profile-field">
            <label>
              <FaUser /> Full Name
            </label>
            {isEditing ? (
              <input
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
              />
            ) : (
              <p>{profileData.name}</p>
            )}
          </div>

          <div className="profile-field">
            <label>
              <FaEnvelope /> Email
            </label>
            {isEditing ? (
              <input
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
            ) : (
              <p>{profileData.email}</p>
            )}
          </div>

          <div className="profile-field">
            <label>
              <FaPhone /> Phone
            </label>
            {isEditing ? (
              <input
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
              />
            ) : (
              <p>{profileData.phone}</p>
            )}
          </div>

          <div className="profile-field">
            <label>
              <FaMapMarkerAlt /> Location
            </label>
            {isEditing ? (
              <input
                value={profileData.location}
                onChange={(e) =>
                  setProfileData({ ...profileData, location: e.target.value })
                }
              />
            ) : (
              <p>{profileData.location}</p>
            )}
          </div>

          <div className="profile-field">
            <label>
              <FaBriefcase /> Professional Title
            </label>
            {isEditing ? (
              <input
                value={profileData.title}
                onChange={(e) =>
                  setProfileData({ ...profileData, title: e.target.value })
                }
              />
            ) : (
              <p>{profileData.title}</p>
            )}
          </div>

          <div className="profile-field">
            <label>
              <FaBriefcase /> Experience
            </label>
            {isEditing ? (
              <input
                value={profileData.experience}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    experience: e.target.value,
                  })
                }
              />
            ) : (
              <p>{profileData.experience}</p>
            )}
          </div>
        </div>
      </div>

      {/* ================= SKILLS ================= */}
      <div className="profile-card">
        <h2>Skills</h2>

        {isEditing && (
          <div className="add-skill-section">
            <input
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
            />
            <button onClick={handleAddSkill}>Add</button>
          </div>
        )}

        <div className="skills-container">
          {profileData.skills.length > 0 ? (
            profileData.skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill}
                {isEditing && (
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="remove-skill-btn"
                  >
                    ×
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="no-data">No skills added yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
