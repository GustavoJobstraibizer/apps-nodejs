/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

var session = require('express-session');

var passport = require('passport');

var FacebookStrategy = require('passport-facebook').Strategy;


var credentials = require('../configuration/credentials');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* configurar o middleware express-validator */
app.use(expressValidator());

app.use(session({
	secret: 'teste',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app, passport);
	
console.log(app);

/* middleware que configura páginas de status */
app.use(function(req, res, next){
	res.status(404).render('errors/404');
	next();
});

/* middleware que configura msgs de erro internos */
app.use(function(err, req, res, next){
	res.status(500).render('errors/500');
	next();
});

/* Configurações do passport-facebook */
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

var fbOptions = {
	clientID: credentials.facebook_api_key,
	clientSecret: credentials.facebook_api_secret,
	callbackURL: credentials.callback_url,
	profileFields: ['id', 'displayName', 'photos', 'emails', 'gender']
};

var fbCallBack = function(accessToken, refreshToken, profile, done) {
	process.nextTick(function () {
		return done(null, profile);
	});
};

passport.use(new FacebookStrategy(fbOptions, fbCallBack));

/* exportar o objeto app */
module.exports = app;