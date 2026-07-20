import Product from "../models/product.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
    } = req.body;
if (!req.file) {
  return res.status(400).json({
    message: "Product image is required.",
  });
}

const image = req.file.path;
    const product = await Product.create({
      name,
      description,
      price,
      image,
    });

    res.status(201).json({
      message: "Product created successfully.",
      product,
    });

  } catch (error) {
  console.error("Create Product Error:", error);

  res.status(500).json({
    message: error.message,
  });
}
};
// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};