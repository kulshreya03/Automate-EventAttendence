const express = require("express");
const { registerEvent, getEventsByDivision } = require("../controllers/eventController");
const upload = require("../middleware/uploadMiddleware");
const { loginStudent, loginTeacher,verifyToken } = require("../controllers/authController")

const router = express.Router();

// Public Routes (Login)
router.post("/loginStud", loginStudent);
router.post("/loginTeacher", loginTeacher);

// Protected Routes (Only authenticated users can access)
router.post("/register", verifyToken, upload.single("certificate"), registerEvent);  //register event
router.get("/events/:division", verifyToken, getEventsByDivision);  //retieve data

// /image/name-image 
// coding - form path from image name and send image as content 
module.exports = router;
