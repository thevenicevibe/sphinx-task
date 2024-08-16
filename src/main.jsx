import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './UserReducer.jsx'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const store = configureStore({
  reducer: {
    users: UserReducer,
  },
});

root.render(
  <StrictMode>
     <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
