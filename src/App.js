import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout components
import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Map from "./pages/Map";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/dashboard/Games";
import Appointments from "./pages/dashboard/Appointment";
import Medicines from "./pages/dashboard/Medicines";
import Learn from "./pages/dashboard/Learn";

function App() {
  // ----------------------------
  // State
  // ----------------------------
  const [isLoggedIn, setIsLoggedIn] = useState(false); // track if user is logged in
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // track mobile sidebar

  // ----------------------------
  // Check localStorage on mount
  // ----------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true); // user already logged in
    }
  }, []);

  // ----------------------------
  // Login/Logout handlers
  // ----------------------------
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("buddy");
    setIsLoggedIn(false);
    setIsSidebarOpen(false); // close sidebar on logout
  };

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Mobile Header – only visible if logged in */}
        {isLoggedIn && (
          <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        )}

        {/* Sidebar – only visible if logged in */}
        {isLoggedIn && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            handleLogout={handleLogout}
          />
        )}

        {/* Main Content */}
        <main
          className={`
            flex-1 min-h-screen
            ${isLoggedIn ? "pt-14 md:pt-0 md:ml-64" : ""}
          `}
        >
          <Routes>
            {/* Root – redirect depending on login status */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login handleLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
            />

            {/* Protected Routes – only accessible if logged in */}
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/games"
              element={isLoggedIn ? <Games /> : <Navigate to="/login" />}
            />
            <Route
              path="/appointments"
              element={isLoggedIn ? <Appointments /> : <Navigate to="/login" />}
            />
            <Route
              path="/medicines"
              element={isLoggedIn ? <Medicines /> : <Navigate to="/login" />}
            />
            <Route
              path="/map"
              element={isLoggedIn ? <Map /> : <Navigate to="/login" />}
            />
            <Route
              path="/learn"
              element={isLoggedIn ? <Learn /> : <Navigate to="/login" />}
            />

            {/* Fallback – redirect unknown routes */}
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
