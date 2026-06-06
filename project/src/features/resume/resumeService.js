import axios from "axios";

const API_URL = "/api/resume/";

// Upload Resume
const uploadResume = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, formData, config);
  return response.data;
};


// Get My Resume
const getMyResume = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  
  const response = await axios.get(API_URL, config);
  return response.data;
};
const downloadResume = async (token) => {
  const response = await axios.get(API_URL + "download", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob", // 🔥 VERY IMPORTANT
  });

  return response.data; // blob return hoga
};
// Delete Resume
const deleteResume = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.delete(API_URL, config);
  return response.data;
};

const resumeService = {
  uploadResume,
  getMyResume,
  deleteResume,
  downloadResume
};

export default resumeService;
