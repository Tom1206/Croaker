var express = require('express');
var moment = require('moment');
var authenticate = require('../passport/authenticate.js');
var router = express.Router();


var tweet = require('../models/croak');
var User = require('../models/user');


module.exports = function(passport){

    router.get('/home', authenticate.auth, function(req, res){
                tweet.find().limit(req.body.nbtweet).sort({date: -1}).exec( function (err, tweets) {
              if (err) return console.error(err);
                res.render('home', { user: req.user, tweet: tweets});
            });
    });


    router.post('/home', authenticate.auth, function(req, res) {
  		// Add the tweet to the database
        var date = moment().format('YYYY/MM/DD, HH:mm');
  		var newtweet = new tweet({username: req.user.username, tweet: req.body.Tweet, date: date});
  		newtweet.save();
        res.redirect('/home');
    });


 return router;
}
