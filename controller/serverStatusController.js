
module.exports = function (req, res, next) {
    res.json({ time: new Date().toLocaleTimeString()});
};



