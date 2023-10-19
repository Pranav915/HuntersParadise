const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const completedDeal = new Schema({
  productName: {
    type: String,
  },
  productImage: {
    type: String,
  },
  category: {
    type: String,
  },
  dealDescription: {
    type: String
  },
  price: {
    type: String
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  sellerName: {
    type: String
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  buyerName: {
    type: String
  },
  offers: [{
    offer: {
        type: Schema.Types.ObjectId,
        ref: "DealOffers"
    }
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("CompletedDeal", completedDeal);
