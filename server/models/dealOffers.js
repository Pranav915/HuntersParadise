const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dealOffers = new Schema({
  deal: {
    type: Schema.Types.ObjectId,
    ref: "LiveDeals"
  },
  offered_by: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  offeredPrice: {
    type: String
  },
  askedPrice: {
    type: String
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("DealOffers", dealOffers);
