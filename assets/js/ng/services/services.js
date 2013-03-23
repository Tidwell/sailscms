'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('sailsUI.services', [])
	.value('version', '0.12');

angular.module('sailsUI.sharedService', []).factory('sharedService', function($rootScope) {
	var sharedService = {};
	sharedService.message = '';
	sharedService.prepForBroadcast = function(msg) {
		this.message = msg;
		this.broadcastItem();
	};
	sharedService.broadcastItem = function() {
		$rootScope.$broadcast('handleBroadcast');
	};

	return sharedService;
});

angular.module('sailsUI.authService', [])
	.service('authService', function() {
	var isAuthed = {authed: false };

	return {
		getAuth: function() {
			return isAuthed.authed;
		},
		setAuth: function(value) {
			isAuthed.authed = value;
			return isAuthed.authed;
		}
	};
});