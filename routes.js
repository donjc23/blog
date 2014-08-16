/** routes.js
  */
var start = require('./routes/index')
    , blog = require('./accessDB');

var fs = require('fs');
var cloudinary = require('cloudinary');

function uploadfile1(req, res, next) {
	var p1 = req.files.pic1;
	if(p1.name){
		//console.dir('in p1.name   ' +p1.name);
	    cloudinary.uploader.upload(p1.path, function(result) { 
  			//console.log(result) 
			req.photo1 = result.url;
			next();
		});
	  }
	else{  
	  req.photo1 = null;  
	  next();
	}
}

function uploadfile2(req, res, next) {
	var p2 = req.files.pic2;
	if(p2.name){
	    cloudinary.uploader.upload(p2.path, function(result) { 
  			//console.log(result) 
			req.photo2 = result.url;
			next();
		});
	  }
	  else{  
	  req.photo2 = null;  
	  next();
	}
}

function uploadfile3(req, res, next) {
	var p3 = req.files.pic3;
	if(p3.name){
	    cloudinary.uploader.upload(p3.path, function(result) { 
  			//console.log(result) 
			req.photo3 = result.url;
			next();
		});
	  }
	else{  
	  req.photo3 = null;  
	  next();
	}
}





module.exports = function(app) {

 	app.get('/', start.index);
    //app.get('/blog', start.blog);
    app.get('/blog/new', start.newblog);

    app.get('/blog', blog.getBlogs);

    //SAVE
	app.post('/blog/new', uploadfile1, uploadfile2, uploadfile3, blog.saveBlog);

	//SAVE comment
	app.post('/blog/:id', blog.saveComment);

	// SHOW apartment by id
	app.get('/blog/:id', blog.getOneBlog);
    
    app.get('/delete-post', blog.showBlogs);

    // DESTORY
	app.delete('/blog/:id', blog.deleteblog);

//////////////////////////////////////////////////////////


    //app.get('/blogtest', start.blogs);


}