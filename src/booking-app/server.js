require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const app = express();

const session = require("express-session");


app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Cấu hình session
app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Nếu dùng HTTPS, đổi thành true
}));


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
app.post("/bookings", async (req, res) => {
    try {
        let { branch_id, branch, address, name, phone, date, time, people } = req.body;

        console.log("Dữ liệu nhận được:", req.body);

        // 🔹 Nếu `branch_id` bị rỗng, tìm trong database theo `branch`
        if (!branch_id) {
            const getBranchIdQuery = `SELECT id FROM branches WHERE name = ? LIMIT 1`;
            const [[branchData]] = await db.promise().query(getBranchIdQuery, [branch]);

            if (branchData) {
                branch_id = branchData.id;
                console.log("Đã tìm thấy branch_id:", branch_id);
            } else {
                return res.status(400).json({ error: "Chi nhánh không tồn tại" });
            }
        }

        // 1️⃣ Lấy tổng số bàn của chi nhánh
        const getTablesQuery = `SELECT total_tables FROM branches WHERE id = ?`;
        const [[{ total_tables }]] = await db.promise().query(getTablesQuery, [branch_id]);

        if (!total_tables) {
            return res.status(400).json({ error: "Chi nhánh không hợp lệ" });
        }

        console.log("Tổng số bàn:", total_tables);

        // 2️⃣ Tính khoảng thời gian 2 tiếng
        const checkTimeStart = time;
        const checkTimeEnd = new Date(new Date(`1970-01-01T${time}`).getTime() + 2 * 60 * 60 * 1000)
            .toISOString()
            .substring(11, 19);

        // 3️⃣ Đếm số bàn đã đặt trong khoảng thời gian đó
        const countBookedTablesQuery = `
            SELECT COUNT(*) AS booked_tables
            FROM booked_tables
            WHERE branch_id = ? AND date = ? 
            AND ((time >= ? AND time < ?) OR (time <= ? AND ADDTIME(time, '02:00:00') > ?))
        `;
        const [[{ booked_tables }]] = await db.promise().query(countBookedTablesQuery, 
            [branch_id, date, checkTimeStart, checkTimeEnd, checkTimeStart, checkTimeEnd]);

        console.log("Số bàn đã đặt:", booked_tables);

        // 4️⃣ Xác định trạng thái booking
        let status = booked_tables < total_tables ? "Confirmed" : "Canceled";

        // 5️⃣ Thêm vào bảng bookings
        const insertBookingQuery = `
            INSERT INTO bookings (branch_id, address, name, phone, date, time, people, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const [bookingResult] = await db.promise().query(insertBookingQuery, 
            [branch_id, address || "", name, phone, date, time, people, status]);

        const bookingId = bookingResult.insertId;
        // console.log("Booking thành công, ID:", bookingId);

        // 6️⃣ Nếu `Confirmed`, thêm vào `booked_tables`
        if (status === "Confirmed") {
            const insertBookedTableQuery = `
                INSERT INTO booked_tables (branch_id, date, time, people, booking_id)
                VALUES (?, ?, ?, ?, ?);
            `;
            await db.promise().query(insertBookedTableQuery, [branch_id, date, time, people, bookingId]);
            console.log("Bàn đã được cập nhật vào booked_tables.");

            console.log("Booking thành công, ID:", bookingId);
            // res.json({ message: "Booking successful", booking_id: bookingId, status });

            const bookingData = { ...req.body, booking_id: bookingId };

            res.json({
                message: "Your booking has been successfully confirmed!",
                booking_id: bookingId,
                status: "Confirmed",
                // Thêm URL mở invoice vào response
                invoiceUrl : `./wp-content/wp-list/invoice.html?booking_id=${bookingId}`,
                bookingData
            });
        }
        else {
            console.log("⚠️ Booking failed: No available tables for the selected time.");
            // res.json({ message: "Booking failed: No available tables. Please select another time", booking_id: bookingId, status });
            res.json({
                message: "Unfortunately, there are no available tables at your selected time. Please choose a different time slot.",
                status: "Canceled"
            });
        }

        // res.json({ message: "Booking created", booking_id: bookingId, status });

    } catch (error) {
        console.error("Lỗi tạo booking:", error);
        res.status(500).json({ error: error.message });
    }
});



// API: Lấy danh sách Bookings
app.get("/bookings", async (req, res) => {
    try {
        const query = "SELECT * FROM bookings";
        const [bookings] = await db.promise().query(query);
        res.json(bookings);
    } catch (error) {
        console.error("Lỗi lấy danh sách bookings:", error);
        res.status(500).json({ error: error.message });
    }
});

// API: Lấy danh sách bàn đã đặt
app.get("/booked-tables", async (req, res) => {
    try {
        const query = "SELECT * FROM booked_tables";
        const [bookedTables] = await db.promise().query(query);
        res.json(bookedTables);
    } catch (error) {
        console.error("Lỗi lấy danh sách bàn đã đặt:", error);
        res.status(500).json({ error: error.message });
    }
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

app.post('/create-booking', (req, res) => {
    const { name, phone, date, time, people, branch } = req.body;

    // Lấy branch_id từ bảng branches
    const getBranchIdSQL = "SELECT id FROM branches WHERE name = ?";
    db.query(getBranchIdSQL, [branch], (err, result) => {
        if (err || result.length === 0) {
            return res.status(400).send("Chi nhánh không hợp lệ");
        }
        const branch_id = result[0].id;

        // Chèn booking với branch_id
        const insertBookingSQL = `
            INSERT INTO bookings (branch_id, name, phone, date, time, people, status)
            VALUES (?, ?, ?, ?, ?, ?, 'Pending')
        `;
        db.query(insertBookingSQL, [branch_id, name, phone, date, time, people], (err, result) => {
            if (err) return res.status(500).send("Lỗi khi tạo booking");
            res.send("Booking đã được tạo!");
        });
    });
});

app.post('/update-booked-tables', async (req, res) => {
    try {
        // Câu lệnh SQL để cập nhật booked_tables với các booking đã Confirmed nhưng chưa có trong bảng này
        const query = `
            INSERT INTO booked_tables (branch_id, date, time, people, booking_id)
            SELECT branch_id, date, time, people, id
            FROM bookings
            WHERE status = 'Confirmed'
            AND id NOT IN (SELECT booking_id FROM booked_tables)
        `;

        // Thực hiện truy vấn
        const [result] = await db.promise().query(query);

        // Kiểm tra số hàng bị ảnh hưởng
        if (result.affectedRows > 0) {
            console.log(`✅ Đã cập nhật ${result.affectedRows} booking vào booked_tables.`);
            res.json({ message: `✅ Đã cập nhật ${result.affectedRows} booking vào booked_tables.` });
        } else {
            console.log("⚠ Không có booking nào cần cập nhật.");
            res.json({ message: "⚠ Không có booking nào cần cập nhật." });
        }

    } catch (error) {
        console.error("❌ Lỗi cập nhật booked_tables:", error);
        res.status(500).json({ error: "❌ Lỗi cập nhật booked_tables" });
    }
});

app.patch('/bookings/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;  // "Confirmed" hoặc "Canceled"

        if (!["Confirmed", "Canceled"].includes(status)) {
            return res.status(400).json({ error: "Trạng thái không hợp lệ" });
        }

        // Cập nhật trạng thái
        const updateQuery = `UPDATE bookings SET status = ? WHERE id = ?`;
        const [result] = await db.promise().query(updateQuery, [status, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Booking không tồn tại" });
        }

        res.json({ message: `Booking ${id} đã được cập nhật thành ${status}` });

    } catch (error) {
        console.error("Lỗi cập nhật trạng thái:", error);
        res.status(500).json({ error: "Lỗi hệ thống" });
    }
});

//  API Đăng nhập
app.post("/api/login", (req, res) => {
    console.log("Dữ liệu nhận từ frontend:", req.body); // ✅ Kiểm tra dữ liệu nhận được

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu" });
    }

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn MySQL:", err);
            return res.status(500).json({ success: false, message: "Lỗi server" });
        }

        if (results.length > 0) {
            return res.json({ success: true, message: "Đăng nhập thành công!" });
        } else {
            return res.status(401).json({ success: false, message: "Sai thông tin đăng nhập." });
        }
    });
});


// 📌 API Lấy danh sách admin (chỉ admin đã đăng nhập mới xem được)
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "Không có token" });

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token không hợp lệ" });
        req.user = decoded;
        next();
    });
};

app.get("/api/admins", verifyToken, (req, res) => {
    db.query("SELECT id, username FROM admins", (err, results) => {
        if (err) return res.status(500).json({ error: "Lỗi server" });
        res.json(results);
    });
});

// Middleware kiểm tra quyền admin
function authAdmin(req, res, next) {
    if (!req.session || !req.session.isAdmin) {
        return res.status(403).json({ success: false, message: "Bạn không có quyền truy cập!" });
    }
    next();
}

// 📌 API LẤY DANH SÁCH CHI NHÁNH
app.get("/api/branches", (req, res) => {
    const sql = "SELECT * FROM branches";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn MySQL:", err);
            return res.status(500).json({ success: false, message: "Lỗi server" });
        }
        res.json({ success: true, branches: results });
    });
});

// 📌 API THÊM CHI NHÁNH (Chỉ admin mới được thêm)
app.post("/branches", async (req, res) => {
    try {
        const { name, address, total_tables } = req.body;

        if (!name || !address || !total_tables) {
            return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin chi nhánh" });
        }

        // Kiểm tra xem chi nhánh đã tồn tại chưa
        const checkQuery = "SELECT id FROM branches WHERE name = ?";
        const [existingBranch] = await db.promise().query(checkQuery, [name]);

        if (existingBranch.length > 0) {
            return res.status(400).json({ error: "Chi nhánh đã tồn tại" });
        }

        // Thêm chi nhánh vào database
        const insertQuery = "INSERT INTO branches (name, address, total_tables) VALUES (?, ?, ?)";
        const [result] = await db.promise().query(insertQuery, [name, address, total_tables]);

        res.json({ message: "Chi nhánh đã được thêm thành công!", branch_id: result.insertId });
    } catch (error) {
        console.error("Lỗi thêm chi nhánh:", error);
        res.status(500).json({ error: "Lỗi hệ thống" });
    }
});


// 📌 API CẬP NHẬT CHI NHÁNH (Chỉ admin mới được cập nhật)
app.put("/api/branches/:id", authAdmin, (req, res) => {
    const { id } = req.params;
    const { name, address, image_url } = req.body;

    const sql = "UPDATE branches SET name = ?, address = ?, image_url = ? WHERE id = ?";
    db.query(sql, [name, address, image_url, id], (err, result) => {
        if (err) {
            console.error("Lỗi cập nhật chi nhánh:", err);
            return res.status(500).json({ success: false, message: "Lỗi server" });
        }
        res.json({ success: true, message: "Cập nhật chi nhánh thành công!" });
    });
});

// 📌 API XOÁ CHI NHÁNH (Chỉ admin mới được xoá)
app.delete("/api/branches/:id", authAdmin, (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM branches WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Lỗi xoá chi nhánh:", err);
            return res.status(500).json({ success: false, message: "Lỗi server" });
        }
        res.json({ success: true, message: "Xoá chi nhánh thành công!" });
    });
});


function authAdmin(req, res, next) {
    if (!req.session || !req.session.isAdmin) {
        return res.status(403).json({ success: false, message: "Bạn không có quyền truy cập!" });
    }
    next();
}

app.get("/booked-tables/:branch_id", async (req, res) => {
    try {
        const { branch_id } = req.params;

        // Truy vấn lấy danh sách booked tables theo branch_id
        const query = `
            SELECT booking_id, date, time, people, branch_id
            FROM booked_tables
            WHERE branch_id = ?
            ORDER BY date ASC;
        `;

        const [bookedTables] = await db.promise().query(query, [branch_id]);

        res.json(bookedTables);
    } catch (error) {
        console.error("Lỗi lấy danh sách booked tables:", error);
        res.status(500).json({ error: "Lỗi hệ thống" });
    }
});

app.get("/", (req, res) => {
    res.send("Server đang chạy!");
});


// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});