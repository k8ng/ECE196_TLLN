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
  lightID: {  // The pin number on the RPi or the address on the strip
    type: Number
  }
});

var Lights = mongoose.model('Lights', lightsSchema);

module.exports = Lights;
