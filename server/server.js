import express from "express";
import connectToDb from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieparse from "cookie-parser";
import authRouter from "./routes/auth.js";
import productrouter from "./routes/admin/products_routes.js";
dotenv.config();
connectToDb();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "pragma",
    ],
    credentials: true,
  }),
);
app.use(cookieparse());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", productrouter);
app.listen(PORT, (req, res) => {
  console.log(`Server run succesfully on port ${PORT}`);
});
