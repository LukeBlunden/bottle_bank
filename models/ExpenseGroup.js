const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  shared: {
    type: Boolean,
    default: false,
  },
  currency: {
    type: String,
    default: "EUR",
  },
  categories: {
    type: Array,
    default: [],
  },
  log: {
    type: Array,
    default: [],
  },
});

module.exports = ExpenseGroup = mongoose.model("expenseGroup", ExpenseSchema);
