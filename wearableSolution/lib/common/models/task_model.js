/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Step = require('../models/step_model');
var taskSchema = new Schema({
	taskname :{
		type : String,
		required : true,
		unique : true
	},
	description:String,
	created_at : Date,
	modified_at : Date,
	assigne: String,
	status:String,
	step:[{
		type: Schema.ObjectId, 
		ref: 'Step' }]
});

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Step = require('../models/step_model');
var taskSchema = new Schema({
	taskname :{
		type : String,
		required : true,
		unique : true
	},
	description:String,
	created_at : Date,
	modified_at : Date,
	assigne: String,
	status:String,
	step:[{stepimage: { data: Buffer, contentType: String },
	  	description:String} ]
});

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;


