function DataViewCtrl($scope, $http, $routeParams, sharedService, $location) {
	$http.get("/models").then(function(data) {
		$scope.model = data.data[$routeParams.id];
		$scope.attributes = SAILSUI.attributes.generateAttributes($scope.model.schema);
		$http.get("/"+$scope.model.globalId.toLowerCase()+'/findAll').then(function(data){
			$scope.data = data.data;
		});
	});

	$scope.dateFormat = function(date) {
		var d = new Date(date);
		var dformat = [(d.getMonth()+1).padLeft(),
               d.getDate().padLeft(),
               d.getFullYear()].join('/')+
              ' ' +
              [d.getHours().padLeft(),
               d.getMinutes().padLeft(),
               d.getSeconds().padLeft()].join(':');
		return dformat;
	};
}