
/*
 * GET home page.
 */


module.exports = {
	// app.get('/'...)
  	index: function(req, res) {
    	res.render('index', { title: 'home' });
  	},
	contact: function(req, res) {
	    res.render('contact', { title: 'contact' });
	},
	newblog: function(req, res) {
	    res.render('post-blog-form', { title: 'post' });
	},
	
}