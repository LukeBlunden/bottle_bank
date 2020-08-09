const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const IncomeGroup = require("../../models/IncomeGroup");

// @route GET api/income
// @desc Get all income
// @access private
router.get("/:id", auth, (req, res) => {
  IncomeGroup.find({ "users.id": req.params.id })
    .then((income) => res.json(income))
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
});

// @route POST api/income
// @desc Create an income group
// @access private
router.post("/", auth, (req, res) => {
  const newIncomeGroup = new IncomeGroup({
    name: req.body.newIncome.name,
    shared: req.body.newIncome.shared,
    currency: req.body.newIncome.currency,
    users: [req.body.user],
  });

  newIncomeGroup
    .save()
    .then((incomeGroup) => res.json(incomeGroup))
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
});

// @route DELETE api/income
// @desc Delete an income group
// @access private
router.delete("/:id", auth, (req, res) => {
  IncomeGroup.findByIdAndDelete(req.params.id)
    .then((incomeGroup) => res.json(incomeGroup))
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
});

// @route POST api/income/category
// @desc Add a category to an income group
// @access private
router.post("/category", auth, (req, res) => {
  IncomeGroup.findByIdAndUpdate(
    req.body.id,
    {
      $push: { categories: { name: req.body.name } },
    },
    { new: true }
  )
    .then((incomeGroup) => res.json(incomeGroup))
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
});

// @route POST api/income/item
// @desc Add an income item to an income category
// @access private
router.post("/item", auth, (req, res) => {
  const { description, amount, category, selectedDate, recurring } = req.body;
  IncomeGroup.findByIdAndUpdate(
    req.body.id,
    {
      $push: {
        log: { description, amount, category, selectedDate, recurring },
      },
    },
    { new: true }
  )
    .then((incomeGroup) => res.json(incomeGroup))
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
});

router.post("/user", auth, (req, res) => {
  User.findOne({ email: req.body.email })
    .then((res) => {
      const addUser = { id: res._id.toString(), name: res.name };
      IncomeGroup.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { users: addUser } },
        { new: true },
        (err, res) => (err ? console.log(err) : console.log(res))
      );
    })
    .catch((err) => res.status(400).json({ msg: "User not found" }));
});

module.exports = router;
