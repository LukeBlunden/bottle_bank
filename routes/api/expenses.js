const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const ExpenseGroup = require("../../models/ExpenseGroup");
const User = require("../../models/User");

// @route GET api/expenses
// @desc Get all expenses
// @access private
router.get("/:id", auth, (req, res) => {
  ExpenseGroup.find({ users: req.params.id })
    .then((expenses) => res.json(expenses))
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
});

// @route POST api/expenses
// @desc Create an expense group
// @access private
router.post("/", auth, (req, res) => {
  // console.log(req.body);
  const newExpenseGroup = new ExpenseGroup({
    name: req.body.newExpense.name,
    currency: req.body.newExpense.currency,
    shared: req.body.newExpense.shared,
    users: [req.body.id],
  });

  newExpenseGroup
    .save()
    .then((expenseGroup) => res.json(expenseGroup))
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
});

// @route DELETE api/expenses
// @desc Delete an expense group
// @access private
router.delete("/:id", auth, (req, res) => {
  console.log(req.params.id);
  ExpenseGroup.findByIdAndDelete(req.params.id)
    .then((expenseGroup) => res.json(expenseGroup))
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
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
  )
    .then((expenseGroup) => res.json(expenseGroup))
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
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
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
});

router.post("/user", auth, (req, res) => {
  User.findOne({ email: req.body.email })
    .then((res) =>
      ExpenseGroup.findByIdAndUpdate(
        req.body.id,
        {
          $push: { users: res._id.toString() },
        },
        { new: true }
      )
    )
    .catch((err) => res.status(400).json({ msg: "User not found" }));
});

module.exports = router;
