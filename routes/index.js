var express = require('express');
var router = express.Router();
const dailyController = require('../controller/dailyController');
const weeklyController = require('../controller/weeklyController');
const monthlyController = require('../controller/monthlyController');
const yearlyController = require('../controller/yearlyController');
const dailyStatusController = require('../controller/dailyStatusController');
const serverStatusController = require('../controller/serverStatusController');

router.get('/daily', dailyController);
router.get('/dailyStatus', dailyStatusController);
router.get('/weekly', weeklyController);
router.get('/monthly', monthlyController);
router.get('/yearly', yearlyController);
router.get('/time', serverStatusController);

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });
module.exports = router;
