import express from "express"
import cors from "cors"

// Setup app
const app = express();
app.use(cors());
app.use(express.json());

// Import routers
import userRouter from "./routes/user.js"
// import profileRouter from "./routes/customer.js"
// import foodRouter from "./routes/food.js"
// import orderRouter from "./routes/order.js"

// Setup routes
app.use("/user", userRouter);
// app.use("/profile", profileRouter);
// app.use("/food", foodRouter);
// app.use("/order", orderRouter);
app.use("*", (req, res) => res.status(404).json({ error: "Not Found"}));

export default app