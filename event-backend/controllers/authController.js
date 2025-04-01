const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");  // ✅ Import JWT

const JWT_SECRET = process.env.JWT_SECRET || "shreya";

const loginStudent = async (req, res) => {
    try {
        const { prn, password } = req.body;

        // Find student by PRN
        const student = await Student.findOne({ prn });

        if (!student || student.password !== password) {
            return res.status(401).json({ message: "Invalid PRN or password" });
        }


        // Generate JWT Token
        const token = jwt.sign({ prn: student.prn, role: "student" }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });
        
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

const loginTeacher = async (req, res) => {
    try {
        const { uname, password } = req.body;

        // Find student by PRN
        const teacher = await Teacher.findOne({ uname });
        if (!teacher || teacher.password !== password) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ uname: teacher.uname, role: "teacher" }, JWT_SECRET, { expiresIn: "1h" });
        const div = teacher.division;
        const faculty = teacher.faculty;

        res.status(200).json({ token,div,faculty });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

// Token Verification Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach decoded user data to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = { loginStudent, loginTeacher, verifyToken };
