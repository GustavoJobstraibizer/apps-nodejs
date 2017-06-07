module.exports.jogo = function(application, req, res) {

	if (!req.session.autorizado) {
		res.send('Você não possui acesso a página.');
		return;
	} 

	var msg = '';

	if (req.query.msg !== '') {
		msg = req.query.msg;		
	}

	//console.log(msg);

	var usuario = req.session.usuario;
	var casa = req.session.casa;

	var connection = application.config.dbConnection;
	var jogoDAO = new application.app.models.jogoDAO(connection);

	jogoDAO.iniciaJogo(usuario, casa, res, msg);
}

module.exports.sair = function(application, req, res) {
	req.session.destroy(function (err) {
		res.render('index', {validacao: {}, dadosForm: {}, erro_login: ''});
	});
}

module.exports.suditos = function(application, req, res) {
	if (!req.session.autorizado) {
		res.send('Você não possui acesso a página.');
		return;
	} 

	res.render('aldeoes');
}

module.exports.pergaminhos = function(application, req, res) {
	if (!req.session.autorizado) {
		res.send('Você não possui acesso a página.');
		return;
	} 

	/* recuperar as ações inseridas no banco de dados */
	var connection = application.config.dbConnection;
	var jogoDAO = new application.app.models.jogoDAO(connection);

	var usuario = req.session.usuario;

	jogoDAO.getAcoes(usuario, res);
}

module.exports.ordenarSuditos = function(application, req, res) {
	if (!req.session.autorizado) {
		res.send('Você não possui acesso a página.');
		return;
	} 

	var dadosFormSudito = req.body;

	req.assert('acao', 'Campo Ação deve ser selecionado.').notEmpty();
	req.assert('quantidade', 'Quantidade deve ser preenchido.').notEmpty();

	var erros = req.validationErrors();

	if (erros) {
		res.redirect('jogo?msg=A');
		return;
	}

	var connection = application.config.dbConnection;
	var jogoDAO = new application.app.models.jogoDAO(connection);

	dadosFormSudito.usuario = req.session.usuario;
	jogoDAO.acao(dadosFormSudito);

	res.redirect('jogo?msg=B');
}

module.exports.revogar_acao = function(application, req, res) {
	var url_query = req.query;

	var connection = application.config.dbConnection;
	var jogoDAO = new application.app.models.jogoDAO(connection);

	var _id = url_query.id_acao;
	jogoDAO.revogarAcao(_id, res);
}