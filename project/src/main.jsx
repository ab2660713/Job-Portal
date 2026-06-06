import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './features/store.js'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || ''

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <App />
  </Provider>
  </StrictMode>,
)
