/* importar modulo do crypto */

var crypto = require('crypto');

function UsuariosDAO(connection) {
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario, req, res) {
	this._connection.open(function(err, mongoClient) {
		mongoClient.collection("usuarios", function(err, collections) {


			var password_crypto = crypto.createHash("md5").update(usuario.senha).digest("hex");

			usuario.senha = password_crypto;

			collections.insert(usuario);

			res.render('success', {user: usuario.nome});

			mongoClient.close();

		});
	});
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res) {
	this._connection.open(function(err, mongoClient) {
		mongoClient.collection("usuarios", function(err, collections) {

			var password_dcrypto = crypto.createHash("md5").update(usuario.senha).digest("hex");

			usuario.senha = password_dcrypto;

			collections.find(usuario).toArray(function(err, result) {
			//collections.find({usuario : usuario.usuario, senha: usuario.senha});
				if (result[0] != undefined) {
					req.session.autorizado = true;

					req.session.usuario = result[0].usuario; // armazena na variavel de sessao o nome do usuario
					req.session.casa = result[0].casa; // armazena na variavel de sessao o nome da casa
				}

				if (req.session.autorizado) {
					res.redirect("jogo");
				} else {
					res.render("index", {erro_login: 'usuário e ou senha inválidos', dadosForm: usuario, validacao: {}});
					return;
				}
			});
			mongoClient.close();
		});
	});
}

module.exports = function() {
	return UsuariosDAO;
}