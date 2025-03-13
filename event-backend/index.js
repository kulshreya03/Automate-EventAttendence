require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Connecting to database
mongoose.connect("mongodb://127.0.0.1:27017/eventDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));



//Define the schema
const eventSchema = new mongoose.Schema({
    event_id: String,  // Unique Event ID
    prn: String,
    name: String,
    year: String,
    class: String,
    div: String,
    event: String,
    date: String,
    time: String,
    venue: String,
    faculty: String,
    certificate: String
  });

// 📌 Function to Generate Unique Event ID
const generateEventID = async (date) => {
    const formattedDate = date.split("-").reverse().join("").slice(0, 6); // Convert YYYY-MM-DD to DDMMYY
    const count = await Event.countDocuments({ date }); // Count events on this date
    return formattedDate + (count + 1).toString().padStart(2, "0"); // Format: DDMMYYXX
};


const Event = mongoose.model("Event", eventSchema);


// 📌 Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// 📌 API to Register Event
app.post("/register", upload.single("certificate"), async (req, res) => {
    try {
        const { date } = req.body; // Extract the date from request body
        if (!date) {
            return res.status(400).json({ message: "Event date is required to generate event ID" });
        }

        const event_id = await generateEventID(date); // Generate unique event_id

        const eventData = new Event({
            event_id,  // Assign the generated event_id
            ...req.body,
            certificate: req.file ? req.file.filename : null
        });

        await eventData.save();
        res.status(201).json({ message: "Registration Successful", data: eventData });
    } catch (error) {
        res.status(500).json({ message: "Error saving data", error });
    }
});

// 📌 API to Fetch All Events
app.get('/api/events/:division', async (req, res) => {
  try {
      const division = req.params.division;
      const students = await Event.find(
          { div: division }, // Filter by division
          { event_id: 1, prn: 1, name: 1, certificate: 1, _id: 0 } // Select required fields
      );

      res.json(students); // Send data as JSON
  } catch (err) {
      res.status(500).json({ error: "Error retrieving data" });
  }
});


// 📌 Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));