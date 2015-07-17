var express = require('express');

module.exports = function(app) {
	app.set('views', './src/views');
	app.set('view engine', 'jade');

	app.configure("development", function() {
		// any configurations for development mode
	});

	app.configure("production", function() {
		// any configurations for production mode
	});

	app.get("/", function(req, res) {
		var games = require('./../games');
		res.render("index", {"games": games.list});
	});

	app.use("/static", express.static("client"));
	app.use("/build",  express.static("build"));
};