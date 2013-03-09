'use strict';

// Declare app level module which depends on filters, and services
angular.module('sailsUI', ['sailsUI.filters', 'sailsUI.services', 'sailsUI.directives', 'ngSanitize', 'sailsUI.sharedService'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.when('/cms/index', {
		template: $('#template-index').html(),
		controller: IndexCtrl
	});
	$routeProvider.when('/cms/models', {
		template: $('#template-models').html(),
		controller: ModelsCtrl
	});
	$routeProvider.when('/cms/models/list', {
		template: $('#template-models-list').html(),
		controller: ModelsListCtrl
	});
	$routeProvider.when('/cms/models/details/:id', {
		template: $('#template-models-details').html(),
		controller: ModelsDetailsCtrl
	});
	$routeProvider.when('/cms/models/scaffold', {
		template: $('#template-models-details').html(),
		controller: ModelsDetailsCtrl
	});
	$routeProvider.otherwise({
		redirectTo: '/cms/index'
	});
	$locationProvider.html5Mode(true);
}])