const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const liveAuctionSchema = new Schema({
  auctionTitle: {
    type: String,
    required: true,
  },
  productList:[{
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "product"
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
        ref: "product"
      },
      bidPrice: {
        type: String
      }
    }
  }],
  auctionHost: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  startTime: {
    type: Date,
    required: true
  },
  currentProduct: {
    type: Schema.Types.ObjectId,
    ref: "product"
  },
  bids: [{
    bidder: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user"
    },
    bidValue: {
      type: String
    },
    raisedAt: {
      type: Date,
      default: Date.now,
    }
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("LiveAuction", liveAuctionSchema);
