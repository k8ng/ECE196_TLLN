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
router.post('/delete-light', (req,res) => {
  var lightID = Object.keys(req.body)[0];
  db.Lights.findOneAndRemove( {_id: lightID})
  .then( function(result) {
    db.Groups.updateMany({}, { $pull: { lights: { $in: lightID } } } )
    .then( function(result) {
      res.redirect('/individuals');
    })
    .catch(function(err) {
      res.send(err);
    })
  })
  .catch( function(err) {
    res.send(err);
  });
});

// Route to add a group to our database
router.post('/setup-group', (req,res) => {
  // condition check
  if (!(req.body.groupName.length)) {
    res.redirect('/groups');
    return;
  }
  
  // setup the data to post
  var light_ids = []
  if (req.body.selection) {
     light_ids = Object.keys(req.body.selection);
  }
  
  var groupSettings = {
    'name': req.body.groupName,
    'lights': light_ids
  }

  // create new database entry
  db.Groups.create(groupSettings)
  .then( function(edited) {
    res.redirect('/groups');
  })
  .catch( function(err) {
    res.send(err);
  });

});

// Route to return the data for a group
router.get('/get-group', (req,res) => {
  db.Groups.findOne({'_id': req.query.groupID})
  .then(function (foundGroup) {
    res.send(foundGroup);
  })
  .catch( function(err) {
    res.send(err);
  });
});

// Route to return all the lights
router.get('/get-lights', (req,res) => {
  db.Lights.find().then(function (lights) {
    res.send(lights);
  })
  .catch( function(err) {
    res.send(err);
  });
});

// Route to add lights to a group
router.post('/add-lights', (req,res) => {
  // Find the requested Groups Table
  db.Groups.findOneAndUpdate( 
    {'_id': req.body.groupID}, 
    { $push: { lights: Object.keys(req.body.selection)} } )
  .then( function (foundGroup) {
    // append the new lights to the lights list
    res.redirect('/groups');
  })
  .catch( function(err) {
    res.send(err);
  });
});

// Route to remove lights from a group
router.post('/remove-lights', (req,res) => {
  // Find the requested Groups Table
  db.Groups.findOneAndUpdate( 
    {'_id': req.body.groupID}, 
    { $pull: { lights: { $in: Object.keys(req.body.selection) } } } )
  .then( function (foundGroup) {
    // append the new lights to the lights list
    res.redirect('/groups');
  })
  .catch( function(err) {
    res.send(err);
  });
});

// Route to delete a group
router.post('/delete-group', (req,res) => {
  var groupID = Object.keys(req.body)[0];
  db.Groups.findOneAndRemove( {_id: groupID})
  .then( function(result) {
    res.redirect('/groups');
  })
});

module.exports = router;
