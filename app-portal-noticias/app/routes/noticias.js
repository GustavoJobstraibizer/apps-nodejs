module.exports = function(application) {
	
	application.get('/noticias', function(req, res) {
		application.app.controller.noticias.noticias(application, req, res);
	});	

	application.get('/noticia', function(req, res) {
		application.app.controller.noticias.noticia(application, req, res);
	});	
}

