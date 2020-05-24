var express = require('express');
var router = express.Router();
const dailyController = require('../controller/dailyController');
const weeklyController = require('../controller/weeklyController');

router.get('/daily', dailyController);
router.get('/weekly', weeklyController);

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });
module.exports = router;
