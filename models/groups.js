var mongoose = require('mongoose');

var groupsSchema = new mongoose.Schema({
  name: {
    type: String
  },
  lights: [String]
});

var Groups = mongoose.model('Groups', groupsSchema);

module.exports = Groups;
