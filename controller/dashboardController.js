import Product from "../models/product.js";
import Subscriber from "../models/Subscriber.js";

export const getDashboardStats = async (req, res) => {
  try {

    const totalProducts = await Product.countDocuments();

    const featuredProducts = await Product.countDocuments({
      featured: true,
    });

    const outOfStockProducts = await Product.countDocuments({
      stock: 0,
    });

    const totalSubscribers = await Subscriber.countDocuments();

    res.status(200).json({
      totalProducts,
      featuredProducts,
      outOfStockProducts,
      totalSubscribers,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};