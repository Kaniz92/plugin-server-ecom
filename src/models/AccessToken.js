var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var AccessToken = new Schema({
  item: {
    type: String
  },

},{
    collection: 'accesstokens'
});

module.exports = mongoose.model('AccessToken', AccessToken);