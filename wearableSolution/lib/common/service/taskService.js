var Task = require('../models/task_model');
var Step = require('../models/step_model');
var fs = require('fs');
var imgPath = 'D:/image1.jpg';
exports.createTask=function(req,callback){
	 var task = new Task({
		  taskname:req.body.taskname,
		  description:req.body.description,
		  story:req.body.story,
		  created_at :new Date(),
		  modified_at :new Date(),
		  step : [ {
				description : req.body.descriptionStep,
				stepimage : {
					data : fs.readFileSync(req.files.taskImage.path),
					contentType : 'image/png',
				},
			}, 
			{
				description : req.body.descriptionStep2,
				stepimage : {
					data : fs.readFileSync(req.files.taskImage2.path),
					contentType : 'image/png',
				},
			}],
		});
	 
	 task.save(function(err,data) {
		  if (err) {
			  console.log('err '+err);
		  }
  
		  else{
			  console.log('task saved successfully!');
			  var newData={id:data._id,name:data.taskname};
			    callback(JSON.stringify(newData));
	        	
	        };
		});
	
	
};
exports.createTaskStep=function(taskId,description,filePath,stepNumber,callback){
	
	console.log("taskId  "+taskId);
	console.log("req.body.description "+description);
	console.log("req.files.taskimage.path  "+filePath);
    console.log("req.body.stepNumber  "+stepNumber);
	 Task.findOne({_id:taskId}, function(err, result){
		    if ( err ) {console.log('err '+err);}

		    if(!result){
		    	console.log('err '+err);
		    }
		    var stepData  = new Step({
				  description:description,
				  stepimage :{
					  data:fs.readFileSync(filePath),
					  contentType:'image/png',
				  },
				 });
		   
		    result.step=stepData;
		   
		    result.save(function(err, result){
		    	if (err) { console.log('err '+err);}
			    else{
			    console.log("created");
			    var newData={id:result._id,name:result.taskname};
			    callback(JSON.stringify(newData));}
		    });

		  });
	
	
	
};

exports.getTaskList=function(callback){
	
	Task.find({},{},function(e,data){
		 callback(data);
    });
	
	
};