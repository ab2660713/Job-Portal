import axios from "axios";

const API_URL = "/api/jobs/";

// CREATE JOB (Employer)
const createJob = async (jobData, token) => {
  const res = await axios.post(API_URL, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// GET MY JOBS (Employer)
const getMyJobs = async (token) => {
  const res = await axios.get(API_URL + "my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// DELETE JOB
const deleteJob = async (jobId, token) => {
  const res = await axios.delete(API_URL + jobId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// GET ALL JOBS (Public)
const getAllJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const searchJobs = async (searchData) => {
  const response = await axios.get(API_URL + "search", {
    params: searchData,
  });

  return response.data;
};
// 🔥 GET SINGLE JOB BY ID (THIS FIXES YOUR ERROR)
const getJobById = async (jobId) => {
  const response = await axios.get(API_URL + jobId);
  return response.data;
};
const updateJob = async (jobId, jobData, token) => {
  const res = await axios.put(`/api/jobs/${jobId}`, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
const toggleJobStatus = async (jobId, token) => {
  const res = await axios.patch(`/api/jobs/${jobId}/status`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
const jobService = {
  createJob,
  getMyJobs,
  deleteJob,
  getAllJobs,
  getJobById,
  searchJobs,
  updateJob,
  toggleJobStatus
};

export default jobService;
