module.exports.index = function(application ,req, res) {

	var connection = application.config.dbConnection();
	var noticiasModel = new application.app.models.NoticiasDAO(connection);

	noticiasModel.getFiveLastNews(function(erro, data) {
		res.render("home/index", {lastNews: data});
	});
}