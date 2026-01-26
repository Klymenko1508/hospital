import React from "react";

/**
 * MobileHeader component
 * ----------------------
 * A responsive header specifically for mobile devices.
 * It includes:
 * - A menu button on the left to open the mobile sidebar/menu
 * - A centered logo
 *
 * Props:
 * - onMenuClick: function – callback triggered when the menu button is clicked
 */
function MobileHeader({ onMenuClick }) {
  return (
    // Header container
    // Hidden on medium (md) and larger screens: "md:hidden"
    // Fixed at the top with full width and z-index for overlay
    // Flexbox used to center items
    <header
      className="
        md:hidden
        fixed top-0 left-0 right-0 z-40
        h-14
        bg-[#015CE9]
        flex items-center justify-center
        shadow
      "
    >
      {/* Menu button on the left */}
      <button
        onClick={onMenuClick} // Trigger callback to open sidebar/menu
        className="absolute left-4 text-white text-2xl"
        aria-label="Open menu" // Accessibility label for screen readers
      >
        ☰ {/* Hamburger menu icon */}
      </button>

      {/* Centered logo */}
      <img src="/logotype.png" alt="Logo" className="h-8" />
    </header>
  );
}

export default MobileHeader;
