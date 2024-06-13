var createError = require('http-errors');
var express = require('express');
var path = require('path');
const hbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const cors = require('cors');

var route = require("./routes/index")
var data = require("./config/index")

var app = express();
const port = 3001;

// view engine setup
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

data.connect();
app.listen(port, () => {
    console.log(`post ${port}`);
  });
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
route(app);
module.exports = app;
