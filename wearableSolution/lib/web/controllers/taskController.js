var express=require('express');
var taskService=require('../../common/service/taskService');
//var multiparty = require('multiparty');
var _ = require('lodash');
var fs=require('fs');

//var multipartMiddleware = multipart({uploadDir: TMP_UPLOAD_DIR});
//var form = require('connect-form');
exports.getTaskPage=function(req , res){
	res.render("add_task",{step:"1"});
};

exports.addTask= function(req , res){
	
	console.log("reached task controller ");
	taskService.createTask(req,function(data , err){
		fs.unlink(req.files.taskImage.path);
		res.send(data);
		/*if(data.length>0){
			var task=JSON.parse(data);
			console.log(task);
			
					 
					res.render("add_steps", {session: req.session,"taskId":task._id,"taskname":task.taskname,"stepNumber":"1",});
		}	*/
		
	});
	
		
	
	
};
exports.addTaskStep= function(req , res){
	console.log("reached add task step controller ");
	taskService.createTaskStep(req,function(data , err){
		 console.log("after callback ");
		 fs.unlink(req.files.taskImage2.path);
		 res.send({msg:"success"});
		 /* var task=JSON.parse(data);
			if(data.length>0){
				
				if(req.body.stepNumber == 1){
					
					res.send({msg:"success"});
					}
				else{
					taskService.getTaskList(function(data,err){
						if(data.length>0){
							
							res.redirect('/home')
							
						}
					});
					
				}
			
				
				
			}*/
			
		});
	
	
	
	
};
