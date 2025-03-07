const Gallery = require("../models/Gallery");

// Lấy danh sách ảnh
exports.getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Thêm ảnh mới
exports.uploadImage = async (req, res) => {
  try {
    const { title } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageUrl) return res.status(400).json({ message: "Vui lòng tải lên ảnh" });

    const newImage = new Gallery({ title, imageUrl });
    await newImage.save();
    
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa ảnh
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    await Gallery.findByIdAndDelete(id);
    res.json({ message: "Xóa ảnh thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
