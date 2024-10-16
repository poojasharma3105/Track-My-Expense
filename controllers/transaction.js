const transactionModel = require("../models/transaction");
const moment = require("moment");

module.exports.getAllTransaction = async(req,res) => {
    try{
        const {frequency, selectedDate, type, userid} = req.body;
        const transactions = await transactionModel.find({
            ...(frequency !== "custom" ? {
                date: {
                    $gt : moment().subtract(Number(frequency), "d").toDate(),
                },
            } : {
                date: {
                    $gte : selectedDate[0],
                    $lte : selectedDate[1],
                },
            }),
            userid: userid,
            ...(type !== "all" && {type}),
        });
        res.status(200).json(transactions);
    }catch (error){
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports.editTransaction = async(req,res) => {
    try{
        await transactionModel.findOneAndUpdate(
            { _id: req.body.transactionId },
            req.body.payload
        );
        res.status(200).send("Edit Successfully!");
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports.deleteTransaction = async (req, res) => {
    try {
        await transactionModel.findByIdAndDelete({_id:req.body.transactionId});
        res.status(200).send("Transaction Deleted Successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports.addTransaction = async(req,res) => {
    try{
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send("transaction Created!");
    }catch (error){
        console.log(error);
        res.status(500).json(error);
    }
};