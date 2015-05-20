var express = require('express');
var authenticate = require('../passport/authenticate.js');
var formidable = require('formidable');
var router = express.Router();
var fs = require('fs');
var User = require('../models/user');

module.exports = function(passport){

	/* /profile */
	router.get('/profile', authenticate.auth, function(req, res) {
		res.render('profile', { user: req.user,name_picture: req.user.picture, message: req.flash('message') });
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

    /* profile picture upload */
  router.post('/upload', authenticate.auth, function(req, res) {
  	var form = new formidable.IncomingForm();
  	form.uploadDir = "./public/uploads/pictures";

		// delete the old picture
		if(req.user.picture != "default")
		{
			fs.unlink("public/uploads/pictures/" + req.user.picture, function(err) {
				if(err) console.log(err);
			})
		}

  	form.parse(req, function (err, fields, files) {
            var name_picture_up = files.upload.path.substring(24);
  					User.update({username: req.user.username}, {$set: { picture: name_picture_up}}, { upsert: true }, function(){});
        });
  	res.redirect('/profile');
  	});

return router;
}
