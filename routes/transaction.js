const express = require("express");
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require("../controllers/transaction");

const router = express.Router();

//routes
//POST- add all transactions
router.post("/add-transaction", addTransaction);

//POST- edit all transactions
router.post("/edit-transaction", editTransaction);

// New delete transaction route
router.post("/delete-transaction", deleteTransaction);

//POST- get all transactions
router.post("/get-transaction", getAllTransaction);

module.exports = router;