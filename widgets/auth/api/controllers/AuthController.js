/*---------------------
  :: Auth
	-> controller

	Provides methods for login/logout and checking authentication, responses are json
---------------------*/
var AuthController = {
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

	logout: function(req,res) {
		if (req.session.authenticated) { delete req.session.authenticated; }
		if (req.session.user) { delete req.session.user; }
		res.json({success: true});
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
	}
};
module.exports = AuthController;