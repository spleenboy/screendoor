var winston = require('winston');
var path    = require('path');
var moment  = require('moment');

var ConsoleTransport = winston.transports.Console;
var FileTransport = winston.transports.File;

function getLogName() {
	return moment().format('YYYYMMDD') + '.log';
}

function getLogPath() {
	return path.join('logs', getLogName());
}

var logger  = new (winston.Logger)({
	transports: [
		new ConsoleTransport(),
		new FileTransport({filename: getLogPath()})
	],
	exitOnError: false
});

logger.on('logging', function(transport) {
	if (!transport.filename) {
		return;
	}
	if (transport.filename !== getLogName()) {
		logger.remove(FileTransport);
		logger.add(new FileTransport({"filename": getLogPath()}));
	}
});


module.exports = logger;
