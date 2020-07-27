const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const ExpenseGroup = require("../../models/ExpenseGroup");

// @route GET api/expenses
// @desc Get all expenses
// @access public
router.get("/", (req, res) => {
  ExpenseGroup.find().then((expenses) => res.json(expenses));
});

// @route POST api/expenses
// @desc Create an expense group
// @access private
router.post("/", auth, (req, res) => {
  const newExpenseGroup = new ExpenseGroup({
    name: req.body.name,
    shared: req.body.shared,
    currency: req.body.currency,
  });

  newExpenseGroup
    .save()
    .then((expenseGroup) => res.json(expenseGroup))
    .catch((err) => console.log(err));
});

// @route DELETE api/expenses
// @desc Delete an expense group
// @access private
router.delete("/", auth, (req, res) => {
  ExpenseGroup.findByIdAndDelete(req.body.id)
    .then((expenseGroup) => res.json(expenseGroup))
    .catch((err) => console.log(err));
});

// @route POST api/expenses/category
// @desc Add a category to an expense group
// @access private
router.post("/category", auth, (req, res) => {
  ExpenseGroup.findByIdAndUpdate(
    req.body.id,
    {
      $push: { categories: { name: req.body.name } },
    },
    { new: true }
  ).then((expenseGroup) => res.json(expenseGroup));
});

// @route POST api/expenses/expense
// @desc Add an expense item to an expense category
// @access private
router.post("/item", auth, (req, res) => {
  const { description, amount, category, selectedDate } = req.body;
  ExpenseGroup.findByIdAndUpdate(
    req.body.id,
    {
      $push: { log: { description, amount, category, selectedDate } },
    },
    { new: true }
  )
    .then((expenseGroup) => res.json(expenseGroup))
    .catch((err) => console.log(err));
});

module.exports = router;
