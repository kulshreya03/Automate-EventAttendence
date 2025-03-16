const express = require("express");
const { registerEvent, getEventsByDivision } = require("../controllers/eventController");
const upload = require("../middleware/uploadMiddleware");
const { loginStudent } = require("../controllers/authController")

const router = express.Router();

router.post("/register", upload.single("certificate"), registerEvent); //register event
router.get("/events/:division", getEventsByDivision); //retrieve data
router.post("/login", loginStudent);  //student login

module.exports = router;
