import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin routes 
router.post("/", authMiddleware, upload.single("image"), createProduct);
router.put("/:id",authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;