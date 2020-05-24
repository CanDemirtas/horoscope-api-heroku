const baseUrl = "https://www.elle.com.tr/astroloji";

module.exports = function (req, res, next) {
    const fetch = require("node-fetch");
    const horoscopeName = req.query.name;
    const url = baseUrl + ("/" + horoscopeName + "/haftalik").trim();
    const result = fetch(url)
        .then((response) => response.text())
        .then((text) => {
            const DOMParser = require('xmldom').DOMParser;
            const parser = new DOMParser();
            // const htmlDocument = parser.parseFromString(text, "text/xml").getElementsByClassName("standard-article-body--text")[0];
            const htmlContent = parser.parseFromString(text, "text/xml").getElementsByClassName("body-el-text standard-body-el-text");
            const response = res.json({ title: htmlContent[1].childNodes[1].textContent, content: htmlContent[2].childNodes[2].textContent.replace("&rsquo;", "") }
            );
            return response;
        })
        .catch((err) => console.log(err));

    if (result)
        return result;
    res.json({ result: 'Horoscope content:' });
};


