import axios from "axios";

const API_URL = "/api/applications/";

const applyForJob = async (jobId, data, token) => {
  const res = await axios.post(
    `${API_URL}${jobId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};



const getMyApplications = async (token) => {
  const res = await axios.get(API_URL + "my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
const getApplicantsByJob = async (jobId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}job/${jobId}`,
    config
  );

  return response.data;
};

const updateStatus = async (id, status, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(
    `${API_URL}${id}/status`,
    { status },
    config
  );

  return response.data;
};

export default {
  applyForJob,
  getMyApplications,
  getApplicantsByJob,
  updateStatus
};
