const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PastAuctionSchema = new Schema({
  auctionTitle: {
    type: String,
    required: true,
  },
  productList:[{
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    startBid: {
        type: String,
        required: true
    },
    status: {
      type: String
    },
    highestbid: {
      highestBidder: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
      },
      bidPrice: {
        type: String
      }
    }
  }],
  auctionHost: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  startTime: {
    type: Date,
    required: true
  },
}, {
  timestamps: true
});
module.exports = mongoose.model("PastAuction", PastAuctionSchema);
