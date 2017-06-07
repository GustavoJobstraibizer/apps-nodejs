function NoticiasDAO(connection) {
	this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callback) {
	this._connection.query('SELECT * FROM noticias ORDER BY data_criacao DESC', callback);
}

NoticiasDAO.prototype.getNoticia = function(idNoticia, callback) {
	//console.log(idNoticia.id);
	this._connection.query('SELECT * FROM noticias WHERE id = ' + idNoticia.id, callback);
}

NoticiasDAO.prototype.salvarNoticia = function(params, callback) {
	this._connection.query('insert into noticias set ?', params, callback);
}

NoticiasDAO.prototype.getFiveLastNews = function(callback) {
	this._connection.query('SELECT * FROM noticias ORDER BY data_criacao DESC LIMIT 5', callback);
}

module.exports = function() {

	return NoticiasDAO;

}