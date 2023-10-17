const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const liveDeals = new Schema({
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
  askPrice: {
    type: String,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  sellerName: {
    type: String
  },
  offers: [{
    offer: {
        type: Schema.Types.ObjectId,
        ref: "dealOffers"
    }
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("LiveAuction", liveDeals);
