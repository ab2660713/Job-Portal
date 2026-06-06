import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const userExist = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: userExist || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// REGISTER
export const registerUser = createAsyncThunk(
  "AUTH/REGISTER",
  async (formData, thunkAPI) => {
    try {
      return await authService.register(formData);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "AUTH/LOGIN",
  async (formData, thunkAPI) => {
    try {
      return await authService.login(formData); // ✅ returns user + token
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk("AUTH/LOGOUT", async () => {
  localStorage.removeItem("user");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // ❌ DO NOT SET state.user HERE
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // ✅ HAS TOKEN
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
  },
});

export default authSlice.reducer;
  