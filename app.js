var createError = require('http-errors');
var express = require('express');
const passport=require('passport');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const cors=require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const database=require('./server/config/db_connection')
// var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');
var adminRouter=require('./server/routes/admin');
// var articleRouter=require('./server/routes/article');
// var profesionalRouter=require('./server/routes/professional')

// create a custom middleware
const checkuserType=function(req,res,next){
  const userType=req.originalUrl.split('/')[2];
  // require('./server/config/passport')(userType,passport);

next();
};


var app = express();


app.use(checkuserType);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname+'./server/publics/'))
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/admin', express.static('./node_modules/admin-lte-express/public'))
// app.use('/', require('admin-lte-express'));


app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());



app.use('/api/users', usersRouter);
// app.use('/api/admin',indexRouter);
app.use('/api/admin',adminRouter);
// app.use('/api/article',articleRouter);
// app.use('/api/user/professional',profesionalRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

