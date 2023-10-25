const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const upcomingAuctionSchema = new Schema({
  auctionId: {
    type: Number,
    required:true,
    unique:true
  },
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
        type: Number,
        required: true
    },
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
}, {
    timestamps: true
  });
module.exports = mongoose.model("UpcomingAuction", upcomingAuctionSchema);
