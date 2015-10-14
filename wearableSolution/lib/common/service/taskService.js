var Task = require('../models/task_model');
var Step = require('../models/step_model');
var fs = require('fs');
var imgPath = 'D:/image1.jpg';
exports.createTask=function(req,callback){
	console.log('create task dao');
	 var task = new Task({
		  taskname:req.body.taskName,
		  description:req.body.description,
		  story:req.body.story,
		  status:"publish",
		  created_at :new Date(),
		  modified_at :new Date(),
		  step : [ {
				description : req.body.descriptionStep,
				stepimage : {
					data : fs.readFileSync(req.files.taskImage.path),
					contentType : 'image/png',
				},
			}, 
			],
		});
	 
	 task.save(function(err,data) {
		  if (err) {
			  console.log('err '+err);
		  }
  
		  else{
			  console.log('task saved successfully!');
			  var newData={taskId:data._id,taskName:data.taskname,step:"2"};
			    callback(JSON.stringify(newData));
	        	
	        };
		});
	
	
};
exports.createTaskStep=function(req,callback){
	
	var step2={description : req.body.descriptionStep2,
			stepimage : {
				data : fs.readFileSync(req.files.taskImage2.path),
				contentType : 'image/png',
			},};
	/*Task.findByIdAndUpdate(req.body.taskId,
			         {$push: { step: step2 }},{upsert:true}, function(err, data) { 
			        	 if (err) {
			   			  console.log('err '+err);
			   		  }
			     
			   		  else{
			        	 console.log("step save successfully");}
			});*/
		 Task.findOne({_id:req.body.taskId}, function(err, result){
		    if ( err ) {console.log('err '+err);}

		    if(!result){
		    	console.log('err '+err);
		    }
		    var step2={description : req.body.descriptionStep2,
					stepimage : {
						data : fs.readFileSync(req.files.taskImage2.path),
						contentType : 'image/png',
					},};
		   
		    result.step.push(step2);
		   
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
exports.getTaskDetailById=function(taskId,callback){
	 Task.findOne({_id:taskId}, function(err, result){
		    if ( err ) {console.log('err '+err);}

		    if(!result){
		    	console.log('err '+err);
		    }
		   var taskData={
				   _id:result._id,
				   taskname:result.taskname,
					  description:result.description,
					  status:result.status,
					  story:result.story,
					  descriptionStep:result.step[0].description,
					  descriptionStep2:result.step[1].description,					 
					  
				   
		   };
		   // console.log(JSON.stringify(result));
		    callback(taskData);
		  
		  });
	
};

exports.getStepImageById=function(taskId,callback){
	
	 Task.findOne({_id:taskId}, function(err, result){
		    if ( err ) {console.log('err '+err);}

		    if(!result){
		    	console.log('err '+err);
		    }
		   
			var taskData={
					   stepImage1:result.step[0].stepimage.data.toString('base64'),
					   stepImage2:result.step[1].stepimage.data.toString('base64')
					   
			};
		    callback(taskData);
		  
		  });
	
};

exports.publishTaskById=function(taskId,callback){
	
	
	 Task.findOne({_id:taskId}, function(err, result){
		    if ( err ) {console.log('err '+err);}
		    
		    if(!result){
		    	console.log('err '+err);
		    }
		   
		    result.status="published";
	    	result.save(function(err, result){
		    	if (err) { console.log('err '+err);}
			    else{
			    
			    callback(result._id);}
		    });
		  });
	
};
	