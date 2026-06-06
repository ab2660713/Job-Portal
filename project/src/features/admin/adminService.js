import axios from "axios";

const API_URL = "/api/admin/";

const fetchAllUsers = async (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "users", options);
  
  return response.data;
};

const fetchAllJobs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/admin/jobs", config);
  return response.data;
};

const fetchAdminStats = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "stats", config);
  return response.data;
};
const toggleUserStatus = async (id, token) => {
  const res = await axios.put(
    `/api/admin/user/status/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

const changeUserRole = async (id, role, token) => {
  const res = await axios.put(
    `/api/admin/user/role/${id}`,
    { role },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
const deleteUser = async (id, token) => {
  const res = await axios.delete(
    `/api/admin/user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
const toggleJobStatus = async (id, token) => {
  const res = await axios.patch(
    `/api/admin/jobs/${id}/status`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};

const deleteJob = async (id, token) => {
  const res = await axios.delete(
    `/api/admin/jobs/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return id; // 👈 IMPORTANT
};

const adminService = {
  fetchAllUsers,
  fetchAllJobs,
  fetchAdminStats,
  toggleUserStatus,
  changeUserRole,deleteUser,
  toggleJobStatus,
  deleteJob
};

export default adminService;
