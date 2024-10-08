import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiURL = process.env.REACT_APP_API_URL;

// Helper function to set the Authorization header
const setAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiURL}/api/v1/login`, {
        email,
        password,
      });
      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Set the token in the headers for subsequent requests
      setAuthHeader();

      toast.success("Login successful!");
      return user;
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
      toast.error("Failed to login");
      return rejectWithValue("Failed to login");
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (
    { displayName, email, password, country, state, city, referral },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${apiURL}/api/v1/register`, {
        displayName,
        email,
        password,
        country,
        state,
        city,
        referral, // Pass referral ID
      });
      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Set the token in the headers for subsequent requests
      setAuthHeader();

      toast.success("Registration successful!");
      return user;
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }
      toast.error("Failed to sign up");
      return rejectWithValue("Failed to sign up");
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      // Ensure the Authorization header is set
      setAuthHeader();

      const response = await axios.get(`${apiURL}/api/v1/user/data`);
      console.log(response.data.userData);
      return response.data.userData;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

export const fetchInviteLink = createAsyncThunk(
  "user/fetchInviteLink",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiURL}/api/v1/invite-link`);
      return response.data.inviteLink;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch invite link");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
