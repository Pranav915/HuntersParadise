const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const upcomingAuctionSchema = new Schema(
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
          default: "pending",
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
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("UpcomingAuction", upcomingAuctionSchema);
