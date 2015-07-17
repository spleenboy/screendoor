var Game = require('../game');

var game = new Game({
	namespace: 'tic-tac-cubed',
	displayName: 'Tic Tac Cubed',
	description: '3D Tic-Tac-Toe'
});

game.registerExpressRoutes = function(router) {
	router.get("/", function(req, res) {
		res.render(__dirname + "/views/index", {"game": game});
	});

	router.get("/js/:file", function(req, res) {
		res.sendfile(__dirname + "/views/js/" + req.params.file);
	});

	router.get("/css/:file", function(req, res) {
		res.sendfile(__dirname + "/views/css/" + req.params.file);
	});
};

module.exports = game;
