var mongoose = require('mongoose');

module.exports = mongoose.model('Tweet',{
	username: String,
	tweet: String,
	date: String
});
