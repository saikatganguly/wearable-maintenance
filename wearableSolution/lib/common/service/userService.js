/**
 * User Service
 */

var User = require('../models/user_model');


exports.createUser=function(name,username,email,password, callback){
	var user1;
	var newUser = new User({
		  name: name,
		  username: username,
		  password: password 
		});
	
	/*chris.save(function(err) {
		  if (err) throw err;

		  console.log('User saved successfully!');
		});
	
	User.find({ username: username }, function(err, user) {
		  if (err) throw err;
		  
		  // object of the user
		  user1=user;
		  console.log(user);
		  
		});
	callback(user1);*/
	
	User.register(newUser, password, function(err, user) {
        if (err) {
            console.log(err);
        }
        else{
        	callback(true);
        }
    });
};

exports.activateUser=function (username , activationCode , callback){
	User.findOne({ username: username }, function (err, doc){
		  doc.accesscode = activationCode;
		  doc.save();
		});
		callback(true);
};

exports.getUserByUsername=function(username , callback){
	User.findOne({ username: username }, function (err, doc){
		  callback(doc);
		});
};
exports.getUserByRole=function(callback){
	User.find({"role": "ROLE_USER" },{}, function (err, doc){
		  callback(doc);
		});
};

exports.getUserByAuthToken=function(authToken,callback){
	User.findOne({"authToken": authToken },{}, function (err, doc){
			  callback(doc);
		});
};
exports.getUserById=function(id,callback){
	User.findOne({"_id": id },{}, function (err, doc){
			  callback(doc);
		});
};

exports.createUserByAdmin=function(req, callback){
	var user1;
	var newUser = new User({
		  name: req.body.name,
		  username:req.body.username,
		  password:req.body.password ,
		  role:req.body.role,
		});
	
	
	
	User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
        }
        else{
        	console.log("User created by Admin successfully!!!");
        	callback(true);
        }
    });
};