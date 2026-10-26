import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div className="container">
        <App />
        <ToastContainer />
      </div>
    </PersistGate>
  </Provider>
)
