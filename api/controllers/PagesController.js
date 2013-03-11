/*---------------------
	:: Pages
	-> controller
---------------------*/
var PagesController = {
	index: function(req,res) {
		console.log(req.param('unknownRoute'),'route');
		Page.find({url: req.param('unknownRoute')}).done(function(err,route){
			if (err || !route) {
				res.view('home/index');
			}
			else {
				res.send(route);
			}
		});
	}


};
module.exports = PagesController;