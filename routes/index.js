var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('connexion');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/', function(req, res, next) {
  res.render('connexion');
});

module.exports = router;
