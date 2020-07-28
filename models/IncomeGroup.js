const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IncomeSchema = new Schema({
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
  users: {
    type: Array,
    default: [],
  },
});

module.exports = IncomeGroup = mongoose.model("incomeGroup", IncomeSchema);
