/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var cloudinary = require('cloudinary');


var DB = require('./accessDB');
var KB = require('./kays.js');
var app = express();


// all environments
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  cloudinary.config({ 
    cloud_name: KB.cloud.cloud_name, 
    api_key: KB.cloud.api_key, 
    api_secret: KB.cloud.api_secret
  });  
 
});

// local
app.locals.api_key = cloudinary.config().api_key;
app.locals.cloud_name = cloudinary.config().cloud_name;


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



//heroku db or localhost if we don't find one. 
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mysite';
//connect db
if ('development' == app.get('env')){
  DB.connectDB(mongoUri);
}else{
	DB.connectHDB(mongoUri);
}

// Routes
require('./routes')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
