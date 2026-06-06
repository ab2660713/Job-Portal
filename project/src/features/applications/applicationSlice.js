import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import applicationService from "./applicationService";

const initialState = {
  applications: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// APPLY FOR JOB
export const applyForJob = createAsyncThunk(
  "applications/apply",
  async ({ jobId, data }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await applicationService.applyForJob(jobId, data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "You have already applied"
      );
    }
  }
);

// GET MY APPLICATIONS
export const getMyApplications = createAsyncThunk(
  "applications/my",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await applicationService.getMyApplications(token);
  }
);
// GET APPLICANTS BY JOB (Employer)
export const fetchApplicants = createAsyncThunk(
  "applications/getByJob",
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await applicationService.getApplicantsByJob(jobId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// UPDATE APPLICATION STATUS (Employer)
export const changeApplicationStatus = createAsyncThunk(
  "applications/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await applicationService.updateStatus(id, status, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);
const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    resetApplicationState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // APPLY
      .addCase(applyForJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applications.push(action.payload.application); 
        state.message = action.payload.message;
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // GET MY APPLICATIONS
      .addCase(getMyApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = action.payload;
      })
      .addCase(getMyApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // FETCH APPLICANTS (Employer)
.addCase(fetchApplicants.pending, (state) => {
  state.isLoading = true;
})
.addCase(fetchApplicants.fulfilled, (state, action) => {
  state.isLoading = false;
  state.applications = action.payload;
})
.addCase(fetchApplicants.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
})

// UPDATE STATUS
.addCase(changeApplicationStatus.fulfilled, (state, action) => {
  state.isSuccess = true;
})
  },
});

export const { resetApplicationState } = applicationSlice.actions;
export default applicationSlice.reducer;
