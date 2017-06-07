module.exports.home = function(application ,req, res) {
	res.render('index', {validacao: {}, dadosForm: {}, erro_login: ''});
}

module.exports.autenticar = function(application ,req, res) {
	
	var dadosForm = req.body;

	req.assert('usuario', 'Campo Usuário não pode ser vazio.').notEmpty();
	req.assert('senha', 'Campo Senha não pode ser vazio.').notEmpty();

	var erros = req.validationErrors();

	if (erros) {
		res.render("index", {validacao: erros, dadosForm: dadosForm, erro_login: ''});
		return;
	}

	var connection = application.config.dbConnection;
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.autenticar(dadosForm, req, res);

}