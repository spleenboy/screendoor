(function(){
	var express = require('express');
	var app = express();
	app.set('views', './views');
	app.set('view engine', 'jade');
	var config = require('./config.json');
	var router = express.Router();
	router.get('/', function(req,res,next){
		res.render('index.jade', {namespace: config.namespace});
	});
	//router.METHOD(path, handler)
	var nsp = io.of('/'+config.namespace);
	nsp.on('connection', function(socket){
		socket.emit('a new person joined!');
	});
	module.exports = {
		router: router,
		config: config
	}
})();