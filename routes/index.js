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

router.post('/set-lights', (req,res) => {
  console.log('form posted');
  res.redirect('/');
});

module.exports = router;
