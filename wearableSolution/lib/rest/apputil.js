/**
 * New node file
 */
var userService=require("../common/service/userService");


exports.isAuthenticated=function(req, res, next){
	var accessCode=req.headers.accesscode;
	var authToken=req.headers.authtoken;
	console.log("authToken "+authToken);
	console.log("accessCode "+accessCode);
	userService.getUserByAuthToken(authToken,function(data , err){
		
		if(data!==null){
			
			if(data.accesscode === accessCode){
				req.userId=data._id;
				return next();
			}
			else{
				res.send({
					"status" : 401,
					"message" : "Unauthorized",
					"authToken" : "",
					"accessCode" : ""
				});
			}
		}
		else{
			res.send({
				"status" : 404,
				"message" : "User Not Found",
				"authToken" : "",
				"accessCode" : ""
			});
		}
		
	});
	
};
