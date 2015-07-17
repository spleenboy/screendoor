function Game(config) {
	this.namespace     = config && config.namespace;
	this.displayName   = config && config.displayName;
	this.description   = config && config.description;
	this.expressRouter = null;
	this.ioRouter      = null;
}

module.exports = Game;
