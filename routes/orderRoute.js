import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
} from "../controller/orderController.js";

const router = express.Router();

// Customer places an order
router.post("/", createOrder);

// Admin views all orders
router.get("/", authMiddleware, getOrders);

// Admin views one order
router.get("/:id", authMiddleware, getOrder);

// Admin updates order status
router.put("/:id", authMiddleware, updateOrderStatus);

export default router;