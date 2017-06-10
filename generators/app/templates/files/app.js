/*
<%= appName %>.js

This is the configuration file/entry point for the <%= appName %>
Node.js express application. This is where the view engine and the
database are set up, and also where any middleware is
added.

Author: <%= developer %>
*/

//Instantiate express..
const express = require('express');
const app = express();
//Set the port..
//This is set up in the bin/www file..

//Set up view engine (handlebars) ..
const hbs = require('express-handlebars').create({
  defaultLayout: 'main',
  partialsDir: ['views/partials/'],
  helpers: {
    section: function(name, options) {
      if (!this._sections)
        this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});
//Set view engine..
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//App environment environmental variable..
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

//Get configuration..
const config = require('./config');
console.dir(config);
//Set up Database..
const mongoose = require('mongoose')
mongoose.connect(config.db);
mongoose.Promise = global.Promise;

// console.log(assert.equal(query.exec().constructor, global.Promise));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: Unable to connect at ' + config.db));
db.on('open', () => {
  console.log('We are Connected to the Mongeese!');
});
});

//Get routes..
const routes = require('./routes/router');

/*
====Routes/Middleware=======>>>
*/

const bodyParser = require('body-parser');

//Link in cookie-parser & express-session..
app.use(require('cookie-parser')(config.cookiePass));
app.use(require('express-session')({
resave: false,
saveUninitialized: true,
secret: config.cookiePass,
cookie: {
  secure: true
}
}));

//Link in body-parser..
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Serve favicon..
app.use(require('serve-favicon')(config.root + '/site/public/img/favicon.ico'));

//Set up Static files..
app.use(express.static(__dirname + '/public'));

//If there is a flash message present, transfer it to local context, then delete it..
app.use(function(req, res, next) {
res.locals.flash = req.session.flash;
delete req.session.flash;
next();
});

//Use routes..
app.use('/', routes);

//Custom 404 page..
app.use(function(err, req, res) {
res.status(404);
res.render('404');
});

//Custom 500 page..
app.use(function(err, req, res, next) {
console.error(err.stack);
res.status(500);
res.render('500', {errr: err.stack});
});

module.exports = app;
