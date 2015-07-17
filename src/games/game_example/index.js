(function(){
	var Game = require('./../game');
	var express = require('express');
	var app = express();

	app.set('views', './views');
	app.set('view engine', 'jade');

	var config = require('./config.json');
	var expressRouter = express.Router();

	expressRouter.get('/', function(req,res,next){
		res.render('index', config);
	});

	var ioRouter = {
		'ping': function(req) {
			req.socket('emit', 'pong');
		}
	};

	var game = new Game(config);
	game.expressRouter = expressRouter;
	game.ioRouter = ioRouter;

	module.exports = game;
})();
