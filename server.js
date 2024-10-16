const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const path = require("path");

// Config dot env file
dotenv.config();

// Database call
connectDb();

// Create an express app
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// API routes
app.use("/users", require("./routes/user.js"));
app.use("/transactions", require("./routes/transaction.js"));

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the client/build folder
  app.use(express.static(path.join(__dirname, "client/build")));

  // All other GET requests that are not API routes should return the React app's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Define the PORT
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
