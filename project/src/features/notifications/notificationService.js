import axios from "axios";

const API_URL = "/api/notifications/";

const getNotifications = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getUnreadCount = async (token) => {
  const res = await axios.get(API_URL + "unread-count", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const markAsRead = async (id, token) => {
  const res = await axios.patch(
    `${API_URL}${id}/read`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

const markAllAsRead = async (token) => {
  const res = await axios.patch(
    API_URL + "read-all",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

const deleteNotification = async (id, token) => {
  const res = await axios.delete(`${API_URL}${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export default {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
