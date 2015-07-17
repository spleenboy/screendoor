var express = require('express');
var fs = require('fs');
var path = require('path');
var events = require('events');
var util = require('util');

var logger = require('../services/logger');
var Game = require('./game');

function Games() {
	this.list = {};
	this.dir  = path.join(process.cwd(), '/src/games/');
	events.EventEmitter.call(this);
}

util.inherits(Games, events.EventEmitter);

Games.prototype.get = function(name) {
	return this.list[name];
};

Games.prototype.load = function(app) {
	var self = this;
	fs.readdir(this.dir, function(err, names) {
		if (err) {
			logger.error("Error loading games directory", err);
			return false;
		}
		for (var i=0; i<names.length; i++) {
			// Skip anything with a dot!
			if (path.extname(names[i])) {
				continue;
			}
			var gamePath = './' + names[i];
			try {
				var game = require(gamePath);
				self.register(game, app);
			}
			catch (e) {
				logger.error("Error registering game", gamePath, e);
			}
		}
		self.emit('done', self.list);
	});
};

Games.prototype.validate = function(game) {
	if (!(game instanceof Game)) {
		throw new TypeError("Invalid game type");
	}

	if (game.namespace in this.list) {
		logger.error("Game name already in use", game.namespace);
		throw new Error("That game namespace is already in use");
	}
}

Games.prototype.register = function(game, app) {

	this.validate(game);

	game.baseUrl = path.join('game', game.namespace);

	// Express routes
	var expressRouter = express.Router();
	expressRouter.use(this.routed.bind(this, game));
	game.registerExpressRoutes(expressRouter);

	// IO routes
	var ioRouter = {};
	game.registerIoRoutes(ioRouter);
	if (ioRouter) {
		app.io.route(game.baseUrl, ioRouter);
	}

	this.list[game.namespace] = game;
	logger.info('Registered game', game.namespace);
};

// Middleware for requests routed to a specific game
Games.prototype.routed = function(game, req, res, next) {
	logger.debug("Passing route to game", game.namespace);
	var data = {
		"game": game,
		"req": req,
		"res": res
	};
	this.emit("request", data);
	return next();
};

module.exports = new Games();
