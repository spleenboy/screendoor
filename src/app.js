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
var bootstrap = require('./bootstrap/');

var app = express();

bootstrap(app);

var port = process.env.PORT || 3000;
app.listen(port);

logger.info("screendoor open on http://localhost:" + port);
