const students = require("./students.json");
const express = require("express");
const app = express();
const PORT = 3000;
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
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});