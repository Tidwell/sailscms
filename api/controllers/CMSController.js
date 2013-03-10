/*---------------------
  :: CMS
	-> controller
---------------------*/
var CMSController = {
	login: function(req, res) {
		// Get password and username from request
		var username = req.param('username');
		var password = req.param('password');

		// No username/password entered
		if (!(username && password)) {
			res.json({error: "No username or password specified!"});
			// TODO: redirect, storing an error in the session
		} else {
			// Lookup the username/password combination
			User.find({
				username: username,
				password: password // TODO: hash the password first
			}).done(function(err, user) {
				// Login failed, incorrect username/password combination
				if (err || !user) {
					res.json({error: 'Invalid username and password combination!'});
					// TODO: redirect, storing an error in the session
				}

				// Login succeeded
				if (user) {
					req.session.authenticated = true;
					req.session.user = user;
					// Redirect to protected area
					res.send({
						success: true,
						user: user
					});
				}
			});
		}
	},

	checkAuthenticated: function(req,res) {
		if (req.session.authenticated) {
			res.send({
				success: true,
				user: req.session.user
			});
		} else {
			res.send({ error: 'You are not logged in.' });
		}
	},
		// To trigger this action locally, visit: `http://localhost:port/models/list`
	models: function(req, res) {
	console.log('calle 2d')
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
module.exports = CMSController;