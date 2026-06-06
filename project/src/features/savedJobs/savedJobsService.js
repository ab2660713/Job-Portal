import axios from "axios";

const API_URL = "/api/saved-jobs/";

// Toggle Save Job
const toggleSaveJob = async (jobId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post(API_URL + jobId, {}, config);
  return response.data;
};

// Get Saved Jobs
const getSavedJobs = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get Saved Job IDs
const getSavedJobIds = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(API_URL + "ids", config);
  return response.data;
};

export default {
  toggleSaveJob,
  getSavedJobs,
  getSavedJobIds,
};
