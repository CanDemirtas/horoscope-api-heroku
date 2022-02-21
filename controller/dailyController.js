// const baseUrl = "https://www.kadinlarduysun.com/gunluk-burc-yorumlari";


const baseUrl = "https://hthayat.haberturk.com/astroloji/index"
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
    const url = baseUrl + ("/" + horoscopeList[horoscopeName]).trim();

    const date = new Date();
    if (cache["date" + horoscopeName] == date.toLocaleDateString("tr-TR") && Number(cache["lastUpdatedHour" + horoscopeName]) == date.getHours()) {
        return res.json(cache["object" + horoscopeName]);
    };

    const result = fetch(url)
        .then((response) => response.text())
        .then((text) => {
            const DOMParser = require('xmldom').DOMParser;
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, "text/html").getElementsByClassName("widget-horoscope-today")[0];
            const jsonObject = [
                { title: htmlDocument.childNodes[3].childNodes[1].childNodes[0].textContent+" "+ horoscopeList[horoscopeName].charAt(0).toUpperCase() + horoscopeList[horoscopeName].slice(1), content: htmlDocument.childNodes[3].childNodes[3].childNodes[1].textContent },
                { title: "", content:"" },
                { title: "", content:"" }
            ];

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


