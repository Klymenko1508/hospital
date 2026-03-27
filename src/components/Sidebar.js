import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

/**
 * Sidebar component
 * -----------------
 * Responsive sidebar navigation for the app.
 * Features:
 * - Overlay for mobile screens
 * - Links to main sections: Dashboard, Appointments, Medicines, Learn, Play
 * - Logout button
 * - Bottom illustration
 *
 * Props:
 * - handleLogout: function – callback to clear user session
 * - isOpen: boolean – whether sidebar is open (mobile)
 * - onClose: function – callback to close sidebar
 */
function Sidebar({ handleLogout, isOpen, onClose }) {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Logout function
  // Calls handleLogout, closes sidebar, and redirects to login page
  const logout = () => {
    handleLogout();
    onClose();
    navigate("/login");
  };

  return (
    <>
      {/* -------------------------------
          Overlay (for mobile screens only)
          -------------------------------
          - Covers the main content when sidebar is open
          - Clicking overlay closes the sidebar
          - Transition opacity for smooth fade in/out
      */}
      <div
        onClick={onClose} // Close sidebar on overlay click
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* -------------------------------
          Sidebar container
          -------------------------------
          - Fixed on left, full screen height
          - Rounded right corners and shadow
          - Flex column layout: top navigation + bottom image
          - Slide-in/out animation for mobile
      */}
      <nav
        className={`fixed top-0 left-0 z-50
        h-screen w-64 bg-[#015CE9]
        rounded-r-3xl shadow-xl
        flex flex-col justify-between
        pt-6 px-4
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* -------------------------------
            Top section: logo + navigation
        */}
        <div>
          {/* Logo */}
          <div className="mb-8 text-center">
            <img src="/logotype.png" alt="Logo" className="w-32 mx-auto" />
          </div>

          {/* Navigation links */}
          <ul className="space-y-3 text-white">
            {[
              { to: "/dashboard", label: "Dashboard" },
              { to: "/appointments", label: "Appointments" },
              { to: "/medicines", label: "Medicines" },
              { to: "/learn", label: "Learn" },
              { to: "/games", label: "Play" },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose} // Close sidebar on link click
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded
                     transition-colors duration-200
                     ${
                       isActive
                         ? "bg-white text-[#015CE9]" // Active link style
                         : "text-white hover:bg-blue-700" // Inactive hover style
                     }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}

            {/* Logout button */}
            <li>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 rounded
                text-white hover:bg-blue-700
                transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* -------------------------------
            Bottom illustration
            -------------------------------
            - Fixed image at the bottom of the sidebar
            - Decorative/branding purposes
        */}
        <div className="text-center">
          <img
            src="/assets/images/doctor_sidebar.png"
            alt="Doctor illustration"
            className="w-40 mx-auto"
          />
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
