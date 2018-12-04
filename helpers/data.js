var db = require('../models');

exports.getData = function(req, res) {
	db.Data.find()
	.then( function(data) {
		res.json(data);
	})
	.catch( function(err) {
		res.send(err);
	})
}