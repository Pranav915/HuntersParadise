const CategoryInfo = require('../../models/CategoryInfo');
const LiveAuction = require('../../models/LiveAuction');
const User = require('../../models/User');
const getLiveData = (req, res) => {
    var liveDeals = 0;
    User.findById(req.user.userId).then((user) => {
        CategoryInfo.find({category: { $in: user.subscribedCategories }}).then((data) => {
            liveDeals = data.length;
        }).catch((err) => {
            console.log("Error while fetching Live data", err);
            res.status(501).send("Error while fetching Live data");
            return;
        })
    });
    LiveAuction.find({}).then((data) => {
        res.status(200).send({
            "liveDeals": liveDeals,
            "liveAuctions": data.length
        });
    }).catch((err) => {
        console.log("Error while fetching Live data", err);
        res.status(501).send("Error while fetching Live data");
        return;
    });
}
module.exports = getLiveData;
