import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import DailyRewardContextProvider from "./Component/context/DailyRewardContextProvider";
import store from "./store";
import { Provider } from "react-redux";
import RecallState from "./Component/DailyRewardSection/RecallContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <RecallState>
        <DailyRewardContextProvider>
          <App />
          <ToastContainer />
        </DailyRewardContextProvider>
      </RecallState>
    </BrowserRouter>
  </Provider>
);
