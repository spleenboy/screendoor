var fs = require('fs');
var path = require('path');
var async = require('async');

function Games() {
	this.list = [];
	this.dir  = path.join(process.cwd(), '/src/games/');
}

Games.prototype.find = function() {
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
				self.list.push(game);
			}
		}
	});
}

Games.prototype.register = function(app) {
	for (var i=0; i<this.list.length; i++) {
		var router = this.list[i].getRouter();
		var name   = this.list[i].getName();
		app.use(path.join('game', name), router);
	}
}

module.exports = new Games();
