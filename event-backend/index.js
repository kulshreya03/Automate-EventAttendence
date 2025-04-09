require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to Database
connectDB();

// Routes
app.use("/api", eventRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
