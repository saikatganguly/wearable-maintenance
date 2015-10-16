/**
 * Web Routes
 */

var express = require("express");
var passport = require('passport');
var appUtil = require('./appUtil');

var path = require('path');


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
		      req.session.username=user.username;
		      req.session.role = user.role;
		      if(user.role==="ROLE_ADMIN"){
		    	  return res.redirect('/home');  
		      }
		      else if(user.role==="ROLE_USER"){
		    	  return res.redirect('/user/activate');
		      }
		      
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
	app.post("/task/addtask",app.get('multipartMiddleware'), taskController.addTask);
	app.post("/task/addtaskstep",app.get('multipartMiddleware') ,taskController.addTaskStep);
	app.post("/task/taskdetail",taskController.getTaskDetail);
	app.post("/task/stepimage",taskController.getStepImage);
	app.post("/task/publishtask",taskController.publishTask);
	app.post("/task/edittask",app.get('multipartMiddleware'),taskController.editTask);
	app.post("/task/edittaskstep",app.get('multipartMiddleware'),taskController.editTaskStep);
	app.get("/chatwindow",appUtil.isAuthenticated, userController.getChatWindow);
}