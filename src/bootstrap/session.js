var session = require('express-session');
var FileStore = require('session-file-store')(session);

module.exports = function(app) {
    app.use(session({
        secret: 'the screendoor is open',
        store: new FileStore(),
        resave: false,
        saveUninitialized: true
    }));
};
