/**
 * User controller 
 */


var express=require('express');
var userService=require('../../common/service/userService');
var taskService=require('../../common/service/taskService');
var passport = require('passport');

exports.getRegistrationPage=function(req , res){
	res.render("user_registration");
};

exports.getActivationPage=function(req , res){
	res.render("user_activation" , {"username" : req.session.username});
};

exports.getUser= function(req , res){
	console.log("reached controller");
	userService.getUserById(1 , function(data , err){
		console.log(data +"=======================");
	});
	res.render("index" , {"title" : "Saikat"});
};

//This one is to create new user
exports.addUser= function(req , res){
	console.log("reached controller");
	var name=req.body.name;
	var username=req.body.username;
	var email=req.body.email;
	var password=req.body.password;
	console.log("name : "+name+" username : "+username+" email : "+email+" password : "+password);
	userService.createUser(name,username,email,password,function(data , err){
		console.log(data +"=======================");
		res.redirect("/login");
	});
	
	//res.render("user_registration");
	
};

//This is to add one time access code of the User
exports.activateUser=function(req , res){
	console.log("Activating user");
	var username=req.body.username;
	var accesscode=req.body.accesscode;
	console.log("Username : "+ username +" accesscode : "+ accesscode);
	userService.activateUser(username , accesscode , function(data , err){		
	console.log("Activated");
	if(data===true){
		res.render("user_activation" , {"username" : "sg123"});
	}
	});
};

//This is to add one time access code of the User
exports.getLoginPage=function(req , res){
	console.log("========================== User found : "+req.user);
	res.render("login" , {"message" : ""});
};

exports.unauthorized=function(req , res){
	res.render("unauthorized");
};

exports.getMeHome=function(req , res){
	var tasklist="";
	var publishedTaskList="";
	var userlist="";
	userService.getUserByRole(function(data,err){
		if(data.length>0){
			userlist=data;
		}
	});
	taskService.getTaskList(function(data,err){
		if(data.length>0){
			tasklist=data;
			var i=0;
			(function loop() {
			    if (i < tasklist.length) {
			          	if(tasklist[i].assigne !== undefined){
						userService.getUserById(tasklist[i].assigne,function(result,err){
							tasklist[i].username=result.username;
							tasklist[i].authToken=result.authToken;
							i++;
					        loop();
							});}
						else{
							tasklist[i].username="Not Assigned";
							tasklist[i].authToken="";
							 i++;
					         loop();
						}
			    }
			    else{
			    	
			    	taskService.getPublishedTaskList(function(data,err){
						if(data.length>0){
							publishedTaskList=data;	
							res.render("dashboard", {session: req.session,"taskname":"",tasklist:tasklist,publishtasklist:publishedTaskList,userlist:userlist});
					}
						else{
							res.render("dashboard", {session: req.session,"taskname":"",tasklist:tasklist,publishtasklist:"",userlist:userlist});
						}
						
					});
			    }
			}());
				
			
			
			
			
		}
		else{
			res.render("dashboard", {session: req.session,"taskname":"",tasklist:"",publishtasklist:"",userlist:userlist});
			
		}
	});
	
};

exports.getChatWindow=function(req , res){
	console.log("authToken "+req.body.authToken);
	console.log("taskId "+req.body.taskId);
	var taskData={};
	taskService.getTaskDetailById(req.body.taskId,function(data , err){
			taskData=data;
			res.render("chat",{session: req.session,"authToken":req.body.authToken,task:taskData});
				
		});
	
};
exports.getChatTestWindow=function(req , res){
	res.render("chattest",{session: req.session});
	
};

exports.getRegistrationPageForAdmin=function(req , res){
	res.render("user_registration_admin");
};

exports.addUserByAdmin= function(req , res){
	console.log("reached controller");
	userService.createUserByAdmin(req,function(data , err){
		console.log(data +"=======================");
		res.redirect("/home");
	});
	
	//res.render("user_registration");
	
};

