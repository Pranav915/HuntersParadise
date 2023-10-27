const User = require("../../models/User");
const CategoryInfo = require("../../models/CategoryInfo");
const jwt = require("jsonwebtoken");

const addInitialDetails = async (req, res) => {
  try {
    const {
      age,
      country,
      name,
      phoneNumber,
      profilePhoto,
      subscribedCategories,
    } = req.body;
    console.log("req.body", req.body);
    const userId = req.user.userId;
    console.log("userId", userId);
    await User.updateOne(
      { _id: userId },
      {
        age: age,
        country: country,
        name: name,
        phoneNumber: phoneNumber,
        profilePhoto: profilePhoto,
        $push: {
          subscribedCategories: subscribedCategories,
        },
      }
    );
    const user = await User.findOne({ _id: userId });
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.AUTH_TOKEN,
      {
        expiresIn: "72h",
      }
    );
    console.log("user", user);
    await CategoryInfo.updateMany(
      { category: { $in: subscribedCategories } },
      { $inc: { numberSubscribers: 1 } }
    );
    res.status(201).json({
      userDetails: {
        token: token,
        userId: user._id,
        email: user.email,
        username: user.username,
        age: user.age,
        country: user.country,
        name: user.name,
        profilePhoto: user.profilePhoto,
        phoneNumber: user.phoneNumber,
        categories: user.subscribedCategories,
        wallet: user.wallet,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error Occured. Please try again");
  }
};

module.exports = addInitialDetails;
