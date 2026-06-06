import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import resumeService from "./resumeService";

const initialState = {
  resume: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Upload Resume
export const uploadResume = createAsyncThunk(
  "resume/upload",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resumeService.uploadResume(formData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const downloadMyResume = createAsyncThunk(
  "resume/download",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await resumeService.downloadResume(token);
  }
);

// Get Resume
export const getMyResume = createAsyncThunk(
  "resume/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resumeService.getMyResume(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete Resume
export const deleteMyResume = createAsyncThunk(
  "resume/delete",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resumeService.deleteResume(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    resetResume: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadResume.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.resume = action.payload.resume;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyResume.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resume = action.payload;
      })
      .addCase(getMyResume.rejected, (state, action) => {
        state.isLoading = false;
        state.resume = null;
        state.message = action.payload;
      })
      .addCase(deleteMyResume.fulfilled, (state) => {
        state.resume = null;
      })
      .addCase(downloadMyResume.fulfilled, (state) => {
        state.isSuccess = true;
      });
      
  },
});

export const { resetResume } = resumeSlice.actions;
export default resumeSlice.reducer;
