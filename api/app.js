import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"; // Import path for serving static files
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();
const __dirname = path.resolve(); // Resolve the current directory

const allowedOrigins = [
  "http://localhost:5173", // For local development
  "https://real-estate-dev-2.onrender.com", // Replace with your Render frontend URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/dist"))); // Ensure "dist" is correct

// Catch-all handler for React routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html")); // Ensure "dist" is correct
});

// Start the server
const port = process.env.PORT || 8800; // Use Render's PORT or fallback to 8800 for local development
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});