function DataViewCtrl($scope, $http, $routeParams, sharedService, $location, socket) {
	//get the list of models
	socket.request('/models',{},function(data){
		//set the model and attributes for the model we are looking for
		$scope.model = data[$routeParams.id];
		$scope.attributes = SAILSUI.attributes.generateAttributes($scope.model.schema);
		$scope.modelName = $scope.model.globalId.toLowerCase();

		//get all the data for the model
		socket.request(
			"/"+$scope.modelName+'/findAll',
			{},
			function(response){
				if (typeof response.length === 'undefined') {
					$scope.data = [response];
					return;
				}
				$scope.data = response;
			}
		);

		//subscribe so if any new items are created for the model, we will know
		socket.on($scope.modelName+'/create',function(data){
			$scope.data.push(data);
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