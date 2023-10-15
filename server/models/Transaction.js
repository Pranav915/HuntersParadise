const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  amount: {
    type: String
  },
  status: {
    type: String
  }
}, {
    timestamps: true
});
module.exports = mongoose.model("Transaction", transactionSchema);
