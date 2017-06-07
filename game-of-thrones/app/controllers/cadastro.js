module.exports.cadastro = function(application, req, res) {
	res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res) {

	var dadosForm = req.body;

	req.assert('nome', 'Campo Nome é obrigatório.').notEmpty();
	req.assert('usuario', 'Campo Usuário é obrigatório.').notEmpty();
	req.assert('senha', 'Campo Senha é obrigatório.').notEmpty();
	req.assert('casa', 'casa não pode ser vazio.').notEmpty();

	var erros = req.validationErrors();

	if (erros) {
		res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
		return;
	}

	/* recuperando o modulo de conexao com o mongodb */
	var connection = application.config.dbConnection;

	/* utilizando a classe UsuarioDAO, passando a conexao com o mongodb por referência */
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
	UsuariosDAO.inserirUsuario(dadosForm, req, res);

	// geração dos parâmetros
	var jogoDAO = new application.app.models.jogoDAO(connection);
	jogoDAO.gerarParametros(dadosForm.usuario);



	// res.send('podemos cadastrar.');
}

module.exports.sucesso = function(req, res) {
	res.render('success', {user: ''});
}