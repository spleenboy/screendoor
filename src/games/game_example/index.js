(function(){
	var Game = require('./../game');
	var config = require('./config.json');

	var game = new Game(config);

	game.registerExpressRoutes = function(expressRouter) {
		expressRouter.get("/", function(req, res) {
			res.render("index", config);
		});
	};

	game.registerIoRoutes = function(ioRouter) {
		ioRouter.ping = function(req) {
			req.io.emit('pong');
		};
	};

	module.exports = game;
})();
