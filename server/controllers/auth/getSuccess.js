const jwt = require("jsonwebtoken");

const getSuccess = (req, res) => {
  const user = req.user;
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

  const userDetails = {
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
  };
  const userDetailedEncrypted = jwt.sign(
    { userDetails },
    process.env.AUTH_TOKEN,
    {
      expiresIn: "72h",
    }
  );
  return res.redirect(
    "http://localhost:3000/dashboard?user=" + userDetailedEncrypted
  );
};

module.exports = getSuccess;
