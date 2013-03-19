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