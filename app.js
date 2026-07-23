import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoute.js";
import productRoutes from "./routes/productRoutes.js";
import subscriberRoutes from "./routes/subscriberRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoute from "./routes/userRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/subscriber", subscriberRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/auth", userRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Be-Jewelry Backend Running ",
  });
});

export default app;