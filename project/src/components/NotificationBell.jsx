import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBell, FaCheck, FaTrash, FaCheckDouble } from "react-icons/fa";
import {
  fetchNotifications,
  fetchUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
  removeNotification,
} from "../features/notifications/notificationSlice";
import "./NotificationBell.css";

const NotificationBell = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector(
    (state) => state.notifications
  );
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchUnreadCount());
      const interval = setInterval(() => {
        dispatch(fetchUnreadCount());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (isOpen && user) {
      dispatch(fetchNotifications());
    }
  }, [isOpen, dispatch, user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsRead());
  };

  const handleDelete = (id) => {
    dispatch(removeNotification(id));
  };

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

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (!user) return null;

  return (
    <div className="notification-bell-container" ref={dropdownRef}>
      <button
        className="notification-bell-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBell />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-dropdown-header">
            <h4>Notifications</h4>
            {unreadCount > 0 && (
              <button className="mark-all-btn" onClick={handleMarkAllRead}>
                <FaCheckDouble /> Mark all read
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty">
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`notification-item ${!notif.isRead ? "unread" : ""}`}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notif.type)}
                  </div>
                  <div className="notification-content">
                    <p className="notification-title">{notif.title}</p>
                    <p className="notification-message">{notif.message}</p>
                    <span className="notification-time">
                      {timeAgo(notif.createdAt)}
                    </span>
                  </div>
                  <div className="notification-actions">
                    {!notif.isRead && (
                      <button
                        className="notif-action-btn"
                        onClick={() => handleMarkRead(notif._id)}
                        title="Mark as read"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      className="notif-action-btn delete"
                      onClick={() => handleDelete(notif._id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
