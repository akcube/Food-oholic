import express from "express"
import cors from "cors"

// Setup app
const app = express();
app.use(cors());
app.use(express.json());

// Setup routes
app.use("*", (req, res) => res.status(404).json({ error: "Not Found"}));

export default app