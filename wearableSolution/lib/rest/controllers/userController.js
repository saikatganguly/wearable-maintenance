/**
 * Controller for rest user
 */
var express = require('express');
var userService = require('../../common/service/userService');
exports.testUser = function(req, res) {
	var username = req.body.username;
	console.log("=======================reached controller " + username);
	res.json({
		"username" : "test"
	});
};

exports.login = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	userService.getUserByUsername(username, function(user, err) {
		if (user == null) {
			res.send({
				"status" : 404,
				"message" : "User Not Found"
			});
		} else {
			user.comparePassword(password, user.key, user.password, function(isMatch) {
				if (isMatch) {
					var isAccessCodeProvided;
					if(user.accesscode!=null){
						if(user.accesscode.trim()!=""){
							isAccessCodeProvided=true;
						}
						else{
							isAccessCodeProvided=false;
						}
						
					}
					else{
						isAccessCodeProvided=false;
					}
					res.send({
						"status" : 200,
						"message" : "Login Successful",
						"authToken" : user.authToken,
						"isAccessCodeProvided" : isAccessCodeProvided
					});
				} else {
					res.send({
						"status" : 401,
						"message" : "Unauthorized"
					});
				}
			});
		}
	});
};

exports.activate = function(req, res) {
	var authToken = req.body.authToken;
	var activationCode = req.body.activationCode;
	if (authToken === null || authToken.trim() === "") {
		res.send({
			"status" : 401,
			"message" : "Unauthorized"
		});
	} else {
		userService.activateUser(authToken, activationCode,
				function(data, err) {
					if (err) {
						res.send({
							"status" : 500,
							"message" : "Internal Server Error"
						});
					} else {
						res.send({
							"status" : 200,
							"message" : "Success"
						});
					}
				});
	}
	console.log(authToken + "=============" + activationCode);
};


	