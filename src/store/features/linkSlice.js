import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;
const initialState = {
  links: {},
  loading: false,
  error: null,
};

export const getLinks = createAsyncThunk(
  "links/getLinks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiURL}/api/v1/links`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// New async thunk for tracking social media visits
export const trackVisit = createAsyncThunk(
  "links/trackVisit",
  async ({ userId, platform }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURL}/api/v1/trackVisit`,
        {
          userId,
          platform,
        },
        { withCredentials: true }
      );
      return response.data; // You can return additional data if needed
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const linkSlice = createSlice({
  initialState,
  name: "links",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.links = action.payload;
      })
      .addCase(getLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred";
      })
      // Handle the pending, fulfilled, and rejected states for trackVisit
      .addCase(trackVisit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trackVisit.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally handle any data returned from the server
        // console.log(action.payload.message); // Log or use the response message
      })
      .addCase(trackVisit.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.message || "An error occurred while tracking visit";
      });
  },
});

export default linkSlice.reducer;
