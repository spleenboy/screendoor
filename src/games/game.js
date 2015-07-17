function Game(config) {
	this.namespace     = config && config.namespace;
	this.displayName   = config && config.displayName;
	this.description   = config && config.description;
}

Game.prototype.registerExpressRoutes = function(expressRouter) {
	throw new Error("A game must register routes");
};

Game.prototype.registerIoRoutes = function(ioRouter) {
	// ioRouter.ping = function(req) {req.io.send('pong');}
};

module.exports = Game;
