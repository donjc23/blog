/** Event Schema for blog **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define schema
var CommentSchema = new Schema({
     comId: String
   , name: String
   , comment: String
   , created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
