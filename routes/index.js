var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const baseDailyUrl = "https://www.kadinlarduysun.com/gunluk-burc-yorumlari"
router.get('/horoscope', function (req, res, next) {
  const fetch = require("node-fetch");
  const horoscopeName = req.query.name;
  const url = baseDailyUrl + ("/" + horoscopeName + "-burcu-gunluk-burc-yorumu").trim();
  const result = fetch(url)
    .then((response) => response.text())
    .then((text) => {
      const DOMParser = require('xmldom').DOMParser;
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(text, "text/xml").getElementsByClassName("reading")[0];
      console.log(htmlDocument.firstChild.innerHTML);
      const response = res.json({ title: htmlDocument.childNodes[1].textContent, content: htmlDocument.childNodes[3].textContent });
      return response;
    })
    .catch((err) => console.log(err));
  // fetch('https://www.sabah.com.tr/magazin/2020/05/23/uzman-astrolog-zeynep-turan-ile-gunluk-burc-yorumlari-23-mayis-2020-cumartesi-gunluk-burc-yorumu-ve-astroloji/')
  //     .then(resp => resp.text()).then(body => console.log(body)).catch(err => console.log(err));

  if (result)
    return result;
  res.json({ result: 'Horoscope content:' });
});

module.exports = router;
