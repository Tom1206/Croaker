var mongoose = require('mongoose');

module.exports = mongoose.model('Croak',{
	username: String,
	croak: String
});
