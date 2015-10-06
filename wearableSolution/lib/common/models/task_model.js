var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var taskSchema = new Schema({
	taskname :{
		type : String,
		required : true,
		unique : true
	},
	taskimage: { data: Buffer, contentType: String },
	description:String,
	created_at : Date,
	modified_at : Date
});

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;

