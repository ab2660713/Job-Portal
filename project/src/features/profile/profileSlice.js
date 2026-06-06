import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

const initialState = {
  profile: null,
  profileComplete: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// GET Jobseeker Profile
export const getMyProfile = createAsyncThunk(
  "profile/get",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await profileService.getMyProfile(token);
  }
);

// UPDATE Jobseeker Profile
export const updateMyProfile = createAsyncThunk(
  "profile/update",
  async (profileData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await profileService.updateMyProfile(profileData, token);
  }
);

// GET Employer Profile
export const getEmployerProfile = createAsyncThunk(
  "profile/employer/get",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await profileService.getEmployerProfile(token);
  }
);

// UPDATE Employer Profile
export const updateEmployerProfile = createAsyncThunk(
  "profile/employer/update",
  async (profileData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await profileService.updateEmployerProfile(profileData, token);
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.profileComplete = action.payload.profileComplete;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.profile = action.payload.user;
        state.isSuccess = true;
      })
      .addCase(getEmployerProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updateEmployerProfile.fulfilled, (state, action) => {
        state.profile = action.payload.user;
        state.isSuccess = true;
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
