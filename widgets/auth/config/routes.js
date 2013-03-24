module.exports.routes = {
	'/cms/login': {
		controller: 'cms',
		action: 'login'
	},
	'/cms/checkAuthenticated': {
		controller: 'cms',
		action: 'checkAuthenticated'
	},
	'/cms/logout': {
		controller: 'cms',
		action: 'logout'
	}
};