var express = require('express');
var authenticate = require('../passport/authenticate.js');

var router = express.Router();

var croak = require('../models/croak');
var User = require('../models/user');

module.exports = function(passport){

  /* search tool */
	router.post('/search', authenticate.auth, function(req, res) {
		croak.find({croak: new RegExp(req.body.research, 'i')}).sort({date: -1}).exec(function(err,croaks) {
			User.find({username: new RegExp(req.body.research, 'i')}, function(err,users) {
				croak.find({username: new RegExp(req.body.research, 'i')}).sort({date: -1}).exec(function(err,username) {
					res.render('search', {user: req.user, croak: croaks, users: users, username: username, search: req.body.research});
				});
			});
		});
	});

	router.get('/search/:tag', authenticate.auth, function(req, res){
				croak.find({croak: new RegExp(req.params.tag, 'i')}).exec(function (err, croaks) {
					if (err) return res.render('error', {message: err.message,error: err});
					else {
						res.render('search', {user: req.user, croaks: croaks});
					}
				});
			});

  return router;
}
