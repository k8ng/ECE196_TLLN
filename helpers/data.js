var db = require('../models');

exports.getLights = function(req, res) {
	db.Lights.find()
	.then( function(data) {
		res.json(data);
	})
	.catch( function(err) {
		res.send(err);
	})
}
