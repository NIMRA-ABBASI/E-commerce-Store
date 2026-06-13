import express from "express";
import connectToDb from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieparse from 'cookie-parser'
import authRouter from './routes/auth.js'
dotenv.config();
connectToDb();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["Get", "Post", "Put", "Delete"],
    allowedHeaders: [
      "Content-type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "pragma",
    ],
    credentials:true
  }),
);
app.use(cookieparse())
app.use(express.json())
app.use('/api/auth',authRouter)

app.listen(PORT, (req, res) => {
  console.log(`Server run succesfully on port ${PORT}`);
});
