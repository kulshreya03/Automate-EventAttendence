const Student = require("../models/Student");
const Teacher = require("../models/Teacher")

const loginStudent = async (req, res) => {
    try {
        const { prn, password } = req.body;

        // Find student by PRN
        const student = await Student.findOne({ prn });

        if (!student) {
            return res.status(401).json({ message: "Invalid PRN or password" });
        }

        // Directly compare plain text password
        if (student.password !== password) {
            return res.status(401).json({ message: "Invalid PRN or password" });
        }

        res.status(200).json({
            prn: student.prn
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

const loginTeacher = async (req, res) => {
    try {
        const { uname, password } = req.body;

        // Find student by PRN
        const teacher = await Teacher.findOne({ uname });

        if (!teacher) {
            return res.status(401).json({ message: "Invalid uname or password" });
        }

        // Directly compare plain text password
        if (teacher.password !== password) {
            return res.status(401).json({ message: "Invalid uname or password" });
        }

        res.status(200).json({
            uname: teacher.uname
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

module.exports = { loginStudent, loginTeacher };
