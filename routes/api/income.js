const express = require("express");
const router = express.Router();

const IncomeGroup = require("../../models/IncomeGroup");

// @route GET api/income
// @desc Get all income
// @access public
router.get("/", (req, res) => {
  IncomeGroup.find().then((income) => res.json(income));
});

// @route POST api/income
// @desc Create an income group
// @access public
router.post("/", (req, res) => {
  const newIncomeGroup = new IncomeGroup({
    name: req.body.name,
    shared: req.body.shared,
    currency: req.body.currency,
  });

  newIncomeGroup
    .save()
    .then((incomeGroup) => res.json(incomeGroup))
    .catch((err) => console.log(err));
});

// @route DELETE api/income
// @desc Delete an income group
// @access public
router.delete("/", (req, res) => {
  IncomeGroup.findByIdAndDelete(req.body.id)
    .then((incomeGroup) => res.json(incomeGroup))
    .catch((err) => console.log(err));
});

// @route POST api/income/category
// @desc Add a category to an income group
// @access public
router.post("/category", (req, res) => {
  IncomeGroup.findByIdAndUpdate(
    req.body.id,
    {
      $push: { categories: { name: req.body.name } },
    },
    { new: true }
  ).then((incomeGroup) => res.json(incomeGroup));
});

// @route POST api/income/item
// @desc Add an income item to an income category
// @access public
router.post("/item", (req, res) => {
  const { description, amount, category, selectedDate } = req.body;
  IncomeGroup.findByIdAndUpdate(
    req.body.id,
    {
      $push: { log: { description, amount, category, selectedDate } },
    },
    { new: true }
  )
    .then((incomeGroup) => res.json(incomeGroup))
    .catch((err) => console.log(err));
});

module.exports = router;
