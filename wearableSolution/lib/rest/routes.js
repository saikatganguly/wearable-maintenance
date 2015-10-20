/**
 * Routing file for rest services
 */
var express=require("express");
var appUtil = require('./appUtil');


module.exports=function(app){
	var userController = require("./controllers/userController");
	var taskController = require("./controllers/taskController");
	app.get("/api/user/test" , userController.testUser);
	app.get("/api/task/gettask" , appUtil.isAuthenticated , taskController.getTask);
	app.post("/api/login" , userController.login);
	app.post("/api/activateuser" , userController.activate);
}