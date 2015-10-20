/**
 * User Service
 */

var User = require('../models/user_model');

exports.getUserById= function(id , callback){
	callback(id+123 , null);
}

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

exports.activateUser=function (authToken , activationCode , callback){
	User.findOne({ authToken: authToken }, function (err, doc){
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