var session = require('./session');
var routes  = require('./routes');
var games   = require('./games');

module.exports = function(app) {
	app.http().io();

	session(app);
	routes(app);
	games(app);
}
