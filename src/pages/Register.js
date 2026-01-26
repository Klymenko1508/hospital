import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Function to register a user via API call
const registerUser = async (userData, navigate) => {
  try {
    // POST user data to backend
    await axios.post("http://localhost:5001/register", userData);
    // Redirect to login page after successful registration
    navigate("/login");
  } catch (error) {
    // Log any errors and show alert
    console.error("Registration error:", error.response?.data || error.message);
    alert("Error during registration. Please try again.");
  }
};

function Register() {
  const navigate = useNavigate(); // React Router navigation hook

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    hospital_number: "",
    email: "",
    department_id: "",
    telephone_number: "",
    password: "",
    confirm_password: "",
  });

  // List of departments fetched from backend
  const [departments, setDepartments] = useState([]);

  // Fetch departments when component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await axios.get("http://localhost:5001/departments");
      setDepartments(response.data);
    };
    fetchDepartments();
  }, []);

  // Handle input changes for all form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Exclude confirm_password from payload
    const { password, confirm_password, ...userData } = formData;

    // Validate required fields
    if (Object.values(formData).some((v) => !v)) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }

    // Validate password match
    if (password !== confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    // Include password in final payload
    userData.password = password;

    // Call register API
    await registerUser(userData, navigate);
  };

  return (
    <div
      className="font-[sans-serif] min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#015CE9" }}
    >
      {/* Container for the form */}
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
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Dynamically render input fields */}
            {[
              { name: "firstName", label: "First Name" },
              { name: "surname", label: "Surname" },
              { name: "hospital_number", label: "Hospital Number" },
              { name: "email", label: "Email", type: "email" },
              { name: "telephone_number", label: "Telephone No." },
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

            {/* Department dropdown */}
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Password input */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            />

            {/* Confirm password input */}
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

        {/* Footer with login link */}
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
