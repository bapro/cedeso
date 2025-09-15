import "reflect-metadata";
import express from "express";
import cors from "cors";
import path from "path";
import * as dotenv from "dotenv";
import sequelize from "./config/database-local";

import formRoutes from "./routes/forms";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());

app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log("Origin:", req.headers.origin);
  console.log("Headers:", req.headers);
  next();
});
// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
app.use("/api", formRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  }
);

// Database connection and server startup
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync database (use { force: true } only in development to reset tables)
    await sequelize.sync({ force: process.env.NODE_ENV === "development" });
    console.log("Database synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
