const students = require("./students.json");
const express = require("express");
const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.use((req, res, next) => {
    const time = new Date().toLocaleTimeString();
    console.log(`${req.method} ${req.url} ${time}`);
    next();
});
app.use(express.json());
app.get("/", (req, res) => {
    res.send(`
        <h1>Student API in Express</h1>
        <p>Welcome to the Student API.</p>
        <h3>Available Routes:</h3>
        <ul>
            <li>GET /api/students</li>
            <li>GET /api/students/1</li>
            <li>GET /api/students?major=IT</li>
        </ul>
    `);
});
app.get("/api/students", (req, res) => {
    const major = req.query.major;
    if (major) {
        const filteredStudents = students.filter((s) => s.major === major);
        return res.json(filteredStudents);
    }
    res.json(students);
});
app.post("/api/students", (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.status(201).json(newStudent);
});
app.get("/students", (req, res) => {
    res.render("students", {
        title: "All Students",
        students: students
    });
});
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});