const Event = require("../models/Event");
const ApprovedStud = require("../models/ApprovedStud");

// 📌 Function to Generate Unique Event ID
const generateEventID = async (date) => {
    const formattedDate = date.split("-").reverse().join("").slice(0, 6); // Convert YYYY-MM-DD to DDMMYY
    const count = await Event.countDocuments({ date }); // Count events on this date
    return formattedDate + (count + 1).toString().padStart(2, "0"); // Format: DDMMYYXX
};

// 📌 Register Event
const registerEvent = async (req, res) => {
    try {
        const { date } = req.body;
        if (!date) return res.status(400).json({ message: "Event date is required" });

        const event_id = await generateEventID(date); // Generate unique event_id

        const eventData = new Event({
            event_id,
            ...req.body,
            certificate: req.file ? req.file.filename : null,
            permit: req.file ? true : false
        });

        await eventData.save();
        res.status(201).json({ message: "Registration Successful", data: eventData });
    } catch (error) {
        res.status(500).json({ message: "Error saving data", error });
    }
};

// 📌 Fetch Events by Division
const getEventsByDivision = async (req, res) => {
    try {
        const division = req.params.division;
        const students = await Event.find(
            { div: division, permit : true},
            { event_id: 1, prn: 1, name: 1, certificate: 1, _id: 0 }
        );

        res.json(students);
    } catch (err) {
        res.status(500).json({ error: "Error retrieving data" });
    }
};

// Fetch Students By Faculty
const getEventsByFaculty = async (req, res) => {
    try {
        const faculty_name = req.params.faculty;
        const students = await Event.find(
            { faculty: faculty_name, permit:false },
            { event_id: 1, prn: 1, name: 1, certificate: 1, _id: 0 }
        );

        res.json(students);
    } catch (err) {
        res.status(500).json({ error: "Error retrieving data" });
    }
};

// 📌 Approve Student (Set Permit to True)
const approveStudent = async (req, res) => {
    try {
        const { prn } = req.params;
        const updatedStudent = await Event.findOneAndUpdate(
            { prn: prn },
            { permit: true },
            { new: true } // Returns the updated document
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student approved", data: updatedStudent });
    } catch (err) {
        res.status(500).json({ message: "Error approving student", error: err });
    }
};

const approveAndMoveStudent = async (req, res) => {
    try {
        const { prn } = req.params;

        // Find the student in the `events` collection
        const student = await Event.findOne({ prn });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Move student data to `approvedStud` collection
        const approvedStudent = new ApprovedStud({
            event_id: student.event_id,
            prn: student.prn,
            name: student.name,
            certificate: student.certificate,
            permit: true, // Ensure permit is set to true
        });

        await approvedStudent.save(); // Save to the new table

        // Remove student from `events` collection
        await Event.deleteOne({ prn });

        res.json({ message: "Student approved and moved successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error approving student", error: err.message });
    }
};


module.exports = { registerEvent, getEventsByDivision, getEventsByFaculty, approveStudent, approveAndMoveStudent };
