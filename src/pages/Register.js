import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Function to register a user via API call
const registerUser = async (userData, navigate) => {
  try {
    await axios.post("http://localhost:5001/register", userData);
    navigate("/login"); // Redirect to login on success
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    alert("Error during registration. Please try again.");
  }
};

function Register() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    hospital_number: "",
    email: "",
    telephone_number: "",
    password: "",
    confirm_password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirm_password, ...userData } = formData;

    // Validate all fields
    if (Object.values(formData).some((v) => !v)) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }

    // Validate password match
    if (password !== confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    // Include password in payload
    userData.password = password;

    // Call API
    await registerUser(userData, navigate);
  };

  return (
    <div
      className="font-[sans-serif] min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#015CE9" }}
    >
      <div
        className="max-w-4xl w-full p-8 rounded-2xl shadow"
        style={{ backgroundColor: "#015CE9" }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <img src="/logotype.png" alt="logo" className="w-48 inline-block" />
          <h2 className="text-white text-2xl font-bold mt-4">Create account</h2>
        </div>

        {/* Registration Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Left-Right Grid Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "firstName", label: "First Name" },
              { name: "surname", label: "Surname" },
              { name: "hospital_number", label: "Hospital Number" },
              { name: "email", label: "Email", type: "email" },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                type={field.type || "text"}
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              />
            ))}
          </div>

          {/* Telephone centered */}
          <div className="w-full">
            <input
              name="telephone_number"
              type="text"
              placeholder="Telephone No."
              value={formData.telephone_number}
              onChange={handleChange}
              className="w-full max-w-md mx-auto text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 block"
            />
          </div>

          {/* Passwords in same row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            />
            <input
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 text-white font-medium rounded-md hover:bg-blue-700"
            style={{ backgroundColor: "#FF5B3A" }}
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-sm text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
