const baseUrl = "https://www.horoscope.com/star-ratings/today";
const horoscopeList = {
    "aquarius": "kova",
    "pisces": "balik",
    "aries": "koc",
    "taurus": "boga",
    "gemini": "ikizler",
    "cancer": "yengec",
    "leo": "aslan",
    "virgo": "basak",
    "libra": "terazi",
    "scorpio": "akrep",
    "sagittarius": "yay",
    "capricorn": "oglak",
};

const cache = {};

module.exports = function (req, res, next) {
    const fetch = require("node-fetch");
    const horoscopeName = req.query.name;
    const url = baseUrl + ("/" + horoscopeName).trim();

    const date = new Date();
    if (cache["date" + horoscopeName] == date.toLocaleDateString("tr-TR") &&
        !(Number(cache["lastUpdatedHour" + horoscopeName]) <= 13 && Number(cache["lastUpdatedMinutes" + horoscopeName]) <= 10 && date.getHours() >= 13 && date.getMinutes() >= 10)
    ) {

        return res.json(cache["object" + horoscopeName]);
    };

    const result = fetch(url)
        .then((response) => response.text())
        .then((text) => {
            const DOMParser = require('xmldom').DOMParser;
            const parser = new DOMParser();
            const jsonObject = {
                sex: calculateStarCount(parser.parseFromString(text, "text/html").getElementsByClassName("module-skin")[0].childNodes[3]),
                hustle: calculateStarCount(parser.parseFromString(text, "text/html").getElementsByClassName("module-skin")[0].childNodes[7]),
                vibe: calculateStarCount(parser.parseFromString(text, "text/html").getElementsByClassName("module-skin")[0].childNodes[11]),
                success: calculateStarCount(parser.parseFromString(text, "text/html").getElementsByClassName("module-skin")[0].childNodes[15]),
                love: parser.parseFromString(text, "text/html").getElementsByClassName("inner flex-center-inline")[0].childNodes[1].childNodes[5].textContent.toLowerCase(),
                friendship: parser.parseFromString(text, "text/html").getElementsByClassName("inner flex-center-inline")[0].childNodes[3].childNodes[5].textContent.toLowerCase(),
                career: parser.parseFromString(text, "text/html").getElementsByClassName("inner flex-center-inline")[0].childNodes[5].childNodes[5].textContent.toLowerCase()
            };

            const response = res.json(jsonObject);
            cache["object" + horoscopeName] = jsonObject
            cache["date" + horoscopeName] = date.toLocaleDateString("tr-TR")
            cache["lastUpdatedHour" + horoscopeName] = date.getHours()
            cache["lastUpdatedMinutes" + horoscopeName] = date.getMinutes()
            return response;
        })
        .catch((err) => { return res.json({}) });

    if (result)
        return result;
    res.json({ result: 'Horoscope content:' });
};


function calculateStarCount(doc) {
    var starCount = 0;
    for (var i = 1; i < doc.childNodes.length; i++) {
        if (doc.childNodes[i].attributes[0].textContent == "icon-star-filled highlight") {
            starCount++;
        }
    }
    return starCount;
}