var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var stepSchema = new Schema({
	stepimage: { data: Buffer, contentType: String },
	description:String,
	
});

var Step = mongoose.model('Step', stepSchema);
module.exports = Step;
