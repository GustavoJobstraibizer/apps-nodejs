module.exports.home = function(application, req, res) {
	res.render('home/padrao', {user: req.user});
}