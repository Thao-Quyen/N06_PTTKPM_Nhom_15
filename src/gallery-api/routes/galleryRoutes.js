const express = require("express");
const multer = require("multer");
const { getAllImages, uploadImage, deleteImage } = require("../controllers/galleryController");

const router = express.Router();

// Cấu hình Multer để upload ảnh
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Định nghĩa các route
router.get("/", getAllImages);
router.post("/upload", upload.single("image"), uploadImage);
router.delete("/:id", deleteImage);

module.exports = router;
