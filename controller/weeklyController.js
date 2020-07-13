const baseUrl = "https://www.elle.com.tr/astroloji";
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
    const url = baseUrl + ("/" + horoscopeList[horoscopeName] + "/haftalik").trim();
    const result = fetch(url)
        .then((response) => response.text())
        .then((text) => {
            const DOMParser = require('xmldom').DOMParser;
            const parser = new DOMParser();
            // const htmlDocument = parser.parseFromString(text, "text/xml").getElementsByClassName("standard-article-body--text")[0];
            const htmlContent = parser.parseFromString(text, "text/xml").getElementsByClassName("body-el-text standard-body-el-text");
            const response = res.json({ title: horoscopeList[horoscopeName][0].toUpperCase() + horoscopeList[horoscopeName].slice(1)+" Burcu Haftalık Yorum", content: htmlContent[2].childNodes[2].textContent.replace("&rsquo;", "") }
            );
            return response;
        })
        .catch((err) => { return res.json({ title: "", content: "Sistemde hata oluştu. Daha sonra tekrar deneyiniz." }) });

    if (result)
        return result;
    res.json({ result: 'Horoscope content:' });
};

