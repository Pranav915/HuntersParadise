const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const liveAuctionSchema = new Schema(
  {
    auctionId: {
      type: Number,
      required: true,
      unique: true,
    },
    auctionTitle: {
      type: String,
      required: true,
    },
    auctionDescription: {
      type: String,
    },
    productList: [
      {
        product: {
          name: {
            type: String,
          },
          description: {
            type: String,
          },
          image: {
            type: String,
          },
        },
        startBid: {
          type: String,
          required: true,
        },
        status: {
          type: String,
        },
        highestbid: {
          highestBidder: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          bidPrice: {
            type: Number,
          },
        },
      },
    ],
    auctionHost: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    startTime: {
      type: Date,
      required: true,
    },
    currentProduct: {
      type: String,
    },
    currentHighestBid: {
      bidder: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      bidValue: {
        type: String,
      },
    },
    bids: [
      {
        bidder: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        bidValue: {
          type: String,
        },
        raisedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("LiveAuction", liveAuctionSchema);
