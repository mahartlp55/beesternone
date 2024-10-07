import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import DailyRewardContextProvider from './components/context/DailyRewardContextProvider.jsx';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './../strore/features/userSlice.js'; // Import the Redux store

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <DailyRewardContextProvider>
      <App />
    </DailyRewardContextProvider>
  </Provider>
);
