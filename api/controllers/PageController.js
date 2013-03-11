/*---------------------
	:: Page
	-> controller
---------------------*/
var PageController = {

	// To trigger this action locally, visit: `http://localhost:port/page/findByUrl`
	findByUrl: function (req,res) {
		var url = req.param('url');
		Page.find({url: url}, function(err,page){
			if (page) {
				res.json({page: page});
			} else {
				res.json({error: 'No page found'});
			}
		});
	}

};
module.exports = PageController;