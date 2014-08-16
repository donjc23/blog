/** Event Schema for blog **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define schema
var BlogSchema = new Schema({
     _someId: mongoose.Schema.Types.ObjectId
   , title: String
   , video: String
   ,stuff: Schema.Types.Mixed
   , created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);
