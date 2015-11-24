var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose=require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./lib/common/models/user_model');

var db=mongoose.connect('mongodb://localhost:27017/wearable');
mongoose.connection.on('open' , function(){
	console.log("Connected to local db");
});
var http = require('http');
var TMP_UPLOAD_DIR = process.env.TMP_UPLOAD_DIR || path.join(__dirname, './public/stepimage');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: TMP_UPLOAD_DIR});
/*var routes = require('./routes/index');
var users = require('./routes/users');*/

var app = express();
app.set("multipartMiddleware",multipartMiddleware);
//session setup
app.use(session({secret: 'XXXWearableXXX' , resave: true, saveUninitialized: true}));

//passport Initialization
app.use(passport.initialize());
app.use(passport.session());
//Passport local strategy to handle error
//passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(
		  function(username, password, done) {
		    /* see done being invoked with different paramters
		       according to different situations */
		    User.findOne({ username: username }, function (err, user) {
		      if (err) { return done(err); }
		      if (!user) { return done(null, false); }
		      console.log(user);
		      user.comparePassword(password , user.key , user.password , function(isMatch) {
		    	  if(isMatch){
		    		  console.log("matched");
		    		  return done(null, user);
		    	  }
		    	  else{
		    		  console.log("password failed");
			    	  return done(null, false);
		    	  }
		    	 
		      });
		    });
		  }
		));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.multipart({ limit: '900mb', defer: true }));
app.use(function(req , res , next){
	console.log("==================="+req.url.indexOf("/user")>=0+"========================");
	if(req.url.indexOf("/api")>=0){
		//validate authentication.
		console.log("validating auth");
	}
	else{
		console.log("Not rest");
	}
	next();
});

/*app.use('/', routes);*/
require("./lib/web/routes")(app);
require("./lib/rest/routes")(app);
//app.use('/users', users);

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



//interceptor to pre authorize rest call

module.exports = app;
