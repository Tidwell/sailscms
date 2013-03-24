function NavCtrl($scope, $http, $location, sharedService, authService) {
	$scope.navClass = function(page, opt) {
		var currentRoute = $location.path().substring(1) || 'index';
		if (opt === 'contains') {
			return currentRoute.indexOf(page) !== -1 ? 'active' : '';
		}
		return page === currentRoute ? 'active' : '';
	};

	$scope.pendingChanges = false;

	$scope.cmsRedirect = function() {
		window.location = '/cms/index';
	};

	$scope.frontendRedirect = function() {
		window.location = '/';
	};

	$scope.auth = authService.checkAuth();

	$scope.$on('handleBroadcast', function() {
		/* if there are pending server changes requiring restart */
		if (sharedService.message === 'changesUpdated') {
			$scope.pendingChanges = true;
		}
		//redirect on logout if inside the cms
		if (sharedService.message === 'logout') {
			if (window.location.href.indexOf('/cms') !== -1) {
				$scope.frontendRedirect();
			}
		}
	});

}