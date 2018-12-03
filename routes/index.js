var express = require('express'),
    router  = express.Router(),
    db      = require('../models');

router.get('/', (req, res) => {
	res.render('home');
});

router.get('/individuals', (req,res) => {
  // find all the lights in the database
  db.Lights.find()
  .then( function(lightCursor) {
    // render the page based on the lights
	  res.render('individuals', { lights: lightCursor});
  })
  .catch( function(err) {
    res.send(err);
  });
});

router.get('/groups', (req,res) => {
	res.render('groups');
});

router.post('/set-lights', (req,res) => {
  console.log('form posted');
  console.log('name: ', req.body.name);
  console.log('lightIsOn: ', req.body.lightIsOn);

  // setting
  var lightSetting = {
    'lightIsOn': false,
  }
  
  if (req.body.lightIsOn) {
    lightSetting['lightIsOn'] = true; 
  }

  // find and update the database
  db.Lights.findOneAndUpdate({'_id': req.body.name}, lightSetting)
  .catch( function(err) {
    res.send(err);
  });

  return res.send('updated database');
});

router.get('/setup-lights', (req,res) => {
  res.render('setup-lights');   
});

router.post('/setup-lights', (req,res) => {
  // setup the data to post
  var lightSettings = {
    'name': req.body.lightName,
    'lightIsOn': false,
    'hubIP': req.body.hubIP,
    'lightID': req.body.lightID
  }

  // make appropriate change to lightIsOn settings
  if (req.body.lightIsOn) {
    lightSettings['lightIsOn'] = true;
  }

  console.log(lightSettings);

  // update the database entry for that lightID
  db.Lights.findOneAndUpdate({name: req.body.lightName}, lightSettings, {'new': true, 'upsert': true})
  .then( function(edited) {
    res.redirect('/individuals');
  })
  .catch( function(err) {
    res.send(err);
  });
});

module.exports = router;
