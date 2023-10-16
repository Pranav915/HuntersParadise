const createAuction = (req, res) => {
    console.log("Hello, webhook triggered!!!");
    console.log(req.body);
    res.send("Done");
}
exports.controllers = {
    createAuction,
};