module.exports.noticias = function(application, req, res) {
	var connection = application.config.dbConnection();
	var noticiasModel = new application.app.models.NoticiasDAO(connection); // acessando o modulo noticiasModel

	noticiasModel.getNoticias(function(erro, data) {
		res.render("noticias/noticias", {noticias: data});
	});
}

module.exports.noticia = function(application, req, res) {
	var connection = application.config.dbConnection();
	var noticiasModel = new application.app.models.NoticiasDAO(connection); // acessando o modulo noticiaModel

	var idNoticia = req.query;
	// console.log(req.query);

	noticiasModel.getNoticia(idNoticia, function(erro, data) {
		res.render("noticias/noticia", {noticia: data});
	});
}