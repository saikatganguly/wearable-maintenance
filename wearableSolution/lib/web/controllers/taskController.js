var express=require('express');
var taskService=require('../../common/service/taskService');
//var multiparty = require('multiparty');
var _ = require('lodash');
var fs=require('fs');

//var multipartMiddleware = multipart({uploadDir: TMP_UPLOAD_DIR});
//var form = require('connect-form');
exports.getTaskPage=function(req , res){
	res.render("add_task");
};

exports.addTask= function(req , res){
	
	console.log("reached task controller body"+JSON.stringify(req.body));
	console.log("reached task controller file"+JSON.stringify(req.files));
	
	taskService.createTask(req,function(data , err){
		res.send({msg:"success"});
		/*if(data.length>0){
			var task=JSON.parse(data);
			console.log(task);
			
					 
					res.render("add_steps", {session: req.session,"taskId":task._id,"taskname":task.taskname,"stepNumber":"1",});
		}	*/
		
	});
	
		
	
	
};
exports.addTaskStep= function(req , res){
		
	taskService.createTaskStep(req.body.taskId,req.body.description,req.files.taskImage.path,req.body.stepNumber,function(data , err){
		 console.log("after callback ");
		  var task=JSON.parse(data);
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
			
				
				
			}
			
		});
	
	
	
	
};
