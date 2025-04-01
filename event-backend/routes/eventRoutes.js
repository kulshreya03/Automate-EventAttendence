const express = require("express");
const { registerEvent, getEventsByDivision, getEventsByFaculty } = require("../controllers/eventController");
const upload = require("../middleware/uploadMiddleware");
const { loginStudent, loginTeacher,verifyToken } = require("../controllers/authController")

const router = express.Router();

// Public Routes (Login)
router.post("/loginStud", loginStudent);
router.post("/loginTeacher", loginTeacher);

// Protected Routes (Only authenticated users can access)
router.post("/register", upload.single("certificate"), registerEvent);  //register event
router.get("/events/:division", getEventsByDivision);  //retieve data
router.get("/faculty/:faculty",getEventsByFaculty);  

// /image/name-image 
// coding - form path from image name and send image as content 
module.exports = router;
