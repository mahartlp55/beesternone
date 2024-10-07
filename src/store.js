import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/features/userSlice";
import gameReducer from "./store/features/gameSlice";
import linkReducer from "./store/features/linkSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    links: linkReducer,
  },
});

export default store;
