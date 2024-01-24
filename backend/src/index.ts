import express from "express";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import userroutes from "./routes/userRoutes.js";

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Requested-With, Accept"
  );
  next();
});

app.set("trust proxy", 1);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// routes

app.use("/", userroutes);

app.get("/", (req, res) => {
  res.send("helloo");
});

const port = process.env.PORT || 5000; // Default to port 3000 if PORT environment variable is not set

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
