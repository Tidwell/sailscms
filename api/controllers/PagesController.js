/*---------------------
	:: Pages
	-> controller
---------------------*/
var PagesController = {
	index: function(req,res) {
		console.log(req.param('unknownRoute'),'route');
		Page.find({url: req.param('unknownRoute')}).done(function(err,route){
			if (err || !route) {
				res.send(req.param('unknownRoute'));
			}
			else {
				res.send(route);
			}
		});
	}


};
module.exports = PagesController;