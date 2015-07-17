/*
 * screendoor
 * https://github.com/barrett/screendoor
 *
 * Copyright (c) 2015 Barrett Alexander
 * Licensed under the MIT license.
 */

'use strict';

var express = require('express.io');
var games   = require('./games/');
var app     = express();

app.http().io();

app.configure("development", function() {
	// any configurations for development mode
});

app.configure("production", function() {
	// any configurations for production mode
});


app.use("/static", express.static("client"));
app.use("/build",  express.static("build"));

app.listen(process.env.PORT || 3000);
