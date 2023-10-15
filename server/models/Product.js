const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  productTitle: {
    type: String,
  },
  productDesc: {
    type: String
  },
  productPic: {
    type: String
  }
});
module.exports = mongoose.model("Product", productSchema);
