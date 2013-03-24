function AuthCtrl($scope, $http, $location, sharedService, authService) {
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
				sharedService.prepForBroadcast('logout');
			}
		});
	};
}