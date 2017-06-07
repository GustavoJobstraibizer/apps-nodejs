var http = require('http'); // incorporando modulo http

var server = http.createServer(function(req, res) { // criando servidor que recebera uma requisição e devolverá uma resposta

	res.end("<html><body><p>Portal de notícias</p></body></html>"); // resposta devolvida pelo servidor

});

server.listen(3000); // porta onde ficará escutando as requisições do cliente.