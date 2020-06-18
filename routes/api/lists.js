const express = require("express");
const router = express.Router();

const List = require("../../models/List");

// @route GET api/lists
// @desc Get all lists
// @access public
router.get("/", (req, res) => {
  List.find().then((lists) => res.json(lists));
});

// @route POST api/lists
// @desc Create a list
// @access public
router.post("/", (req, res) => {
  const newList = new List({
    name: req.body.name,
    shared: req.body.shared,
    currency: req.body.currency,
  });

  newList
    .save()
    .then((list) => res.json(list))
    .catch((err) => console.log(err));
});

// @route POST api/lists/list
// @desc Add an item to a list
// @access public
router.post("/list", (req, res) => {
  List.findByIdAndUpdate(
    req.body.id,
    {
      $push: { items: { name: req.body.name, total: 0 } },
    },
    { new: true }
  ).then((list) => res.json(list));
});

module.exports = router;
