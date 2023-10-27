const CategoryInfo = require('../../models/CategoryInfo');
const LiveAuction = require('../../models/LiveAuction');
const User = require('../../models/User');
const getLiveData = async (req, res) => {
    var liveDeals = 0;
    var totalLiveDeals = 0;
    await User.findById(req.user.userId).then((user) => {
        CategoryInfo.find({category: { $in: user.subscribedCategories }}).then((data) => {
            liveDeals = data.reduce((sum, category) => {
                return sum + category.numberLiveDeals;
              }, 0);
        }).catch((err) => {
            console.log("Error while fetching Live data", err);
            res.status(501).send("Error while fetching Live data");
            return;
        })
    }).catch((err) => {
        console.log("Error getting User categaries", err);
        res.status(501).send("Error getting User categaries");
    });
    await CategoryInfo.find({}).then((data) => {
        totalLiveDeals = data.reduce((sum, category) => {
            return sum + category.numberLiveDeals;
        }, 0);
    }).catch((err) => {
        console.log("Error while fetching Live data", err);
        res.status(501).send("Error while fetching Live data");
        return;
    })
    await LiveAuction.find({}).then((data) => {
        res.status(200).send({
            "liveDeals": liveDeals,
            "totalLiveDeals": totalLiveDeals,
            "liveAuctions": data.length
        });
    }).catch((err) => {
        console.log("Error while fetching Live data", err);
        res.status(501).send("Error while fetching Live data");
        return;
    });
}
module.exports = getLiveData;
