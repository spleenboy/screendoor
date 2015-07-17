var fs = require('fs');
var path = require('path');
var events = require('events');
var util = require('util');
var logger = require('../services/logger');

function Games() {
	this.list = [];
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
			try {
				var game = require(path.join('.', names[i]));
				self.register(game, app);
			}
			catch (e) {
				logger.error("Error registering game", e);
			}
		}
	});
};

Games.prototype.register = function(game, app) {
	var router = game.getRouter();
	var name   = game.getName();

	if (name in this.list) {
		logger.error("Game name already in use", name);
		throw new Error("That game name is already in use");
	}

	router.use(this.routed.bind(this, game));
	app.use(path.join('game', name), router);

	logger.info('Registered game', name);
};

// Middleware for requests routed to a specific game
Games.prototype.routed = function(game, req, res, next) {
	var data = {
		"game": game,
		"req": req,
		"res": res
	};
	this.emit("request", data);
	return next();
};

module.exports = new Games();
