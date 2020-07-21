const baseUrl = "https://www.elle.com.tr/astroloji";
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
String.prototype.turkishToUpper = function () {
    var string = this;
    var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
    string = string.replace(/(([iışğüçö]))/g, function (letter) { return letters[letter]; })
    return string.toUpperCase();
}
const cache = {};

module.exports = function (req, res, next) {
    const fetch = require("node-fetch");
    const horoscopeName = req.query.name;
    const url = baseUrl + ("/" + horoscopeList[horoscopeName] + "/aylik").trim();
    if (cache["date" + horoscopeName] == new Date().getMonth()) {
        return res.json(cache["object" + horoscopeName]);
    }
    const result = fetch(url)
        .then((response) => response.text())
        .then((text) => {
            const DOMParser = require('xmldom').DOMParser;
            const parser = new DOMParser();
            // const htmlDocument = parser.parseFromString(text, "text/xml").getElementsByClassName("standard-article-body--text")[0];
            const htmlContent = parser.parseFromString(text, "text/xml").getElementsByClassName("body-el-text standard-body-el-text");
            const jsonObject = { title: horoscopeList[horoscopeName][0].turkishToUpper() + horoscopeList[horoscopeName].slice(1) + " Burcu Aylık Yorum", content: htmlContent[1].textContent.replace(/&rsquo;/g, "'").replace(/\n/g, "") };
            const response = res.json(jsonObject);
            cache["object" + horoscopeName] = jsonObject
            cache["date" + horoscopeName] = new Date().getMonth()
            return response;
        })
        .catch((err) => { return res.json({ title: "", content: "Sistemde hata oluştu. Daha sonra tekrar deneyiniz." }) });

    if (result)
        return result;
    res.json({ result: 'Horoscope content:' });
};



