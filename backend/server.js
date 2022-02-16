import express from "express"
import cors from "cors"

// Setup app
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

// Import routers
import userRouter from "./routes/user.js"
import foodRouter from "./routes/food.js"
import vendorRouter from "./routes/vendor.js"
import customerRouter from "./routes/customer.js";
import orderRouter from "./routes/order.js"

// Setup routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/customer", customerRouter);
app.use("/api/order", orderRouter);
app.use("/api/*", (req, res) => res.status(404).json({ error: "Not Found"}));

export default app