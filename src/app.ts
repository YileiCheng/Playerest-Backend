import express from "express";
import userRoutes from "./routes/userRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/comments", commentRoutes);

export default app;
