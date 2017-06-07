var express = require('express'),
    bodyParser = require('body-parser'),
    multiParty = require('connect-multiparty'),
    mongodb = require('mongodb'),
    objectId = require('mongodb').ObjectId,
    fs = require('fs'),

    passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	session = require('express-session'),
  	credentials = require('./configuration/credentials');

/* Configurações do passport-facebook */
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new FacebookStrategy({
		clientID: credentials.facebook_api_key,
		clientSecret: credentials.facebook_api_secret,
		callbackURL: credentials.callback_url
	},
	function(accessToken, refreshToken, profile, done) {
		process.nextTrick(function(){
			return done(null, profile);
		});
	}
));


// configurando a instância do express
var app = express();

// body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiParty()); // middleware que interpreta dados multipart-formData

app.use(function(req, res, next) {

	// dando acesso a respostas a qualquer dominio que consuma a api (CrossDomain)
	res.setHeader("Access-Control-Allow-Origin", "*");

	// pré configura quais metodos a origem pode riquisitar (GET,POST,PUT,DELETE)
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

	// sobreescreve o cabeçalho da request que a origem enviou
	res.setHeader("Access-Control-Allow-Headers", "content-type");


	res.setHeader("Access-Control-Allow-Credentials", true);
	next();

});

// porta onde a aplicação ira ser executada
var port = 8080;

app.listen(port);

let db = new mongodb.Db(
	'instagram',
	new mongodb.Server('localhost', 27017, {}),
	{}
);

console.log(`Servidor esta escutando na porta ${port}`);

app.get('/', function(req, res) {

	let ola = {msg: 'Olá'};
	res.send(ola);

});

/* verbo post HTTP para URI /api - POST (Create) */ 
app.post('/api', function(req, res) {

	// res.setHeader("Access-Control-Allow-Origin", "http://localhost:80");

	var date = new Date();
	var time_stamp = date.getTime();

	var url_image = time_stamp + '_' + req.files.arquivo.originalFilename;

	var path_origin = req.files.arquivo.path;
	var path_destiny = './uploads/' + url_image;

	
	var titulo = req.body.titulo;

	fs.rename(path_origin, path_destiny, function(err) {
		if (err) {
			res.status(500).json({erro: err});
			return;
		}

		var dados = {
			url_imagem: url_image,
			titulo: titulo
		};

		db.open(function(err, mongoclient) {
			mongoclient.collection('postagens', function(err, collections) {
				collections.insert(dados, function(err, results) {
					if (err) {
						res.json({responseCode: 0});
					} else {
						res.json({responseCode: 1});
					}
					mongoclient.close();
				});
			});
		});
	});
});


/* verbo get HTTP para URI /api - GET (ler) obs: ler todos os documentos */ 
app.get('/api', function(req, res) {

	db.open(function(err, mongoclient) {
		mongoclient.collection('postagens', function(err, collections) {
			collections.find().toArray(function(err, result) {

				if (err) {
					res.json({responseCode: 0});
				} else {
					res.json({responseCode: 1, result});
				}
				mongoclient.close();
			});
		});
	});
});

/* verbo get HTTP para URI /api - GET (ler) obs: ler todos os documentos */ 
app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

/* verbo get HTTP para URI /api - GET (ler) obs: ler documento pelo ID */ 
app.get('/api/:id', function(req, res) {

	db.open(function(err, mongoclient) {
		mongoclient.collection('postagens', function(err, collections) {
			collections.find(objectId(req.params.id)).toArray(function(err, result) {

				if (err) {
					res.json({responseCode: 0});
				} else {
					res.status(404).json({responseCode: 1, result});
				}
				mongoclient.close();
			});
		});
	});
});

app.get('/imagens/:imagem', function(req, res) {

	var img = req.params.imagem;

	fs.readFile('./uploads/' + img, function(err, content) {
		if (err) {
			res.status(400).json(err);
			return;
		}

		res.writeHead(200, {'Content-type' : 'image/jpg'});
		res.end(content);

	});

});

/* verbo put HTTP para URI /api - PUT (atualizar) */ 
app.put('/api/:id', function(req, res) {

	db.open(function(err, mongoclient) {
		mongoclient.collection('postagens', function(err, collections) {
			collections.update(
				{ _id : objectId(req.params.id)},

				// $push inclui um elemento dentro de um array
				{ $push:{
							comentarios : {
								id_comentario: new objectId(), // retorna um identificador unico
								comentario : req.body.comentario
							}
						}
				}, 
				{},
				function(err, result) {
					if (err) {
						res.json({responseCode: 0});
					} else {
						res.json({responseCode: 1, result});
					}
				mongoclient.close(); 
				}
			);
		});
	});
});

/* verbo DELETE (remover) */
app.delete('/api/:id', function(req, res) {

	db.open(function(err, mongoclient) {
		mongoclient.collection('postagens', function(err, collections) {
			collections.update(

				{},
				// remover um elemento do array no mongodb
				{$pull: {
							comentarios: {id_comentario : objectId(req.params.id)}
						}
				},
				{multi: true},
				function(err, result) {
				if (err) {
					res.json({responseCode: 0});
				} else {
					res.json({responseCode: 1, result});
				}

				mongoclient.close();
				}
			);
		});
	});
});