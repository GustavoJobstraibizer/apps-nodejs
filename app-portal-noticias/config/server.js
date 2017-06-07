var express = require('express');
var consign = require('consign'); // autoload das views com consign
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public')); // localiza os assets do diretorio public

app.use(bodyParser.urlencoded({extended: true})); // middleware body parser
app.use(expressValidator()); // middleware express validator para validação de dados de formulario

consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controller')
	.into(app);

module.exports = app;