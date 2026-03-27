// Import Express framework for building the server and API
const express = require("express");

// Import body-parser to parse incoming JSON request bodies
const bodyParser = require("body-parser");

// Import CORS to allow cross-origin requests (e.g. frontend on different port)
const cors = require("cors");

// Import database connection (MySQL connection setup from db.js)
const connection = require("./db");

// Import file system module to read files from disk
const fs = require("fs");

// Import path module to safely handle file paths
const path = require("path");

// Import dotenv to load environment variables from .env file
const dotenv = require("dotenv");

// Load environment variables into process.env
dotenv.config();

// Create Express application instance
const app = express();

// Enable CORS for all incoming requests
// This allows frontend apps (e.g. React) to access the backend API
app.use(cors());

// Enable JSON parsing for incoming requests (built-in Express middleware)
app.use(express.json());

// Enable body-parser for parsing JSON request bodies
// Ensures req.body is populated with parsed data
app.use(bodyParser.json());

/* ===========================
   ROUTES IMPORTS
   =========================== */

// Import route modules for different API features
const registerRoute = require("./routes/register"); // User registration
const loginRoute = require("./routes/login"); // User authentication
const appointmentsRoute = require("./routes/appointments"); // Appointments logic
const buddyRoute = require("./routes/buddies"); // Buddy system features
const medicinesRoute = require("./routes/medicines"); // Medicines management
const moodsRoute = require("./routes/moods"); // Mood tracking

/* ===========================
   ROUTES MIDDLEWARE
   =========================== */

// Attach route handlers to specific URL paths
// Each route file handles its own endpoints and logic
app.use("/register", registerRoute); // POST /register
app.use("/login", loginRoute); // POST /login
app.use("/api/appointments", appointmentsRoute); // /api/appointments/*
app.use("/api/medicines", medicinesRoute); // /api/medicines/*
app.use("/api/buddies", buddyRoute); // /api/buddies/*
app.use("/api/moods", moodsRoute); // /api/moods/*

/* ===========================
   STATIC JSON ROUTES
   =========================== */

// Read games.json file from disk and parse it into a JavaScript object
// This is used as a static data source instead of database storage
const games = JSON.parse(
  fs.readFileSync(path.join(__dirname, "routes/json/games.json"), "utf-8")
);

// Read departments.json file from disk and parse it into a JavaScript object
// Used to provide department data via API without database queries
const departments = JSON.parse(
  fs.readFileSync(path.join(__dirname, "routes/json/departments.json"), "utf-8")
);

// Endpoint to return games data as JSON
// Example: GET /games
app.get("/games", (req, res) => res.json(games));

// Endpoint to return departments data as JSON
// Example: GET /departments
app.get("/departments", (req, res) => res.json(departments));

/* ===========================
   START SERVER
   =========================== */

// Get server port from environment variables
// If not defined, fallback to 5001
const PORT = process.env.PORT || 5001;

// Start the Express server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
