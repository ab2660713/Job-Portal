import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "./notificationService";

const initialState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await notificationService.getNotifications(token);
  }
);

export const fetchUnreadCount = createAsyncThunk(
  "notifications/unreadCount",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await notificationService.getUnreadCount(token);
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markRead",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    await notificationService.markAsRead(id, token);
    return id;
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  "notifications/markAllRead",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    await notificationService.markAllAsRead(token);
  }
);

export const removeNotification = createAsyncThunk(
  "notifications/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    await notificationService.deleteNotification(id, token);
    return id;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.isRead).length;
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload.count;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const notif = state.notifications.find((n) => n._id === action.payload);
        if (notif) {
          notif.isRead = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.notifications.forEach((n) => (n.isRead = true));
        state.unreadCount = 0;
      })
      .addCase(removeNotification.fulfilled, (state, action) => {
        const removed = state.notifications.find((n) => n._id === action.payload);
        if (removed && !removed.isRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications = state.notifications.filter(
          (n) => n._id !== action.payload
        );
      });
  },
});

export default notificationSlice.reducer;
