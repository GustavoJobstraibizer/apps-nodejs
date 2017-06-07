var http = require('http'); // incorporando modulo http

var server = http.createServer(function(req, res) { // criando servidor que recebera uma requisição e devolverá uma resposta

	var categoria = req.url; // armazena na variavel categoria a url da requisição

	if (categoria === '/tecnologia') {
		res.end("<html><body><p>notiicas de Técnologia.</p></body></html>");

	} else if (categoria === '/moda') {
		res.end("<html><body><p>notícias de moda</p></body></html>"); // resposta devolvida pelo servidor

	} else if (categoria === '/beleza') {
		res.end("<html><body><p>notícias de beleza</p></body></html>"); // resposta devolvida pelo servidor	

	} else {
		res.end("<html><body><p>notícias</p></body></html>"); // resposta devolvida pelo servidor	

	}

});

server.listen(3000); // porta onde ficará escutando as requisições do cliente.