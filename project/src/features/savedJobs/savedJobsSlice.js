import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import savedJobsService from "./savedJobsService";

const initialState = {
  savedJobs: [],
  savedJobIds: [],
  isLoading: false,
};

// Toggle Save Job
export const toggleSaveJob = createAsyncThunk(
  "savedJobs/toggle",
  async (jobId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    await savedJobsService.toggleSaveJob(jobId, token);

    // 🔥 After toggle, refresh IDs + full list
    thunkAPI.dispatch(getSavedJobIds());
    thunkAPI.dispatch(getSavedJobs());

    return jobId;
  }
);

// Get Saved Jobs
export const getSavedJobs = createAsyncThunk(
  "savedJobs/get",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await savedJobsService.getSavedJobs(token);
  }
);

// Get Saved Job IDs
export const getSavedJobIds = createAsyncThunk(
  "savedJobs/ids",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await savedJobsService.getSavedJobIds(token);
  }
);

const savedJobsSlice = createSlice({
  name: "savedJobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSavedJobs.fulfilled, (state, action) => {
        state.savedJobs = action.payload;
      })
      .addCase(getSavedJobIds.fulfilled, (state, action) => {
        state.savedJobIds = action.payload;
      });
  },
});

export default savedJobsSlice.reducer;
