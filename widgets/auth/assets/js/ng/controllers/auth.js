function AuthCtrl($scope, $http, $location, sharedService, authService) {
	$scope.username = null;
	$scope.password = null;
	$scope.auth = {
		authenticated: false,
		user: null,
		error: null
	};

	//methods for the view
	$scope.login = function() {
		$scope.auth = authService.login($scope.username, $scope.password);
	};

	$scope.register = function() {
		$scope.auth = authService.register($scope.username, $scope.password);
	};

	$scope.logout = function() {
		$scope.auth = authService.logout();
	};

	//auto-login when registered
	$scope.$on('handleBroadcast', function() {
		if (sharedService.message === 'registered') {
			$scope.login();
		}
	});

	//onload see if the user is logged in
	$scope.auth = authService.checkAuth();

}