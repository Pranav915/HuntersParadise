const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const liveAuctionSchema = new Schema({
  auctionId: {
    type: String,
    required: true,
    unique: true,
  },
  auctionTitle: {
    type: String,
    required: true,
  },
  productList:[{
    product: {
        name: {
          type: String,
        },
        description: {
          type: String,
        },
        image: {
          type: String
        }
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
    type: String,
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
