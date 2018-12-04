var mongoose  = require('mongoose'),
    dotenv    = require('dotenv');

dotenv.load();

mongoose.set('debug', true);
console.log(process.env.DATABASE);
mongoose.connect(process.env.DATABASE);
mongoose.promise = Promise;

// Export schemas
module.exports.Lights = require('./lights');
module.exports.Groups = require('./groups');
