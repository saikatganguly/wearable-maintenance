var Task = require('../models/task_model');
var fs = require('fs');
var imgPath = 'D:/image1.jpg';
exports.createTask=function(taskname,description,filePath,callback){
	//console.log("files json"+JSON.stringify(files));
	 var task = new Task({
		  taskname:taskname,
		  description:description,
		  created_at :new Date(),
		  modified_at :new Date()
	  });
	 task.taskimage.data= fs.readFileSync(filePath);
	 task.taskimage.contentType = 'image/png';
	 task.save(function(err) {
		  if (err) {
			  console.log('err '+err);
		  }
  
		  else{
			  console.log('task saved successfully!');
	        	callback(taskname);
	        }
		});
	
	
}

exports.getTaskList=function(callback){
	
	Task.find({},{},function(e,data){
		 callback(data);
    });
	
	
}