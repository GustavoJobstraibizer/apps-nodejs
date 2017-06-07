var express = require('express'); // express retorna um função que é armazenada na variavel app
var app = express();

app.get('/', function(req, res) {
	res.send("<html><body>Portal de noticias</body></html>");
});

app.get('/tecnologia', function(req, res) {
	res.send("<html><body><p>noticias de Técnologia.</p></body></html>");
});

app.get('/moda', function(req, res) {
	res.send("<html><body><p>noticias de Moda.</p></body></html>");
});

app.listen(3000, function() {
	console.log('Servidor rodando com Express...');
});