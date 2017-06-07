module.exports = function(application) {
	application.get('/', function(req, res) {
		application.app.controller.index.home(application, req, res);
	});
}