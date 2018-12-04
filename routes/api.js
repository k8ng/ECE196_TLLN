var express = require('express'),
	router = express.Router(),
	db = require('../models'),
	dataHelpers = require('../helpers/data');
		

/*****
* C reate
* R ead
* U pdate
* D elete
*****/

router.route('/data')
	.get(dataHelpers.getLights);

module.exports = router;
