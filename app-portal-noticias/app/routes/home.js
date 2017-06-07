module.exports = function(application) {
	application.get('/', function(req, res) {
		application.app.controller.home.index(application, req, res);
	});	
}

