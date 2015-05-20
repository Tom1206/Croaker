var express = require('express');
var moment = require('moment');
var authenticate = require('../passport/authenticate.js');
var router = express.Router();


var croak = require('../models/croak');
var User = require('../models/user');


module.exports = function(passport){
                // Récupère et trie les croaks
    router.get('/home', authenticate.auth, function(req, res){
                croak.find().limit(req.body.nb_croaks).sort({date: -1}).exec( function (err, croaks) {
              if (err) return console.error(err);
                res.render('home', { user: req.user, croak: croaks});
            });
    });


    router.post('/home', authenticate.auth, function(req, res) {
  		// Ajoute le croak à la base de donnée
        var date = moment().format('YYYY/MM/DD, HH:mm');
  		var newcroak = new croak({username: req.user.username, picture: req.user.picture, croak: req.body.croak, date: date});
  		newcroak.save();
        res.redirect('/home');
    });


 return router;
}
