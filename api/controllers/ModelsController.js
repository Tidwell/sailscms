/*---------------------
	:: Models
	-> controller
---------------------*/
var ModelsController = {
	// To trigger this action locally, visit: `http://localhost:port/models
	index: function(req, res) {
		res.json(sails.models);
	},
	// To trigger this action locally, visit: `http://localhost:port/models/scaffold`
	scaffold: function(req, res) {
		var exec = require('child_process').exec;
		var name = req.param('name');
		var attributes = req.param('attributes');

		var attr = ' ';
		if (attributes) {
			attributes.forEach(function(attribute) {
				attr += attribute.name + ':' + attribute.type + ' ';
			});
		}

		if (!name) {
			res.json({
				error: 'No name'
			});
			return;
		}

		var file = sails.config.paths.models + '/'+name + '.js';
		var fs = require('fs');
		//check file exists
		fs.exists(file, function(exists) {
			if (exists) {
				fs.unlink(file, function(err) { //delete if it does
					if (err) {
						res.json({
							error: err
						});
						return;
					}
					create(); //then create
				});
				return;
			}
			create(); //otherwise just create it
		});

		//abuse scope so we dont have to actually pass all this shit
		function create() {
			exec("sails generate model " + name + attr, function(error, stdout, stderr) {
				if (!error) {
					res.json({
						success: true
					});
				} else {
					res.json({
						error: stderr,
						info: error
					});
				}
			});
		}

	}

};
module.exports = ModelsController;