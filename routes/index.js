var express = require('express');
var router = express.Router();

var croaks = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('connexion');
});

router.post('/home', function(req, res, next) {
    croaks.unshift(req.body.croak);
    res.redirect('/home')
});

router.get('/home', function(req, res, next) {
  res.render('home', { croaks: croaks });
});

module.exports = router;
