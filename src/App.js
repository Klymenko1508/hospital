import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Map from "./pages/Map";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/dashboard/Games";
import Appointments from "./pages/dashboard/Appointment";
import Medicines from "./pages/dashboard/Medicines";
import Learn from "./pages/dashboard/Learn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("buddy");
    setIsLoggedIn(false);
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Mobile Header */}
        {isLoggedIn && (
          <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        )}

        {/* Sidebar */}
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
            {/* Root */}
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

            {/* Auth */}
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

            {/* Protected */}
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

            {/* Fallback */}
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
