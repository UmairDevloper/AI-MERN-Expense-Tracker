const asyncHandler = require("express-async-handler");
const Transaction = require("../models/Transaction");

//! user Controller

const transactionCtrl = {
  //* Add category
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;

    //? Check if type, amount, date and description of category already exists
    if (!type || !amount || !date) {
      throw new Error("Please add type, amount, date  of category");
    }

    //? create
    const transaction = await Transaction.create({
      user: req.user,
      category,
      type,
      amount,
      date,
      description,
    });

    res.status(201).json(transaction);
  }),

  //*  Lists category
  lists: asyncHandler(async (req, res) => {
    const transaction = await Transaction.find({ user: req.user });
    res.status(200).json(transaction);
  }),

  //* transactionFilter
  transactionFilter: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    let filters = { user: req.user };

    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }
    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(endDate) };
    }
    if (type) {
      filters.type = type;
    }
    if (category) {
      if (category === "All") {
        //!  No category filter needed when filtering for 'All'
      } else if (category === "Uncategorized") {
        //! Filter for transactions that are specifically categorized as 'Uncategorized'
        filters.category = "Uncategorized";
      } else {
        filters.category = category;
      }
    }
    const transactions = await Transaction.find(filters).sort({ date: -1 });
    res.json(transactions);
  }),
  //* Update category
  update: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id)
    if (transaction && transaction.user.toString() === req.user.toString()) {
      (transaction.type = req.body.type || transaction.type),
      (transaction.category = req.body.category || transaction.category),
      (transaction.amount = req.body.amount || transaction.amount),
      (transaction.date = req.body.date || transaction.date),
      (transaction.description = req.body.description || transaction.description);
      
      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    }
  }),
  //* Delete category
  delete: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      await Transaction.findByIdAndDelete(req.params.id)
      res.json({ message: "Transaction removed" });
    }
  }),
};

module.exports = transactionCtrl;
