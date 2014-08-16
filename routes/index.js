
/*
 * GET home page.
 */


module.exports = {
	// app.get('/'...)
  	index: function(req, res) {
    	res.render('index', { title: 'home' });
  	},
	blogs: function(req, res) {
	    res.render('blog', { title: 'blog' });
	},
	newblog: function(req, res) {
	    res.render('post-blog-form', { title: 'post' });
	},
	
}