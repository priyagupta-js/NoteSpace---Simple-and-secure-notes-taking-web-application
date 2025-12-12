import { useState } from 'react'
import { Routes,Route ,Navigate} from 'react-router-dom'
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import Profile from "../src/pages/profile";
import ProtectedRoute from "../src/components/ProtectedRoute";
import Dashboard from "../src/pages/Dashboard";
function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>

      {/* default redirect */}
      <Route 
        path="/" 
        element={ token ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> } 
      />

      {/* auth pages */}
      <Route 
        path="/login" 
        element={ token ? <Navigate to="/dashboard" /> : <Login /> } 
      />

      <Route 
        path="/signup" 
        element={ token ? <Navigate to="/dashboard" /> : <Signup /> } 
      />

      {/* protected pages */}
      <Route 
        path="/dashboard" 
        element={ <ProtectedRoute><Dashboard /></ProtectedRoute> } 
      />

      <Route 
        path="/profile" 
        element={ <ProtectedRoute><Profile /></ProtectedRoute> } 
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
