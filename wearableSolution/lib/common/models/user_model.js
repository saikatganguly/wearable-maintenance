/**
 * User Model
 */

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require("bcrypt");
var crypto=require("crypto");
var SALT_WORK_FACTOR = 10;
// create a schema
var User = new Schema({
	name : String,
	username : {
		type : String,
		required : true,
		unique : true
	},
	password : String,
	admin : Boolean,
	accesscode : String,
	key : String,
	authToken : String,
	meta : {
		age : Number
	},
	created_at : Date,
	updated_at : Date
});

User.plugin(passportLocalMongoose);

// on every save, add the date
User.pre('save', function(next) {
	var user = this;
	console.log("User found : "+user);
	// get the current date
	var currentDate = new Date();

	// change the updated_at field to current date
	this.updated_at = currentDate;

	// if created_at doesn't exist, add to that field
	if (!this.created_at) {
		this.created_at = currentDate;

	}

	if (!this.isModified('password')) {
		console.log("not modified");
		return next();
	}
	console.log("getting salt value");
	var salt = crypto.randomBytes(128).toString('base64');
	  /*crypto.pbkdf2(user.password, salt, 10000, 512, function(err, derivedKey) {
		  if(err){
			  console.log("Err : "+err);
		  }
		  user.password = derivedKey;
	    user.salt=salt;
	    user.key=salt;
	    user.hash=derivedKey;
	    next();
	  });*/
	/*bcrypt.hash(user.password, salt,function(err, hash) {
		if (err) {
			console.log(hash);
			console.log("inside hashing ================"+err);
			return next(err);
		}
		console.log("Password========================="+hash);
		user.password = hash;
		user.salt=salt;
		user.hash=hash;
		next();
	});*/
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		console.log("Creting salt value 1st");
		if (err) {
			console.log("Error 1 : ================"+err);
			return next(err);
		}
		console.log("salt generated : "+salt);
		console.log("password found : "+user.password);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) {
				console.log(hash);
				console.log("inside hashing ================"+err);
				return next(err);
			}
			console.log("Password========================="+hash);
			user.password = hash;
			user.salt=salt;
			user.key=salt;
			user.hash=hash;
			next();
		});
	});
	 
	//next();
});

// Password verification
User.methods.comparePassword = function(candidatePassword , salt , passwordToMatch , cb) {
	/*var encryptedPassword="";
	console.log("password : "+passwordToMatch+" salt : "+salt);
	crypto.pbkdf2(candidatePassword, salt, 10000, 512, function(err, derivedKey) {
		encryptedPassword = derivedKey;
		console.log("=====Key : "+derivedKey);
	   if(encryptedPassword===passwordToMatch){
		   console.log("Inside cb : true");
		   cb(true);
	   }
	   else{
		   console.log("Inside cb : false");
		   cb(false);
	   }
	  });*/
	bcrypt.compare(candidatePassword, passwordToMatch, function(err, isMatch) {
		console.log("candidatePassword==="+candidatePassword);
		console.log("this.password==="+passwordToMatch);
		if (err) {
			cb(false);
		} else {
			console.log("isMatch" + isMatch);
			cb(isMatch);
		}

	});
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', User);

// make this available to our users in our Node applications
module.exports = User;
