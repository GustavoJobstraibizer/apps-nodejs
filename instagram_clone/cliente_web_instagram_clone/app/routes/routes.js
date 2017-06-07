module.exports = function(application, passport){
	application.get('/', function(req, res){
		application.app.controllers.index.index(application, req, res);
	});

	application.get('/home', function(req, res){
		application.app.controllers.home.home(application, req, res);
	});

	application.get('/account', usuarioAutenticado, function(req, res){
  		console.log(req.user.photos[0].value);
		res.render('home', {user: req.user});
	});

	application.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

	application.get('/auth/facebook/callback', 
		passport.authenticate('facebook', {successRedirect: '/home', failureRedirect: '/'}),
		  function(req, res) {
		    res.redirect('/home');
		  }
	);	

	application.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	application.get('/login', function(req, res){
		res.redirect('/');
	});

	function usuarioAutenticado(req, res, next) {
  	if (req.isAuthenticated())
    	return next(); 
  		res.redirect('/login')
	}

	application.get('/logar', function(req, res) {
		application.app.controllers.logar.logar(application, req, res);
	});

}