import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login({ handleLogin }) {
  // ----------------------------
  // Form state
  // ----------------------------
  const [hospitalNumber, setHospitalNumber] = useState(""); // hospital number input
  const [password, setPassword] = useState(""); // password input
  const [error, setError] = useState(""); // error messages

  // ----------------------------
  // Navigation
  // ----------------------------
  const navigate = useNavigate(); // for redirect after login

  // ----------------------------
  // Buddy selection state
  // ----------------------------
  const [buddies, setBuddies] = useState([]); // list of hospital buddies
  const [selectedBuddy, setSelectedBuddy] = useState(null); // currently selected buddy

  // ----------------------------
  // Load hospital buddies from backend on mount
  // ----------------------------
  React.useEffect(() => {
    const fetchBuddies = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/buddies");
        setBuddies(res.data); // store fetched buddies
      } catch (err) {
        console.error("Failed to load buddies");
      }
    };

    fetchBuddies();
  }, []);

  // ----------------------------
  // Handle login form submission
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    // Require buddy selection before login
    if (!selectedBuddy) {
      setError("Please choose a hospital buddy");
      return;
    }

    try {
      // Send login request
      const response = await axios.post("http://localhost:5001/login", {
        hospital_number: hospitalNumber,
        password: password,
        buddy_id: selectedBuddy.id,
      });

      if (response.status === 200) {
        const { user } = response.data;

        // Store user and buddy data in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("buddy", JSON.stringify(response.data.buddy));

        // Call parent handler to update state
        handleLogin(user);

        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials"); // show login error
    }
  };

  // ----------------------------
  // JSX – Login form UI
  // ----------------------------
  return (
    <div
      className=" font-[sans-serif] min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#015CE9" }}
    >
      {/* Container */}
      <div
        className="max-w-md w-full p-8 rounded-2xl"
        style={{ backgroundColor: "#015CE9" }}
      >
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <img src="/logotype.png" alt="logo" className="w-48 inline-block" />
          <h2 className="text-white text-2xl font-bold mt-4">Sign in</h2>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Hospital Number input */}
          <input
            type="text"
            value={hospitalNumber}
            onChange={(e) => setHospitalNumber(e.target.value)}
            placeholder="Hospital Number"
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            required
          />
          {/* Password input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            required
          />
          {/* Display error if any */}
          {error && <div className="text-red-600">{error}</div>}

          {/* Buddy selection */}
          <div>
            <p className="text-white text-sm mb-2 text-center">
              Choose your hospital buddy
            </p>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {buddies.map((buddy) => (
                <div
                  key={buddy.id}
                  onClick={() => setSelectedBuddy(buddy)} // select buddy on click
                  className={`cursor-pointer p-2 rounded-xl border-2 flex justify-center
          ${
            selectedBuddy?.id === buddy.id
              ? "border-orange-400 bg-white" // highlight selected
              : "border-transparent bg-blue-500" // default style
          }
        `}
                >
                  <img
                    src={`/assets/images/icons/${buddy.icon_filename}`} // buddy icon
                    alt={buddy.name}
                    className="w-12 h-12"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4  text-white font-medium rounded-md hover:bg-blue-700"
            style={{ backgroundColor: "#FF5B3A" }}
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="mt-4 text-sm text-center text-white">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold hover:underline text-white"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
