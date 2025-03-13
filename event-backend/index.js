require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to Database
connectDB();

// Routes
app.use("/api", eventRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
