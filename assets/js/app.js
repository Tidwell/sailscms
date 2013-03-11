'use strict';

// Declare app level module which depends on filters, and services
angular.module('sailsUI', ['sailsUI.filters', 'sailsUI.services', 'sailsUI.directives', 'ngSanitize', 'sailsUI.sharedService'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			template: $('#template-frontend-index').html(),
			controller: FrontendIndexCtrl
		});

		$routeProvider.when('/cms/index', {
			template: $('#template-index').html(),
			controller: IndexCtrl
		});
		$routeProvider.when('/cms/models', {
			template: $('#template-models-list').html(),
			controller: ModelsListCtrl
		});
		$routeProvider.when('/cms/models/view', {
			template: $('#template-models-list').html(),
			controller: ModelsListCtrl
		});
		$routeProvider.when('/cms/models/view/:id', {
			template: $('#template-models-details').html(),
			controller: ModelsViewCtrl
		});
		$routeProvider.when('/cms/models/scaffold', {
			template: $('#template-models-details').html(),
			controller: ModelsViewCtrl
		});
		$routeProvider.when('/cms/data', {
			template: $('#template-data-list').html(),
			controller: DataListCtrl
		});
		$routeProvider.when('/cms/data/view', {
			template: $('#template-data-list').html(),
			controller: DataListCtrl
		});
		$routeProvider.when('/cms/data/view/:id', {
			template: $('#template-data-details').html(),
			controller: DataViewCtrl
		});
		$routeProvider.otherwise({
			template: $('#template-not-found').html(),
			controller: NotFoundCtrl
		});
		$locationProvider.html5Mode(true);
	}]);