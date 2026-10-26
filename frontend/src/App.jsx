import { BrowserRouter, Routes, Route } from 'react-router'

import Home from "./pages/Home"
import AddTask from "./components/tasks/AddTask"
import EditTask from "./components/tasks/EditTask"
import Navbar from './components/layouts/Navbar'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import PrivateRoute from './components/middleware/PrivateRoute'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={ 
          <PrivateRoute>
            <Home />
          </PrivateRoute>
         } />
        <Route path="/task/create" element={ 
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
         } />
        <Route path="/task/edit/:taskId" element={ 
          <PrivateRoute>
            <EditTask />
          </PrivateRoute>
         } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
