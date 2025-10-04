const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database (JSON file)
const DB_FILE = "database.json";
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ events: [], doubts: [] }, null, 2));
}

// Helper function to read/write DB
function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE));
}
function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ---------------- ROUTES ---------------- //

// Get events
app.get("/events", (req, res) => {
    const db = readDB();
    res.json(db.events);
});

// Add new event
app.post("/events", (req, res) => {
    const { name, date } = req.body;
    if (!name || !date) return res.status(400).json({ error: "Missing fields" });

    const db = readDB();
    const newEvent = { id: Date.now(), name, date };
    db.events.push(newEvent);
    writeDB(db);
    res.json(newEvent);
});

// Submit a doubt
app.post("/doubts", (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Question required" });

    const db = readDB();
    const newDoubt = { id: Date.now(), question, status: "Pending" };
    db.doubts.push(newDoubt);
    writeDB(db);
    res.json(newDoubt);
});

// Get all doubts
app.get("/doubts", (req, res) => {
    const db = readDB();
    res.json(db.doubts);
});

// ---------------- START SERVER ---------------- //
app.listen(PORT, () => {
    console.log(Server running on http://localhost:${PORT});
});