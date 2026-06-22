import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaTrash, FaCheckDouble, FaBell } from "react-icons/fa";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  removeNotification,
} from "../../features/notifications/notificationSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, isLoading, unreadCount } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "new_application":
        return "📩";
      case "application_shortlisted":
        return "✅";
      case "application_rejected":
        return "❌";
      case "application_interviewed":
        return "🎯";
      default:
        return "🔔";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <div>
          <h1>Notifications</h1>
          <p>
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            className="edit-profile-btn"
            onClick={() => dispatch(markAllNotificationsRead())}
          >
            <FaCheckDouble /> Mark All Read
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="empty-state">
          <p>Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="empty-state">
          <FaBell style={{ fontSize: "3rem", color: "#a0aec0", marginBottom: "15px" }} />
          <h3>No notifications yet</h3>
          <p>You'll receive notifications when there's activity on your applications or jobs</p>
        </div>
      ) : (
        <div className="applied-jobs-list">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className="application-card"
              style={{
                borderLeft: !notif.isRead ? "4px solid #667eea" : "4px solid transparent",
                background: !notif.isRead ? "#f0f4ff" : "#fff",
              }}
            >
              <div className="application-header">
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "1.5rem" }}>
                    {getNotificationIcon(notif.type)}
                  </span>
                  <div>
                    <h3 style={{ marginBottom: "4px" }}>{notif.title}</h3>
                    <p style={{ color: "#718096", margin: 0 }}>{notif.message}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {!notif.isRead && (
                    <button
                      className="action-btn view"
                      onClick={() => dispatch(markNotificationRead(notif._id))}
                      style={{ padding: "8px 12px" }}
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button
                    className="action-btn delete"
                    onClick={() => dispatch(removeNotification(notif._id))}
                    style={{ padding: "8px 12px" }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="application-footer">
                <span className="application-date">{formatDate(notif.createdAt)}</span>
                <span
                  className={`status-badge ${
                    notif.isRead ? "status-success" : "status-warning"
                  }`}
                >
                  {notif.isRead ? "Read" : "Unread"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
