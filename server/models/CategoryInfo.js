const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categoryInfo = new Schema({
  category: {
    type: String,
  },
  numberDeals: {
    type: Number,
  },
  valuation: {
    type: Number,
  },
  numberSubscribers:{
    type: Number
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("CategoryInfo", categoryInfo);