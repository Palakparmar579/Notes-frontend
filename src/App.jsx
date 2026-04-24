import React from 'react'
import './App.css';
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
  import { Toaster } from "react-hot-toast";
import Register from './pages/auth/Register';
import Notes from './pages/Notes';
import Login from './pages/auth/Login'
//import ProtectedRoute from './pages/auth/ProtectedRoute';
function App() {
  return (
    <div>

    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to="/register" />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/notes" element={<Notes />}/>
  </Routes>
</BrowserRouter>

    

<Toaster
  position="top-center"
  reverseOrder={false}
  gutter={10} 
  containerStyle={{
    top: 20,
    left: 20,
    right: 20,
  }}
  toastOptions={{
   
    // duration: 2000,
    style: {
      background: "#333",
      color: "#fff",
      padding: "12px 16px",
      borderRadius: "10px",
      fontSize: "14px",
    },

   
    success: {
      duration: 2000,
      style: {
        background: "#16a34a",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#16a34a",
      },
    },

  
    error: {
      duration: 4000,
      style: {
        background: "#dc2626",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#dc2626",
      },
    },

   
    loading: {
      duration: Infinity,
    },
  }}
/>
    </div>
  )
}

export default App
