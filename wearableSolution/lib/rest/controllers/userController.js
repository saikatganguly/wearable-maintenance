/**
 * Controller for rest user
 */
var express=require('express');
var userService=require('../../common/service/userService');
exports.testUser= function(req , res){
	var username=req.body.username;
	console.log("=======================reached controller "+username);
	res.json({"username" : "test"});
};

exports.login=function(req , res){
	var username=req.body.username;
	var password=req.body.password;
	userService.getUserByUsername(username , function(user , err){
		if(user==null){
			res.send({"status" : 404 , "message" : "User Not Found"});
		}
		else{
			user.comparePassword(password , user.key , user.password , function(isMatch) {
				if(isMatch){
					res.send({"status" : 200 , "message" : "Login Successful" , "authToken" : "123456"});
				}
				else{
					res.send({"status" : 401 , "message" : "Unauthorized"});
				}
			});
		}
	});
};


	