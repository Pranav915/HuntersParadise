const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).send("User not found. Please Register.");
    }
    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      // Send a new token
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        process.env.AUTH_TOKEN,
        {
          expiresIn: "72h",
        }
      );
      return res.status(200).json({
        userDetails: {
          token: token,
          userId: user._id,
          email: user.email,
          username: user.username,
          age: user.age,
          country: user.country,
          name: user.name,
          phoneNumber: user.phoneNumber,
          categories: user.categories,
          wallet: user.wallet
        },
      });
    }

    return res.status(400).send("Invalid Credentials. Please try again");
  } catch (error) {
    console.log("error", error);
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = postLogin;
