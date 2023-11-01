const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const completedAuctionSchema = new Schema(
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
    endTime: {
        type: Date
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("CompletedAuction", completedAuctionSchema);
