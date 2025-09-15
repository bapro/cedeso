import { Router } from "express";
import {
  submitForm,
  getForms,
  getFormById,
} from "../controllers/formController";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

// Upload endpoint
router.post("/upload", upload.array("images", 10), (req, res) => {
  // router.post("/upload", upload.single("image"), (req, res) => {
  try {
    // if (!req.file) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "No file uploaded",
    //   });
    // }
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }
    const files = req.files as Express.Multer.File[];
    const uploadedUrls = files.map((file) => `/uploads/${file.filename}`);
    // Return the file path (you might want to return a full URL in production)
    res.json({
      success: true,
      // imageUrl: `/uploads/${req.file.filename}`,
      imageUrls: uploadedUrls, // Return array instead of single URL
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "File upload failed",
    });
  }
});

// Your existing routes
router.post("/submit", submitForm);
router.get("/forms", getForms);
router.get("/forms/:id", getFormById);

export default router;
