angular.module('sailsUI.authService', [])
	.service('authService', function($rootScope, $http, sharedService) {
	var auth = { authenticated: false, user: null, error: null };

	function setAuth(value) {
		auth.authenticated = value;
		return auth.authenticated;
	}

	function getAuth() {
		return auth.authenticated;
	}

	function getError() {
		return auth.error;
	}

	function setUser(user) {
		auth.user = user;
		return auth.user;
	}

	function getUser(user) {
		return auth.user;
	}

	function login(username, password, cb) {
		auth.error = false;
		$http({
			method: 'POST',
			url: "/auth/login",
			data: {
				username: username,
				password: password
			}
		}).then(function(res) {
			if (res.data.success) {
				setAuth(true);
				setUser(res.data.user);
				//$rootScope.$$phase || $rootScope.$apply();
				sharedService.prepForBroadcast('loggedIn');
			} else {
				auth.error = res.data.error;
			}
			if (cb) {cb(); }
		});
		return auth;
	}

	function register(username, password, cb) {
		auth.error = false;
		$http({
			method: 'POST',
			url: "/user/create",
			data: {
				username: username,
				password: password
			}
		}).then(function(res) {
			if (res.data.username === username) {
				sharedService.prepForBroadcast('registered');
			} else {
				auth.error = res.data.error;
			}
			if (cb) { cb(); }
		});

		return auth;
	}

	function logout(cb) {
		$http({
			method: 'POST',
			url: "/auth/logout"
		}).then(function(res) {
			if (res.data.success) {
				setAuth(false);
				setUser(null);
				sharedService.prepForBroadcast('logout');
			}
			if (cb) { cb(); }
		});

		return auth;
	}

	function checkAuth(cb) {
		$http({
			method: 'POST',
			url: "/auth/checkAuthenticated"
		}).then(function(res) {
			if (res.data.success) {
				setAuth(true);
				setUser(res.data.user);
				sharedService.prepForBroadcast('loggedIn');
			}
			if (cb) { cb(); }
		});

		return auth;
	}

	return {
		getAuth: getAuth,
		setAuth: setAuth,
		setUser: setUser,
		getUser: getUser,
		getError: getError,

		checkAuth: checkAuth,
		login: login,
		register: register,
		logout: logout
	};
});