module.exports = function(application){
	application.get('/', function(req, res){

		res.render('xyz');

		// res.format({

		// 	html: function() {
		// 		res.send('Bem vindo a sua app NodeJS!');
		// 	},

		// 	json: function() {
		// 		var retorno = {
		// 			body: 'Bem vindo a sua app NodeJS!'
		// 		}

		// 		res.json(retorno);
		// 	}

		// });
	});

	application.post('/', function(req, res){

		var texto = req.body;

		res.send(texto);
	});
}