import axios from "axios";

const API_URL = "/api/users/";

// GET Jobseeker Profile
const getMyProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "profile", config);
  return response.data;
};

// UPDATE Jobseeker Profile
const updateMyProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "profile", profileData, config);
  return response.data;
};

// GET Employer Profile
const getEmployerProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL + "employer/profile",
    config
  );
  return response.data;
};

// UPDATE Employer Profile
const updateEmployerProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "employer/profile",
    profileData,
    config
  );
  return response.data;
};

const profileService = {
  getMyProfile,
  updateMyProfile,
  getEmployerProfile,
  updateEmployerProfile,
};

export default profileService;
