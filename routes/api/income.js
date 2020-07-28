const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const IncomeGroup = require("../../models/IncomeGroup");

// @route GET api/income
// @desc Get all income
// @access private
router.get("/", auth, (req, res) => {
  IncomeGroup.find()
    .then((income) => res.json(income))
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
});

// @route POST api/income
// @desc Create an income group
// @access private
router.post("/", auth, (req, res) => {
  const newIncomeGroup = new IncomeGroup({
    name: req.body.name,
    shared: req.body.shared,
    currency: req.body.currency,
  });

  newIncomeGroup
    .save()
    .then((incomeGroup) => res.json(incomeGroup))
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
});

// @route DELETE api/income
// @desc Delete an income group
// @access private
router.delete("/", auth, (req, res) => {
  IncomeGroup.findByIdAndDelete(req.body.id)
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
  const { description, amount, category, selectedDate } = req.body;
  IncomeGroup.findByIdAndUpdate(
    req.body.id,
    {
      $push: { log: { description, amount, category, selectedDate } },
    },
    { new: true }
  )
    .then((incomeGroup) => res.json(incomeGroup))
    .catch((err) => res.status(500).json({ msg: "Internal Server Error" }));
});

module.exports = router;
