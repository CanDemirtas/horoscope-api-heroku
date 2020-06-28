const baseUrl = "https://www.kadinlarduysun.com/gunluk-burc-yorumlari";
const horoscopeList={
    "aquarius":"kova",
    "pisces":"balik",
    "aries":"koc",
    "taurus":"boga",
    "gemini":"ikizler",
    "cancer":"yengec",
    "leo":"aslan",
    "virgo":"basak",
    "libra":"terazi",
    "scorpio":"akrep",
    "sagittarius":"yay",
    "capricorn":"oglak",
};
module.exports = function (req, res, next) {
    const fetch = require("node-fetch");
    const horoscopeName = req.query.name;
    const url = baseUrl + ("/" + horoscopeList[horoscopeName] + "-burcu-gunluk-burc-yorumu").trim();
    const result = fetch(url)
        .then((response) => response.text())
        .then((text) => {
            const DOMParser = require('xmldom').DOMParser;
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, "text/html").getElementsByClassName("reading")[0];
            const response = res.json([
                { title: htmlDocument.childNodes[1].textContent, content: htmlDocument.childNodes[3].textContent },
                { title: htmlDocument.childNodes[7].textContent, content: htmlDocument.childNodes[9].textContent + htmlDocument.childNodes[11].textContent },
                { title: htmlDocument.childNodes[13].textContent, content: htmlDocument.childNodes[15].textContent }]);
            return response;
        })
        .catch((err) => console.log(err));

    if (result)
        return result;
    res.json({ result: 'Horoscope content:' });
};


