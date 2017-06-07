module.exports.formulario_inclusao = function(application, req, res) {
	res.render("admin/form_add_noticia", {validacao: '', noticia: ''});
}

module.exports.noticias_salvar = function(application, req, res) {
	var noticia = req.body;

	// validando request com express-validator
	req.assert('titulo', 'Campo Título é obrigatório.').notEmpty();
	req.assert('resumo', 'Campo Resumo é obrigatório.').notEmpty();
	req.assert('resumo', 'Resumo deve conter entre 10 a 100 caracteres.').len(10, 100);
	req.assert('autor', 'Campo Autor é obrigatório.').notEmpty();
	req.assert('data_noticia', 'Campo Data é obrigatório.').notEmpty().isDate({format: 'YYYY-MM-DD'});
	req.assert('noticia', 'Campo notícia deve conter no maximo 100 caracteres').len(0, 100);

	var erros = req.validationErrors();

	if (erros) {
		res.render("admin/form_add_noticia", {validacao : erros, noticia: noticia});
		return;
	}

	var connection = application.config.dbConnection();
	var noticiasModel = new application.app.models.NoticiasDAO(connection); // acessando o modulo noticiasModel

	noticiasModel.salvarNoticia(noticia, function(erro, data) {
		res.redirect('/noticias');
	});
}