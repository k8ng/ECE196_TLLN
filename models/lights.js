var mongoose = require('mongoose');

var lightsSchema = new mongoose.Schema({
  name: {
    type: String
  },
  lightIsOn: {
    type: Boolean
  },
  hubIP: {  // IP of the RPi this light is connected to
    type: String
  },
  lightID: {  // Unique identifier for the light
    type: String
  }
});

var Lights = mongoose.model('Lights', lightsSchema);

module.exports = Lights;
