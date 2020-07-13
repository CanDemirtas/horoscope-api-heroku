var express = require('express');
var router = express.Router();
const dailyController = require('../controller/dailyController');
const weeklyController = require('../controller/weeklyController');
const monthlyController = require('../controller/monthlyController');
const yearlyController = require('../controller/yearlyController');

router.get('/daily', dailyController);
router.get('/weekly', weeklyController);
router.get('/monthly', monthlyController);
router.get('/yearly', yearlyController);

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });
module.exports = router;
