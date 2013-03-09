'use strict';

/* Directives */

var versionDirective = angular.module('sailsUI.directives', []);
versionDirective.directive('appVersion', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
});