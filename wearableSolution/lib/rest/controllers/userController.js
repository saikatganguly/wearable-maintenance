/**
 * Controller for rest user
 */
var express=require('express');

exports.testUser= function(req , res){
	var username=req.body.username;
	console.log("=======================reached controller "+username);
	res.json({"username" : "test"});
};


	