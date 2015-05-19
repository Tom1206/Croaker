var express = require('express');
var authenticate = require('../passport/authenticate.js');

var router = express.Router();

var User = require('../models/user');

module.exports = function(passport){

	/* /profile */
	router.get('/profile', authenticate.auth, function(req, res) {
		res.render('profile', { user: req.user, message: req.flash('message') });
	});

	router.post('/profile', authenticate.auth, function(req, res){
		User.find({username: req.body.username}).exec(function (err, user) {
			if(user.length == 0 || req.body.username == req.user.username) {
				User.update({username: req.user.username}, {$set: { username: req.body.username, email: req.body.email, password: req.body.password}}, { upsert: true }, function(){});
				res.redirect('profile');
			} else {
				res.render('profile');
			}
		});
	});

	return router;
}
