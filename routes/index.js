var express = require('express'),
    router  = express.Router(),
    db      = require('../models');

router.get('/', (req, res) => {
	res.render('home');
});

router.get('/individuals', (req,res) => {
	res.render('individuals');
});

router.get('/groups', (req,res) => {
	res.render('groups');
});

module.exports = router;
