var express = require('express');
var router = express.Router();
const horoscopeController = require('../controller/horoscopeController');
router.get('/', horoscopeController);

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });
module.exports = router;
