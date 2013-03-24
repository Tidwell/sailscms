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