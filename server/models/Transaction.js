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
  sender_name: {
    type: String,
  },
  reciever_name: {
    type: String,
  },
  amount: {
    type: String
  },
}, {
    timestamps: true
});
module.exports = mongoose.model("Transaction", transactionSchema);
