const express = require("express");
const { registerEvent, getEventsByDivision } = require("../controllers/eventController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", upload.single("certificate"), registerEvent);
router.get("/events/:division", getEventsByDivision);

module.exports = router;
