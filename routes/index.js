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
  db.Groups.find()
  .then( function(groupCursor) {
    db.Lights.find()
    .then( function(lightCursor) {
	    res.render('groups', { groups: groupCursor, lights: lightCursor, db: db});
    });
  })
  .catch( function(err) {
    res.send(err);
  });
});

// route to turn a light on
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

// Route to add a light to our database
router.post('/setup-lights', (req,res) => {
  // condition check
  if (!(req.body.lightName.length && req.body.hubIP.length && req.body.lightID.length)) {
    res.redirect('/individuals');
    return;
  }

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
  db.Lights.create(lightSettings)
  .then( function(edited) {
    res.redirect('/individuals');
  })
  .catch( function(err) {
    res.send(err);
  });
});

// Route to delete a light
router.delete('/delete-light', (req,res) => {

});

// Route to add a group to our database
router.post('/setup-group', (req,res) => {
  // condition check
  if (!(req.body.groupName.length)) {
    res.redirect('/groups');
    return;
  }
  
  // setup the data to post
  //console.log(req.body);
  var light_ids = Object.keys(req.body.selection);
  var groupSettings = {
    'name': req.body.groupName,
    'lights': light_ids
  }
  //console.log(groupSettings);

  // create new database entry
  db.Groups.create(groupSettings)
  .then( function(edited) {
    res.redirect('/groups');
  })
  .catch( function(err) {
    res.send(err);
  });

});

module.exports = router;
