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
// Get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({
      featured: true,
    });

    res.status(200).json(featuredProducts);

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
      featured,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required.",
      });
    }

    const image = req.file.path;

    const isFeatured = featured === "true";

    const product = await Product.create({
      name,
      description,
      price,
      image,
      featured: isFeatured,
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

    // Find the product before updating
    const currentProduct = await Product.findById(id);

    if (!currentProduct) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    // Check if admin is trying to remove featured status
    if (
      currentProduct.featured === true &&
      req.body.featured === false
    ) {
      // Count current featured products
      const featuredCount = await Product.countDocuments({
        featured: true,
      });

      // Prevent fewer than 2 featured products
      if (featuredCount <= 2) {
        return res.status(400).json({
          message: "You must have at least 2 featured products.",
        });
      }
    }
        const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      featured: req.body.featured,
    };

    // Only replace image if admin wants to uplaod new image 
    if (req.file) {
      updateData.image = req.file.path;
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
        updateData,
      }
    );

    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });

  } catch (error) {
    console.error("Update Product Error:", error);

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