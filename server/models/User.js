const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  country: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: String,
  },
  subscribedCategories: [
    {
      type: String,
    },
  ],
  offers: [
    {
      offerid: {
        type: Schema.Types.ObjectId,
        ref: "dealOffers",
      },
    },
  ],
  listedDeals: [
    {
      dealid: {
        type: Schema.Types.ObjectId,
        ref: "LiveDeals",
      },
    },
  ],
  wallet: {
    totalBalance: {
      type: String,
      default: "0",
    },
    availableBalance: {
      type: String,
      default: "0",
    },
    outStandingBalance: {
      type: String,
      default: "0",
    },
    freezedBalance: {
      type: String,
      default: "0",
    },
    transactions: [
      {
        transaction: {
          type: Schema.Types.ObjectId,
          ref: "Transaction",
        },
      },
    ],
  },
});

module.exports = model("User", userSchema);
