var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var logger = require('morgan');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
 // var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);

var ejs = require('ejs');
var routes = require('./routes/index');

var app = express();

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
// app.use(session({
//   secret: 'im',
  // store: new MongoStore({
  //   url:"mongodb://localhost/issuesManag",
  //   collection:"sessions"
  // }),
//   resave: false,
//   saveUninitialized: true
// }))

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
