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
    default: "$",
  },
  items: {
    type: Array,
    default: [],
  },
});

module.exports = List = mongoose.model("list", ListSchema);

// {
//   "id": "oxhdyufgih",
//   "name": "General shared",
//   "shared status": true,
//   "currency": "AUD",
//   "items": [
//     { "name": "groceries", "total": "100" },
//     { "name": "rent", "total": "660" }
//   ]
// }
