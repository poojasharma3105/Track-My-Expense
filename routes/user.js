const express = require("express");
const { loginController, registerController } = require("../controllers/user");

const router = express.Router();

//POST- login
router.post("/login", loginController);

//POST- register
router.post("/register", registerController);


module.exports = router;