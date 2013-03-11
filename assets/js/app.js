'use strict';

// Declare app level module which depends on filters, and services
angular.module('sailsUI', ['sailsUI.filters', 'sailsUI.services', 'sailsUI.directives', 'ngSanitize', 'sailsUI.sharedService', 'sailsUI.authService'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		//FRONTEND
		$routeProvider.when('/', {
			redirectTo: '/index'
		});
		$routeProvider.when('/index', {
			template: $('#template-frontend-index').html(),
			controller: FrontendIndexCtrl
		})
		// OVERWRITE BELOW



		//DEFAULT PAGE CTRL - OVERWRITE ROUTES ABOVE
		$routeProvider.otherwise({
			template: $('#template-not-found').html(),
			controller: NotFoundCtrl
		});

		//CMS
		$routeProvider.when('/cms', {
			redirectTo: '/cms/index'
		});
		$routeProvider.when('/cms/index', {
			template: $('#template-index').html(),
			controller: IndexCtrl
		});
		$routeProvider.when('/cms/models', {
			redirectTo: '/cms/models/view'
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
			redirectTo: '/cms/data/view'
		});
		$routeProvider.when('/cms/data/view', {
			template: $('#template-data-list').html(),
			controller: DataListCtrl
		});
		$routeProvider.when('/cms/data/view/:id', {
			template: $('#template-data-details').html(),
			controller: DataViewCtrl
		});

		$locationProvider.html5Mode(true);
	}]);