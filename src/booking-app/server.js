require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

// API booking
app.post("/bookings", (req, res) => {
    const { branch, address, name, phone, date, time, people } = req.body;

    const sql = "INSERT INTO bookings (branch, address, name, phone, date, time, people) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [branch, address, name, phone, date, time, people], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Booking successful!", bookingId: result.insertId });
    });
});

// API customers
app.post("/customers", (req, res) => {
    const { first_name, last_name, email, dob, phone_number, privacy_agreed } = req.body;

    if (!first_name || !last_name || !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const checkEmailSQL = "SELECT email FROM customers WHERE email = ?";
    db.query(checkEmailSQL, [email], (err, results) => {
        if (err) {
            console.error("Error checking email:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
            // Email đã tồn tại
            return res.status(400).json({ message: "Email already exists. Please use another email." });
        }

        // Nếu email chưa tồn tại, tiến hành chèn vào MySQL
        const insertSQL = "INSERT INTO customers (first_name, last_name, email, dob, phone_number, privacy_agreed) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(insertSQL, [first_name, last_name, email, dob || null, phone_number, privacy_agreed], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.status(500).json({ message: "Error saving customer data" });
            }
            res.json({ message: "Customer data saved successfully!" });
        });
    });
});


// API xuất hóa đơn PDF
app.get("/invoice/:id", (req, res) => {
    const bookingId = req.params.id;
    const sql = "SELECT * FROM bookings WHERE id = ?";

    db.query(sql, [bookingId], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ error: "Không tìm thấy đặt bàn" });
        }

        const booking = result[0];
        const doc = new PDFDocument();
        const filePath = `./invoice_${bookingId}.pdf`;
        const writeStream = fs.createWriteStream(filePath);

        doc.pipe(writeStream);
        doc.fontSize(18).text("Invoice", { align: "center" });
        doc.fontSize(12).text(`ID: ${booking.id}`);
        doc.text(`Branch: ${booking.branch}`);
        doc.text(`Address: ${booking.address}`);
        doc.text(`Name: ${booking.name}`);
        doc.text(`Phone: ${booking.phone}`);
        doc.text(`Date: ${booking.date}`);
        doc.text(`Time: ${booking.time}`);
        doc.text(`People: ${booking.people}`);
        doc.end();

        writeStream.on("finish", () => {
            res.download(filePath);
        });
    });
});

app.get("/", (req, res) => {
    res.send("Server đang chạy!");
});


// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});