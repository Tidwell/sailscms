function NotFoundCtrl($scope,$http,$location,sharedService,authService) {
	//onload check auth state
	$scope.auth = authService.checkAuth();


	var d = { url: $location.$$path };
	$http({
		url: "/page/findByUrl",
		params: d,
		method: 'GET'
	}).then(function(data) {
		if (data.data.page) {
			$scope.page = data.data.page;
		}
	});

	/* fires a call to create a page */
	$scope.updatePage = function() {
		var obj = {
			url: $location.$$path,
			title: $scope.page.title || ''
		};
		$http({
			method: 'POST',
			url: "/page/create",
			data: obj
		}).then(function(data) {
			if (data.data.id) {
				//set flag and fire pubsub event
				$scope.saved = true;
			} else {
				$scope.error = 'ERROR';
			}
		});
	};
	/* close buttons on error/saved (todo replace w angular-bootstrap) */
	$scope.clearError = function() {
		$scope.error = '';
	};
	$scope.clearSaved = function() {
		$scope.saved = '';
	};
}