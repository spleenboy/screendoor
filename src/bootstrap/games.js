var games = require('./../games/');

module.exports = function(app) {
	games.load(app);
};
