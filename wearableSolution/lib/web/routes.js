/**
 * Web Routes
 */

var express = require("express");
var passport = require('passport');
var appUtil = require('./appUtil');

module.exports = function(app) {
	var userController = require("./controllers/userController");
	var taskController = require("./controllers/taskController")
	
	app.get("/user/register", userController.getRegistrationPage);
	app.post("/user/register", userController.addUser);
	
	app.get("/user/activate", userController.getActivationPage);
	app.post("/user/activate", userController.activateUser);
	
	app.get("/login", userController.getLoginPage);
	
	

	app.post('/login', function(req, res, next) {
		  /* look at the 2nd parameter to the below call */
		  passport.authenticate('local', function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) { return res.render('login' , {"message" : "Not authorized"}); }
		    req.logIn(user, function(err) {
		      if (err) { return next(err); }
		      return res.redirect('/home');
		    });
		  })(req, res, next);
		});

	app.get("/unauthorized", userController.unauthorized);
	app.get("/home", appUtil.isAuthenticated, userController.getMeHome);
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});
	
	app.get("/task/addtask",appUtil.isAuthenticated, taskController.getTaskPage);
	app.post("/task/addtask", taskController.addTask);
	
	app.get("/chatwindow",appUtil.isAuthenticated, userController.getChatWindow);
}