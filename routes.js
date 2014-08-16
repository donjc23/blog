/** routes.js
  */
var start = require('./routes/index')
    , blog = require('./accessDB');

var fs = require('fs');


function uploadfile1(req, res, next) {
	var p1 = req.files.pic1;
	if(p1.name){
		console.dir('in p1.name   ' +p1.name);
	  var tmp_path = p1.path;
	  var target_path = './public/images/' + p1.name;
	  fs.rename(tmp_path, target_path, function(err) {
	        if (err) throw err;
	        // delete the temporary file, 
	        fs.unlink(tmp_path, function() {
	            if (err) throw err;
	            //pics.push(p1.name);
	            req.photo1 = p1.name;
				next();
	        });
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
      console.dir('in p2.name   ' +p2.name);
	  var tmp_path = p2.path;
	  var target_path = './public/images/' + p2.name;
	  fs.rename(tmp_path, target_path, function(err) {
	        if (err) throw err;
	        // delete the temporary file, 
	        fs.unlink(tmp_path, function() {
	            if (err) throw err;
	            req.photo2 = p2.name;
	            next();
	        });
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
		console.dir('in p3.name   ' +p3.name);
	  var tmp_path = p3.path;
	  var target_path = './public/images/' + p3.name;
	  fs.rename(tmp_path, target_path, function(err) {
	        if (err) throw err;
	        // delete the temporary file, 
	        fs.unlink(tmp_path, function() {
	            if (err) throw err;
	            req.photo3 = p3.name;
	            next();
	        });
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