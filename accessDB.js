// Module dependencies
var mongoose = require('mongoose')
	, Blog = require('./models/blog')
	, Comment = require('./models/comment');
var mongo = require('mongodb');
var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

module.exports = {
  /*local*/
	connectDB: function(mongoUri) {
    mongoose.connect(mongoUri, function (err, res) {
      if (err) { 
          console.log ('ERROR connecting to: ' + mongoUri + '. ' + err);
        } else {
          console.log ('Succeeded connected to: ' + mongoUri);
        }
      });
    },
  
    /*heroku*/
    connectHDB: function(mongoUri) {
    mongo.Db.connect(mongoUri, function (err, db) {
      db.collection('mydocs', function(er, collection) {
        collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
        });
      });
    });
  	},


   	// app.post('/blog/new')
  	saveBlog: function(req, res) {
      var b = req.body;
      var pics = [];

      if(req.photo1) pics.push(req.photo1);
      if(req.photo2) pics.push(req.photo2);
      if(req.photo3) pics.push(req.photo3);
      var t = b.title
         ,s = b.video
         ,p1 = b.para1
         ,p2 = b.para2
         ,p3 = b.para3;
      new Blog({
	      _someId: new mongoose.Types.ObjectId,
	      title: t,
	      video: s,
	      stuff: {para:[p1, p2, p3], photos: pics} 
	    }).save(function(err, docs){
	      if (err) res.json(err)
	      res.redirect('/blog');
    	});
  	}, 	

  	// app.post('/blog/:id')
  	saveComment: function(req, res) {
      var blogId = req.param('id');
      var b = req.body;
      new Comment({
	      comId: blogId,
	      name: b.name,
	      comment: b.comment
	    }).save(function(err, docs){
	      if (err) res.json(err) 
	      res.redirect('/blog/' +blogId);
    	});
  	},


    getBlogs: function(req, res) {
      Blog.find({}).sort('-created').exec(function(err, docs) {
          res.render('blog', { title: 'all blogs', blogs: docs});
      });
    },


  	//get one blog by id
  	getOneBlog: function(req, res) {
  		var id = req.param('id');
  		Blog.find({}).sort('-created').exec(function(err, all) {
    		Blog.find({_someId: id}, function(err, docs) {
    			Comment.find({comId: id}, function(err, com) {
      			    res.render('oneBlog', { title: 'one blog', targetblog: docs[0]
      			    	, blogs: all, comments: com});
      		    });
    		});
    	});

  	},


   //get all blogs
  	showBlogs: function(req, res) {
    	Blog.find({}, function(err, docs) {
      		res.render('delete', { title: 'all blogs', blogs: docs});
    	});
  	},

   	//delete the Blog by id
  	deleteblog: function(req, res) {
  		Blog.remove(
  			{ _someId: req.params.id }, function(err){
        		res.redirect('/blog');
      		}
  		);
  	}, 	

    //send email
    sendEmail: function(req, res) {
      var b = req.body;
      var email = new sendgrid.Email({
        to:       'donwang23@gmail.com',
        from:     b.email,
        subject:  'send from ' + b.name + ' about i-play website',
        text:     b.message
      });

      sendgrid.send(email, function(err, json) {
        if (err) { return console.error(err); }
        res.redirect('/blog');
      });

    }





 }