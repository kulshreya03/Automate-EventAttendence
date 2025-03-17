const express = require("express");
const { registerEvent, getEventsByDivision } = require("../controllers/eventController");
const upload = require("../middleware/uploadMiddleware");
const { loginStudent, loginTeacher } = require("../controllers/authController")

const router = express.Router();

router.post("/register", upload.single("certificate"), registerEvent); //register event
router.get("/events/:division", getEventsByDivision); //retrieve data
router.post("/loginStud", loginStudent);  //student login
router.post("/loginTeacher",loginTeacher); //teacher login

// /image/name-image 
// coding - form path from image name and send image as content 
module.exports = router;
