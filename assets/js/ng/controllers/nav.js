function NavCtrl($scope, $http, $location, sharedService, authService) {
	$scope.navClass = function(page, opt) {
		var currentRoute = $location.path().substring(1) || 'index';
		if (opt === 'contains') {
			return currentRoute.indexOf(page) !== -1 ? 'active' : '';
		}
		return page === currentRoute ? 'active' : '';
	};

	/* if there are pending server changes requiring restart */
	$scope.pendingChanges = false;
	$scope.$on('handleBroadcast', function() {
		if (sharedService.message === 'changesUpdated') {
			$scope.pendingChanges = true;
		}
		if (sharedService.message === 'registered') {
			$scope.signIn();
		}
	});

	$scope.signIn = function() {
		$scope.error = false;
		$http({
			method: 'POST',
			url: "/cms/login",
			data: {
				username: $scope.username,
				password: $scope.password
			}
		}).then(function(res) {
			if (res.data.success) {
				$scope.authenticated = authService.setAuth(true);
				$scope.user = res.data.user;
				sharedService.prepForBroadcast('loggedIn');
			} else {
				$scope.error = res.data.error;
			}
		});
	};

	$scope.register = function() {
		$scope.error = false;
		$http({
			method: 'POST',
			url: "/user/create",
			data: {
				username: $scope.username,
				password: $scope.password
			}
		}).then(function(res) {
			if (res.data.username === $scope.username) {
				sharedService.prepForBroadcast('registered');
			} else {
				$scope.error = res.data.error;
			}
		});
	};

	$scope.logout = function() {
		$http({
			method: 'POST',
			url: "/cms/logout"
		}).then(function(res) {
			if (res.data.success) {
				$scope.authenticated = authService.setAuth(false);
				$scope.user = null;
				if (window.location.href.indexOf('/cms') !== -1) {
					$scope.frontendRedirect();
				}
				sharedService.prepForBroadcast('logout');
			}
		});
	};

	$scope.cmsRedirect = function() {
		window.location = '/cms/index';
	};

	$scope.frontendRedirect = function() {
		window.location = '/';
	};

	//onload auto-log-in if the server still has a session for the user
	$http({
		method: 'POST',
		url: "/cms/checkAuthenticated"
	}).then(function(res) {
		if (res.data.success) {
			$scope.authenticated = authService.setAuth(true);
			$scope.user = res.data.user;
			sharedService.prepForBroadcast('loggedIn');
		}
	});
}