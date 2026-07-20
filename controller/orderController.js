import Order from "../models/Order.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      products,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      products,
      totalPrice,
    });

    res.status(201).json({
      message: "Order placed successfully.",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Orders
export const getOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("products.product");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Order
export const getOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("products.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.status(200).json({
      message: "Order updated successfully.",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};