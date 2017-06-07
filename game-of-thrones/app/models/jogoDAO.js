var ObjectID = require('mongodb').ObjectId; // utilizando o object id do mongodb para excluir uma ação (utilizado no metodo "revogarAcao").

function jogoDAO(connection) {
	this._connection = connection();
}

jogoDAO.prototype.gerarParametros =  function(usuario) {
	this._connection.open(function(err, mongoClient) {
		mongoClient.collection("jogo", function(err, collections) {
			collections.insert({
				usuario: usuario,
				moeda: 15,
				suditos: 10,
				temor: Math.floor(Math.random() * 1000),
				sabedoria: Math.floor(Math.random() * 1000),
				comercio: Math.floor(Math.random() * 1000),
				magia: Math.floor(Math.random() * 1000)
			});
			mongoClient.close();
		});
	});
};

jogoDAO.prototype.iniciaJogo = function(usuario, casa, res, msg) {
	this._connection.open(function(err, mongoClient) {
		mongoClient.collection("jogo", function(err, collections) {
			collections.find({usuario: usuario}).toArray(function(err, result) {
				
				console.log(result[0]);
				res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg});

				mongoClient.close();
			});
		});
	});
};

jogoDAO.prototype.acao = function(acao) {
	this._connection.open(function(err, mongoClient) {
		mongoClient.collection("acao", function(err, collections) {

			var date = new Date();

			var tempo_acao = 0;

			switch(parseInt(acao.acao)) {
				case 1: 
					tempo_acao = 1 * 60 * 60000; //1h
				break;
				case 2: 
					tempo_acao = 2 * 60 * 60000; //2h
				break;
				case 3:
				case 4: 
					tempo_acao = 5 * 60 * 60000; //5h
				break;				
			}

			acao.acao_termina_em = date.getTime() + tempo_acao;

			collections.insert(acao);
		});

		mongoClient.collection("jogo", function(err, collections) {

			var moedas = null;

			switch(parseInt(acao.acao)) { // acao referente a atualização de golds na collection jogo
				case 1: 
					moedas = - 2 * acao.quantidade; 
				break;
				case 2: 
					moedas = - 3 * acao.quantidade; 
				break;
				case 3:
				case 4: 
					moedas = - 1 * acao.quantidade;
				break;				
			}

			collections.update(
				{usuario: acao.usuario},
				{$inc: {moeda: moedas}}
			);

			mongoClient.close();
		});
	});
};

jogoDAO.prototype.getAcoes = function(usuario, res) {
	this._connection.open(function(err, mongoClient) {
		mongoClient.collection("acao", function(err, collections) {

			var date = new Date();
			var momento_atual = date.getTime();
			
			collections.find({usuario: usuario, acao_termina_em: {$gt:momento_atual}}).toArray(function(err, result) {
				
				res.render('pergaminhos', {acoes: result});
				//console.log(result[0]);

				mongoClient.close();
			});
		});
	});
};

jogoDAO.prototype.revogarAcao = function(_id, res) {
	this._connection.open(function(err, mongoClient) {
		mongoClient.collection("acao", function(err, collections) {
				
				collections.remove(
					{_id: ObjectID(_id)},
					function(err, result) {
						res.redirect('jogo?msg=D');
						mongoClient.close();
					}
				);

		});
	});
};

module.exports = function() {
	return jogoDAO;
};

