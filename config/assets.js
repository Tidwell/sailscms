// Asset rack configuration
module.exports.assets = {

	// A list of directories, in order, which will be recursively parsed for css, javascript, and templates
	// and then can be automatically injected in your layout/views via the view partials:
	// ( assets.css(), assets.js() and assets.templateLibrary() )
	sequence: [
		'assets/mixins',
		'assets/js/vendor',
		'assets/js/core',
		'assets/js/ng/app',
		'assets/js/ng/directives',
		'assets/js/ng/filters',
		'assets/js/ng/services',
		'assets/js/ng/controllers',
		'assets/styles',
		'assets/templates'
	]
};
