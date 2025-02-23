const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Supports JSON and images in base64

// Database Connection with Auto-Reconnect
const db = mysql.createConnection({
    host: "127.0.0.1",  // Use 127.0.0.1 instead of localhost
    user: "root",
    password: process.env.DB_PASSWORD,  // Use .env variable for security
    database: "class_vision",
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        process.exit(1);
    }
    console.log("✅ Connected to MySQL database!");
});

// Auto-reconnect on connection loss
db.on("error", (err) => {
    console.error("❌ Database error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("🔄 Reconnecting to database...");
        db.connect();
    }
});

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// ✅ Register Student Route
app.post("/register", (req, res) => {
    const { student_id, name, image } = req.body;

    if (!student_id || !name || !image) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const sql = "INSERT INTO students (id, name, image) VALUES (?, ?, ?)";
    db.query(sql, [student_id, name, image], (err, result) => {
        if (err) {
            console.error("❌ Error inserting student:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        res.json({ success: true, message: "✅ Student registered successfully!" });
    });
});

// ✅ Take Attendance Route (Face Recognition-based)
app.post("/attendance", (req, res) => {
    const { subject, image } = req.body;

    if (!subject || !image) {
        return res.status(400).json({ success: false, message: "Missing subject or image data" });
    }

    const sqlFindStudent = "SELECT id FROM students WHERE image = ?";
    
    db.query(sqlFindStudent, [image], (err, results) => {
        if (err) {
            console.error("❌ Error recognizing student:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "❌ No matching student found!" });
        }

        const recognizedStudentId = results[0].id;
        const sqlInsertAttendance = "INSERT INTO attendance (student_id, subject, timestamp) VALUES (?, ?, NOW())";

        db.query(sqlInsertAttendance, [recognizedStudentId, subject], (err, result) => {
            if (err) {
                console.error("❌ Error recording attendance:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }
            res.json({ success: true, message: "✅ Attendance recorded successfully!" });
        });
    });
});




// ✅ View Attendance Records Route
app.get("/attendance", (req, res) => {
    const sql = `
        SELECT 
            a.student_id, 
            s.name, 
            a.subject, 
            a.timestamp 
        FROM attendance a
        JOIN students s ON a.student_id = s.id
        ORDER BY a.timestamp DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Error fetching attendance:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        res.json(results);
    });
});

// ✅ Get All Students Route (For dropdown selection in TakeAttendance)
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
