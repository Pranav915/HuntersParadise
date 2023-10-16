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
  password: {
    type: String,
  },
  age:{
    type:String,
  },
  subscribedCategories:{
    type:String,
  },
  wallet:{
    totalBalance:{
      type:String,
    },
    availableBalance: {
      type:String,
    },
    outStandingBalance: {
      type: String,
    },
    freezedBalance: {
      type: String,
    },
    transactions:[
      {
        transaction: {
          type: Schema.Types.ObjectId,
          ref: "Transaction"
        }
      }
    ]
  }

  
});

module.exports = model("User", userSchema);
