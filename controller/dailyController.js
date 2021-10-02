// const baseUrl = "https://www.kadinlarduysun.com/gunluk-burc-yorumlari";


const baseUrl = "https://www.kadinlarduysun.com/gunluk-burc-yorumlari"
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
    const url = baseUrl + ("/" + horoscopeList[horoscopeName] + "-burcu-gunluk-burc-yorumu").trim();

    const date = new Date();
    if (cache["date" + horoscopeName] == date.toLocaleDateString("tr-TR") && Number(cache["lastUpdatedHour" + horoscopeName]) == date.getHours()) {
        return res.json(cache["object" + horoscopeName]);
    };

    const result = fetch(url)
        .then((response) => response.text())
        .then((text) => {
            const DOMParser = require('xmldom').DOMParser;
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, "text/html").getElementsByClassName("reading")[0];
            const jsonObject = [
                { title: htmlDocument.childNodes[1].textContent, content: htmlDocument.childNodes[2].textContent.split("–")[1] },
                { title: htmlDocument.childNodes[4].textContent, content: htmlDocument.childNodes[5].textContent.split("–")[1] },
                { title: htmlDocument.childNodes[6].textContent, content: htmlDocument.childNodes[7].textContent.split("–")[1] }];

            const response = res.json(jsonObject);
            cache["object" + horoscopeName] = jsonObject;
            cache["date" + horoscopeName] = date.toLocaleDateString("tr-TR");
            cache["lastUpdatedHour" + horoscopeName] = date.getHours();

            return response;
        })
        .catch((err) => { return res.json([{ title: "", content: "Sistemde hata oluştu. Daha sonra tekrar deneyiniz." }, { title: "", content: "Sistemde hata oluştu. Daha sonra tekrar deneyiniz." }, { title: "", content: "Sistemde hata oluştu. Daha sonra tekrar deneyiniz." }]) });

    if (result)
        return result;
    res.json({ result: 'Horoscope content:' });
};


