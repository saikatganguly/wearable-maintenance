/**
 * New node file
 */
var userService=require("../common/service/userService");


exports.isAuthenticated=function(req, res, next){
	var authToken=req.body.authToken;
	var accessCode=request.body.accessCode
	
	userService
	
	return next();
};
