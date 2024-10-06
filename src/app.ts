import express from "express";
import userRoutes from "./routes/userRoutes";
import reviewRoutes from "./routes/reviewRoutes";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
export default app;
