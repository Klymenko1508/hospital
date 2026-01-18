const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./db");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ROUTES
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const appointmentsRoute = require("./routes/appointments");
const buddyRoute = require("./routes/buddies");
const medicinesRoute = require("./routes/medicines");
const moodsRoute = require("./routes/moods");

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/api/appointments", appointmentsRoute);
app.use("/api/medicines", medicinesRoute);
app.use("/api/buddies", buddyRoute);
app.use("/api/moods", moodsRoute);

// Static JSON routes
const games = JSON.parse(
  fs.readFileSync(path.join(__dirname, "routes/json/games.json"), "utf-8")
);
const departments = JSON.parse(
  fs.readFileSync(path.join(__dirname, "routes/json/departments.json"), "utf-8")
);

app.get("/games", (req, res) => res.json(games));
app.get("/departments", (req, res) => res.json(departments));

// START SERVER
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
