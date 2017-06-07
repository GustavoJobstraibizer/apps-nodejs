/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(80, function() {
	console.log('Servidor online');
});

/* requisições websockets serao escutadas também na porta 80 */
var io = require('socket.io').listen(server);

app.set('io', io);

/* criar conexão por websocket */
io.on('connection', function(socket) {
	console.log('Usuário conectou');

	socket.on('disconnect', function() {
		console.log('Usuário disconectou');
	});

	socket.on('msgParaServidor', function(data) { // escuta a mensagem enviada pelo cliente

		/* dialogo */
		socket.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		); // emite uma resposta para o cliente

		socket.broadcast.emit( // envia a mensagem para todos os usuarios
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		/* participantes */
		if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
			socket.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			);

			socket.broadcast.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			);
		}
		
	});
});