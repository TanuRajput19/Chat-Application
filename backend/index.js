import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// ✅ CORS options
const corsOptions = {
  origin: "https://chat-application-frontend-z3kb.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ Handle preflight


// ✅ Extra CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://chat-application-frontend-z3kb.onrender.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// ✅ Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
