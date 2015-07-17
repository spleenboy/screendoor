/*
 * screendoor
 * https://github.com/barrett/screendoor
 *
 * Copyright (c) 2015 Barrett Alexander
 * Licensed under the MIT license.
 */

'use strict';

var express = require('express.io');
var logger  = require('./services/logger');
var games   = require('./games/');

var app     = express();

app.http().io();

app.set('views', './src/views');
app.set('view engine', 'jade');

app.configure("development", function() {
	// any configurations for development mode
});

app.configure("production", function() {
	// any configurations for production mode
});

games.load(app);

app.get("/", function(req, res) {
	res.render("index", {"games": games.list});
});

app.use("/static", express.static("client"));
app.use("/build",  express.static("build"));

var port = process.env.PORT || 3000;
app.listen(port);

logger.info("screendoor open on http://localhost:" + port);
