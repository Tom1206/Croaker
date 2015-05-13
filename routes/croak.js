var express = require('express');
var authenticate = require('../passport/authenticate.js');
var router = express.Router();


//var croak = require('../models/croak');
var croaks = [];

module.exports = function(passport){

router.post('/home', function(req, res, next) {
    croaks.unshift(req.body.croak);
    res.redirect('/home')
});

router.get('/home', function(req, res, next) {
  res.render('home', { croaks: croaks });
});

 return router;
}
