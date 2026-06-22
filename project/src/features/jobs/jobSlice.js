  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import jobService from "./jobService";

  const initialState = {
    jobs: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  };

  // CREATE JOB
  export const createJobPost = createAsyncThunk(
    "jobs/create",
    async (jobData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await jobService.createJob(jobData, token);
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message || err.message
        );
      }
    }
  );

  // GET EMPLOYER JOBS
  export const fetchMyJobs = createAsyncThunk(
    "jobs/my",
    async (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth?.user?.token;
  
      return await jobService.getMyJobs(token);
    }
  );
  export const getAllJobs = createAsyncThunk(
    "jobs/getAll",
    async (_, thunkAPI) => {
      try {
        return await jobService.getAllJobs();
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  // 🔥 GET JOB BY ID (THIS WAS MISSING)
  export const getJobById = createAsyncThunk(
    "jobs/getById",
    async (jobId, thunkAPI) => {
      try {
        return await jobService.getJobById(jobId);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  // DELETE JOB
  export const removeJob = createAsyncThunk(
    "jobs/delete",
    async (jobId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
  
        return await jobService.deleteJob(jobId, token);
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data?.message || err.message
        );
      }
    }
  );
  export const editJob = createAsyncThunk(
    "jobs/edit",
    async ({ jobId, jobData }, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await jobService.updateJob(jobId, jobData, token);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  export const searchJobs = createAsyncThunk(
    "jobs/search",
    async (searchData, thunkAPI) => {
      return await jobService.searchJobs(searchData);
    }
  );
  export const toggleJob = createAsyncThunk(
    "jobs/toggle",
    async (jobId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await jobService.toggleJobStatus(jobId, token);
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message);
      }
    }
  );
  const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
      resetJobState: (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      },
    },
    
    extraReducers: (builder) => {
      builder
        // CREATE JOB
        .addCase(createJobPost.pending, (state) => {
          state.isLoading = true;
          state.isSuccess=false
          state.isError=false
        })
        .addCase(createJobPost.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.jobs.push(action.payload);
          state.isError=false
        })
        .addCase(createJobPost.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess=false
          state.isError = true;
          state.message = action.payload;
        })

        // FETCH JOBS
        .addCase(fetchMyJobs.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchMyJobs.fulfilled, (state, action) => {
          state.isLoading = false;
          state.jobs = action.payload;
        })
        .addCase(fetchMyJobs.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })

        // DELETE JOB
        .addCase(removeJob.fulfilled, (state, action) => {
          state.jobs = state.jobs.filter(
            (job) => job._id !== action.meta.arg
          );
        })
        .addCase(getAllJobs.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllJobs.fulfilled, (state, action) => {
          state.isLoading = false;
          state.jobs = action.payload;
        })
        .addCase(getJobById.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getJobById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.job = action.payload;
        })
        .addCase(searchJobs.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(searchJobs.fulfilled, (state, action) => {
          state.isLoading = false;
          state.jobs = action.payload.jobs;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
        })
        .addCase(searchJobs.rejected, (state) => {
          state.isLoading = false;
        })
        .addCase(toggleJob.fulfilled, (state, action) => {
          state.jobs = state.jobs.map(job =>
            job._id === action.payload._id ? action.payload : job
          );
        });
    },
  });

  export const { resetJobState } = jobSlice.actions;
  export default jobSlice.reducer;
