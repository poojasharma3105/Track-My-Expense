const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
const path = require("path");

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


// //static files
// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", function(req,res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

//port
const PORT = process.env.PORT || 8080;

//listen server
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});