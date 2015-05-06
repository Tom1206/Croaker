var express = require('express');
var router = express.Router();


var croaks = [];
 
router.post('/home', function(req, res, next) {
    croaks.unshift(req.body.croak);
    res.redirect('/home')
});

router.get('/home', function(req, res, next) {
  res.render('home', { croaks: croaks });
});

router.get('/', function(req, res) {
  res.render('index');
});
 
  /*
  router.post('/', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true 
  }));
  
  router.post('/', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true 
  }));*/

module.exports = router;
