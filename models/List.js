const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
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
  expenseLog: {
    type: Array,
    default: [],
  },
});

module.exports = List = mongoose.model("list", ListSchema);
