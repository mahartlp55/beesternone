import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Thunks to interact with the game backend

const apiURL = process.env.REACT_APP_API_URL;
// Spin game and earn tokens
export const spinGame = createAsyncThunk(
  "game/spinGame",
  async (tokenAmount, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiURL}/api/v1/game/spin`,
        { token: tokenAmount },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      return response.data; // Return the response data from the backend
    } catch (error) {
      // console.log("error", error.response.data.message);
      toast.warn(error?.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to spin the game"
      );
    }
  }
);

// Fetch total tokens
export const fetchTotalTokens = createAsyncThunk(
  "game/fetchTotalTokens",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        // "http://localhost:6005/api/v1/game/token"
        `${apiURL}/api/v1/game/token`,

        { withCredentials: true }
      );
      return response.data; // Return total tokens from response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch total tokens"
      );
    }
  }
);

// Claim daily reward
export const claimDailyReward = createAsyncThunk(
  "game/claimDailyReward",
  async (rewardAmount, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        // "http://localhost:6005/api/v1/daily/reward",
        `${apiURL}/api/v1/daily/reward`,

        { rewardAmount },
        { withCredentials: true }
      );
      toast.success("Reward collected successfully");

      return response.data; // Return the response data from the backend
    } catch (error) {
      toast.warn(error?.response?.data?.message);

      return rejectWithValue(
        error.response?.data?.message || "Failed to claim daily reward"
      );
    }
  }
);

// Fetch reward data
export const getRewardData = createAsyncThunk(
  "game/getRewardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        // "http://localhost:6005/api/v1/rewards/data", // New endpoint
        `${apiURL}/api/v1/rewards/data`,

        { withCredentials: true }
      );
      return response.data; // Return the response data from the backend
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reward data"
      );
    }
  }
);

export const getSelectedCard = createAsyncThunk(
  "game/getSelectedCard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        // "http://localhost:6005/api/v1/getSelectedCard", // Adjust the endpoint as per your backend
        `${apiURL}/api/v1/getSelectedCard`,

        { withCredentials: true }
      );
      return response.data.selectedCards; // Return selected cards from response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch selected cards"
      );
    }
  }
);

export const checkSingleCard = createAsyncThunk(
  "game/checkSingleCard",
  async (
    { selectedCardId, profitPerHour, tokenAmount },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        // "http://localhost:6005/api/v1/checkcard", // Replace with your actual endpoint
        `${apiURL}/api/v1/checkcard`,

        { selectedCardId, profitPerHour, tokenAmount },

        { withCredentials: true }
      );

      toast.success(response.data.message);
      return response.data; // Return the response data from the backend
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to check the card"
      );
    }
  }
);

// Get all card IDs (e.g., for matching game functionality)
export const getCardIds = createAsyncThunk(
  "game/getCardIds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        // "http://localhost:6005/api/v1/getcard", // Replace with your actual endpoint
        `${apiURL}/api/v1/getcard`,

        { withCredentials: true }
      );
      return response.data.cardIds; // Return the card IDs from the backend
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch card IDs"
      );
    }
  }
);

export const sendDollars = createAsyncThunk(
  "get/dollar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        // "http://localhost:6005/api/v1/reward/dollar", // Replace with your actual endpoint
        `${apiURL}/api/v1/reward/dollar`,

        { withCredentials: true }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch card IDs"
      );
    }
  }
);
export const getCards = createAsyncThunk(
  "get/card",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiURL}/api/v1/cards`,

        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch card IDs"
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  totalTokens: 0,
  spinResult: null,
  lastCollectedReward: null,
  nextReward: null,
  checkedCardResult: null,
  pph: 0,
  cardIds: [],
  selectedCards: [],
  dollars: 0,
  cards: [],
};

// Create the game slice
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetSpinResult(state) {
      state.spinResult = null; // Reset spin result manually if needed
    },
  },
  extraReducers: (builder) => {
    // Spin Game
    builder.addCase(spinGame.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(spinGame.fulfilled, (state, action) => {
      state.loading = false;
      state.spinResult = action.payload; // Store the spin result
    });
    builder.addCase(spinGame.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Total Tokens
    builder.addCase(fetchTotalTokens.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTotalTokens.fulfilled, (state, action) => {
      state.loading = false;
      state.totalTokens = action.payload.totalTokens;
      state.pph = action.payload.pph; // Store total tokens
    });
    builder.addCase(fetchTotalTokens.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Claim Daily Reward
    builder.addCase(claimDailyReward.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(claimDailyReward.fulfilled, (state, action) => {
      state.loading = false;
      state.totalTokens = action.payload.totalTokens; // Update total tokens after reward
    });
    builder.addCase(claimDailyReward.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get Reward Data
    builder.addCase(getRewardData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getRewardData.fulfilled, (state, action) => {
      state.loading = false;
      state.lastCollectedReward = action.payload.lastCollectedReward; // Store last collected reward
      state.nextReward = action.payload.nextReward; // Store next available reward
    });
    builder.addCase(getRewardData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(checkSingleCard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkSingleCard.fulfilled, (state, action) => {
      state.loading = false;
      state.checkedCardResult = action.payload; // Store the result of checking the card
    });
    builder.addCase(checkSingleCard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getCardIds.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCardIds.fulfilled, (state, action) => {
      state.loading = false;
      state.cardIds = action.payload; // Store the fetched card IDs
    });
    builder.addCase(getCardIds.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getSelectedCard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSelectedCard.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedCards = action.payload; // Store the selected cards in state
    });
    builder
      .addCase(getSelectedCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendDollars.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendDollars.fulfilled, (state, action) => {
        state.loading = false;
        state.dollars = action.payload.totalDollar;
      })
      .addCase(sendDollars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addCase(getCards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.loading = false;
      state.cards = action.payload;
    });
    builder.addCase(getCards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export the actions and reducer
export const { resetSpinResult } = gameSlice.actions;
export default gameSlice.reducer; // Removed duplicate export for getRewardData
