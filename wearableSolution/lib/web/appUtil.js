/**
 * New node file
 */

exports.isAuthenticated=function(req, res, next){
	console.log("=====================Request "+req);
	console.log("checking authentication +"+req.user);
	 if (req.isAuthenticated()){
		 	console.log("User authenticated");
		 	console.log("User found : "+req.session.username);
		   return next();
	 }
	     

	    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
	    res.redirect('/unauthorized');
}