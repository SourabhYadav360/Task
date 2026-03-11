import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
dotenv.config();

const app = express();


// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

// view engine setup
app.set("view engine", "ejs")

// views folder
app.set("views", path.join(process.cwd(), "views"))

const PORT = 4000;

connectDB();



app.use("/api/auth",authRoutes)

app.get("/", (req, res) => {
  res.send("Server is running on port 4000");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
