/*---------------------
	:: Pages
	-> controller
---------------------*/
var PagesController = {
	index: function(req,res) {
		Page.find({url: req.param('unknownRoute')}).done(function(err,route){
			if (err || !route) {
				res.view('home/index');
			}
			else {
				//here we would ship the seo-friendly page
				//for now just send the angular stuff
				res.view('home/index');
			}
		});
	}


};
module.exports = PagesController;