/**
 * Routing file for rest services
 */
var express=require("express");

module.exports=function(app){
	var userController = require("./controllers/userController");
	var taskController = require("./controllers/taskController");
	app.get("/api/user/test" , userController.testUser);
	app.get("/api/task/gettask" , taskController.getTask);
}