const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dealOffers = new Schema({
  deal: {
    type: Schema.Types.ObjectId,
    ref: "LiveDeals"
  },
  sellerName: {
    type: String,
  },
  offered_by: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  offered_by_name: {
    type: String,
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
module.exports = mongoose.model("dealOffers", dealOffers);
