import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
// register admin
export const registerAdmin = async (req, res)=>{
try {
    const {name, email, password}= req.body

    if (!name||!email||!password){
        return res.status(400).json({message : "All feilds are required"});
    }

    const existingAdmin = await Admin.findOne({email});

    if(existingAdmin){
        return res.status(400).json({message:"Admin already exist. Please Proceed to Login"});
    }
    // Hash pasword
const hashedPassword = await bcrypt.hash(password , 10);
// Create admin

const admin =await Admin.create({
name,
email,
password:hashedPassword
})
    res.status(201).json({
      message: "Admin created successfully.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
} catch (error) {
res.status(500).json({message : error.message,})
}
};


// login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password.",
      });
    }

    // Find admin
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};