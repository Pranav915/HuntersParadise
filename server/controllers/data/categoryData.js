const CategoryInfo = require("../../models/CategoryInfo");
const getCategoryInfo = (req, res) => {
  CategoryInfo.find({})
    .then((data) => {
      res.status(200).send(data);
      return;
    })
    .catch((err) => {
      console.log("Error while fetching data for Categories", err);
      res.status(501).send("Error while fetching data for Categories");
    });
};
module.exports = getCategoryInfo;
