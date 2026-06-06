import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],
    allJobs: [],
    stats: {
  totalUsers: 0,
  totalJobs: 0,
  totalEmployers: 0,
  totalApplications: 0,
  newJobsThisWeek: 0,
  applicationsThisWeek: 0,
  activeJobs: 0,
},
    adminLoading: false,
    adminSuccess: false,
    adminError: false,
    adminErrorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allUsers = action.payload;
        state.adminError = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(getAllJobs.pending, (state, action) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = false;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allJobs = action.payload;
        state.adminError = false;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(getAdminStats.pending, (state) => {
        state.adminLoading = true;
        state.adminError = false;
      })
      .addCase(getAdminStats.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.stats = action.payload; // 👈 stats yahan store
      })
      .addCase(getAdminStats.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.adminSuccess = true;
        const user = state.allUsers.find((u) => u._id === action.payload.id);
        if (user) {
          user.status = action.payload.isActive ? "active" : "inactive";
        }
      })
      
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.adminSuccess = true;
        const user = state.allUsers.find((u) => u._id === action.payload.id);
        if (user) {
          user.role = action.payload.role;
        }
      })
      .addCase(deleteUser.pending, (state) => {
        state.adminLoading = true;
      })
      
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.allUsers = state.allUsers.filter(
          (u) => u._id !== action.payload
        );
      })
      
      .addCase(deleteUser.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      
      .addCase(adminDeleteJob.fulfilled, (state, action) => {
        state.allJobs = state.allJobs.filter(
          (job) => job._id !== action.payload
        );
      })
      
      .addCase(toggleJobStatus.fulfilled, (state, action) => {
        const index = state.allJobs.findIndex(
          (job) => job._id === action.payload._id
        );
        if (index !== -1) {
          state.allJobs[index] = action.payload;
        }
      })
  },
});
export default adminSlice.reducer;

//Fetch all Users: (Admin)
export const getAllUsers = createAsyncThunk(
  "FETCH/USERS/ADMIN",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await adminService.fetchAllUsers(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllJobs = createAsyncThunk(
  "FETCH/JOBS/ADMIN",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.fetchAllJobs(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAdminStats = createAsyncThunk(
  "FETCH/STATS/ADMIN",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.fetchAdminStats(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const toggleUserStatus = createAsyncThunk(
  "ADMIN/USER/STATUS",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const data = await adminService.toggleUserStatus(id, token);
      return { id, ...data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const changeUserRole = createAsyncThunk(
  "ADMIN/USER/ROLE",
  async ({ id, role }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const data = await adminService.changeUserRole(id, role, token);
      return { id, ...data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "ADMIN/DELETE_USER",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await adminService.deleteUser(id, token);
      return id; // 👈 frontend state se remove karne ke liye
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const adminDeleteJob = createAsyncThunk(
  "admin/deleteJob",
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.deleteJob(jobId, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
export const toggleJobStatus = createAsyncThunk(
  "admin/toggleJobStatus",
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.toggleJobStatus(jobId, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
