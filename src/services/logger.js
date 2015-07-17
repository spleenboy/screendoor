var winston = require('winston');
var path    = require('path');
var moment  = require('moment');

function getLogPath() {
	return path.join(process.cwd(), 'logs/', moment().format('YYYYMMDD') + '.log');
}

var logger  = new winston.Logger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({filename: getLogPath()})
	],
	exitOnError: false
});

logger.on('logging'), function(transport, level, msg, meta) {
	var logPathToday = getLogPath();
	if (transport.filename && transport.filename !== logPathToday) {
		logger.remove(winston.transports.File);
		logger.add(new winston.transports.File({filename: logPathToday});
	}
});


module.exports = logger;
