const { MongoClient } = require('mongodb'); // Assuming mongodb driver is installed

// --- Configuration ---
// Replace with your actual MongoDB connection string and database name
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:5000';
const DB_NAME = 'eventDB';

// --- Constants ---
const MIN_ATTENDANCE = 75;
const MAX_FORM_SUBMISSION_RATIO = 0.2;

let client;
let db;

// Function to establish MongoDB connection (call this once when your backend starts)
async function connectDB() {
    if (client && client.isConnected()) {
        console.log('Already connected to DB');
        return;
    }
    try {
        client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(DB_NAME);
        console.log(`Connected successfully to MongoDB: ${DB_NAME}`);
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit if DB connection fails
    }
}

// Function to close MongoDB connection (call this on application shutdown)
async function closeDB() {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed.');
    }
}

/**
 * Validates if a student submission is allowed based on attendance and form submission ratio.
 *
 * @param {string} prn - The Permanent Registration Number of the student.
 * @returns {Promise<boolean>} - True if submission is allowed, False otherwise.
 */
async function validateSubmission(prn) {
    if (!db) {
        console.error("Database not connected. Call connectDB() first.");
        // Depending on application design, you might want to throw an error
        // or attempt to connect here, but for simplicity, we return false.
        return false;
    }

    try {
        // --- STEP 1: Attendance Percentage Check ---
        const attendanceCollection = db.collection('Attendance');
        // Assuming only one document holds the attendance array as per the image.
        // If there could be multiple, the query needs adjustment.
        const attendanceDoc = await attendanceCollection.findOne({});

        if (!attendanceDoc || !attendanceDoc.attendance) {
            console.warn(`Attendance data not found.`);
            return false; // Reject if no attendance data available
        }

        const studentAttendance = attendanceDoc.attendance.find(student => student.prn === prn);

        if (!studentAttendance) {
            console.log(`Student PRN ${prn} not found in attendance records.`);
            return false; // Reject if student PRN not found
        }

        const attendancePercentage = studentAttendance.attendancePercentage;

        if (attendancePercentage < MIN_ATTENDANCE) {
            console.log(`Validation failed for PRN ${prn}: Attendance (${attendancePercentage}%) is below minimum (${MIN_ATTENDANCE}%).`);
            return false; // Reject: Attendance too low
        }

        // --- STEP 2: Event Form Submission Percentage Check ---
        const eventsCollection = db.collection('events');
        const approvedStudentsCollection = db.collection('approved_students'); // Or the correct name

        const totalEventCount = await eventsCollection.countDocuments();
        const studentFormCount = await approvedStudentsCollection.countDocuments({ prn: prn }); // Filter by PRN

        if (totalEventCount === 0) {
            console.log(`Validation passed for PRN ${prn}: No events found, allowing submission.`);
            return true; // Allow if there are no events (ratio is effectively 0)
        }

        const formSubmissionRatio = studentFormCount / totalEventCount;

        if (formSubmissionRatio > MAX_FORM_SUBMISSION_RATIO) {
            console.log(`Validation failed for PRN ${prn}: Form submission ratio (${formSubmissionRatio.toFixed(2)}) exceeds maximum (${MAX_FORM_SUBMISSION_RATIO}).`);
            return false; // Reject: Submission ratio too high
        }

        // --- Allow Submission ---
        console.log(`Validation passed for PRN ${prn}: Attendance (${attendancePercentage}%) >= ${MIN_ATTENDANCE}% and Ratio (${formSubmissionRatio.toFixed(2)}) <= ${MAX_FORM_SUBMISSION_RATIO}.`);
        return true; // Allow submission

    } catch (error) {
        console.error(`Error during validation for PRN ${prn}:`, error);
        return false; // Reject on error
    }
}

module.exports = {
    validateSubmission,
    connectDB, // Export connect/close if managed externally
    closeDB
}; 