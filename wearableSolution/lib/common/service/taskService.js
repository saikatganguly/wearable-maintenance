var Task = require('../models/task_model');
var fs = require('fs');
var imgPath = 'D:/image1.jpg';
exports.createTask=function(req,callback){
	console.log('create task dao');
	 var task = new Task({
		  taskname:req.body.taskName,
		  description:req.body.description,
		  story:req.body.story,
		  status:"Not published",
		  created_at :new Date(),
		  modified_at :new Date(),
		  step : [ {
				description : req.body.descriptionStep,
				stepimage : req.files.taskImage.path,
			}, 
			],
		});
	 
	 task.save(function(err,data) {
		  if (err) {
			  console.log('err '+err);
		  }
  
		  else{
			  console.log('task saved successfully!');
			  var newData={taskId:data._id,taskName:data.taskname};
			    callback(JSON.stringify(newData));
	        	
	        }
		});
	
	
};
exports.createTaskStep=function(req,callback){
	
	
		 Task.findOne({_id:req.body.taskId}, function(err, result){
		    if ( err ) {console.log('err '+err);}

		    if(!result){
		    	console.log('err '+err);
		    }
		    var step2={description : req.body.descriptionStep2,
					stepimage : req.files.taskImage2.path};
		   
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

exports.getPublishedTaskList=function(callback){
	
	Task.find({"status":"Published"},{},function(e,data){
		 callback(data);
    });
	
	
};
exports.getTaskDetailById=function(taskId,callback){
	 Task.findOne({_id:taskId}, function(err, result){
		    if ( err ) {console.log('err '+err);}

		    if(!result){
		    	console.log('err '+err);
		    }
		    //console.log(JSON.stringify(result));
		    callback(result);
		  
		  });
	
};

exports.getStepImageById=function(taskId,callback){
	
	 Task.findOne({_id:taskId}, function(err, result){
		    if ( err ) {console.log('err '+err);}

		    if(!result){
		    	console.log('err '+err);
		    }
		   
			var taskData={
					   stepImage1:result.step[0].stepimage,
					   stepImage2:result.step[1].stepimage
					   
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
		   
		    result.status="Published";
	    	result.save(function(err, result){
		    	if (err) { console.log('err '+err);}
			    else{
			    
			    callback(result._id);}
		    });
		  });
	
};
exports.editTaskById=function(req,callback){
	
	
	 Task.findOne({_id:req.body.taskId}, function(err, result){
		    if ( err ) {console.log('err '+err);}
		    
		    if(!result){
		    	console.log('err '+err);
		    }
		    
		    result.taskname=req.body.taskName;
		    result.description=req.body.description;
		    result.story=req.body.story;
		    result.modified_at =new Date();
		    result.step[0].description=req.body.descriptionStep;
		   // console.log(req.files.length);
		    if(req.files.taskImage.size !== 0){
		    	result.step[0].stepimage=req.files.taskImage.path;
		    }
				 /* step : [ {
						description : req.body.descriptionStep,
						stepimage : {
							data : fs.readFileSync(req.files.taskImage.path),
							contentType : 'image/png',
						},
					}, 
					],
				}*/
		    //result.status="published";
	    	result.save(function(err, result){
		    	if (err) { console.log('err '+err);}
			    else{
			    
			    callback(result._id);}
		    });
		  });
	
};
exports.editTaskStepById=function(req,callback){

	 Task.findOne({_id:req.body.taskId}, function(err, result){
		    if ( err ) {console.log('err '+err);}
		    
		    if(!result){
		    	console.log('err '+err);
		    }
		    
		    result.modified_at =new Date();
		    result.step[req.body.step-1].description=req.body.descriptionStep2;
		   // console.log(req.files.length);
		    if(req.files.taskImage2.size !== 0){
		    	result.step[req.body.step-1].stepimage=req.files.taskImage2.path;
		    }
				
	    	result.save(function(err, result){
		    	if (err) { console.log('err '+err);}
			    else{
			    
			    callback(result._id);}
		    });
		  });
	
};
exports.assignTaskByTaskId=function(req,callback){
	
	
	 Task.findOne({_id:req.body.taskId}, function(err, result){
		    if ( err ) {console.log('err '+err);}
		    
		    if(!result){
		    	console.log('err '+err);
		    }
		    result.status="Assigned";
		    result.assigne=req.body.userId;
	    	result.save(function(err, result){
		    	if (err) { console.log('err '+err);}
			    else{
			    
			    callback(result._id);}
		    });
		  });
	
};
exports.getTaskListByUserId=function(id,callback){
	
	Task.find({assigne:id},{},function(e,data){
		 callback(data);
    });
	
	
};

exports.changeStatusByTaskId=function(req,callback){
	
	Task.findOne({_id:req.taskid},{},function(err,data){
		if ( err ) {console.log('err '+err);}
	    
	    if(!data){
	    	console.log('err '+err);
	    }
	    data.status=req.status;
	    data.modified_at =new Date();
	    data.save(function(err, result){
	    	if (err) { console.log('err '+err);}
		    else{
		    
		    callback(result._id);}
	    });
    });
	
	
};