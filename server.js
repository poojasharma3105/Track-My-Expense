const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");

//config dot env file
dotenv.config();

//database call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
//user routes
app.use("/users", require("./routes/user.js"));

//transaction routes
app.use("/transactions", require("./routes/transaction.js"));

//port
const PORT = process.env.PORT || 8080;

//listen server
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});