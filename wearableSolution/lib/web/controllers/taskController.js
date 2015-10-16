var express=require('express');
var taskService=require('../../common/service/taskService');
//var multiparty = require('multiparty');
var _ = require('lodash');
var fs=require('fs');

exports.getTaskPage=function(req , res){
	res.render("add_task",{step:"1",session: req.session,});
};

exports.addTask= function(req , res){
	
	console.log("reached task controller ");
	taskService.createTask(req,function(data , err){
		fs.unlink(req.files.taskImage.path);
		res.send(data);
		/*if(data.length>0){
			var task=JSON.parse(data);
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
		});
	
};
exports.getTaskDetail= function(req , res){
	 console.log(req.body.taskId);
	 taskService.getTaskDetailById(req.body.taskId,function(data , err){
		// var taskData=JSON.parse(data);
		 res.render("task_details",{task:data,session: req.session,});
		
	});
	
};
exports.getStepImage= function(req , res){
	
	 taskService.getStepImageById(req.body.taskId,function(data , err){
	 res.contentType("image/jpeg");
	 res.send(data);
	 res.end();
	});
	
};
exports.publishTask= function(req , res){
	
	 taskService.publishTaskById(req.body.taskId,function(data , err){
		 res.send(data);
		 
	});
	
};
exports.editTask= function(req , res){
		
	taskService.editTaskById(req,function(data , err){
		res.send({msg:"success"});
		 
	});
	 
};
exports.editTaskStep= function(req , res){
	
	taskService.editTaskStepById(req,function(data , err){
		res.send({msg:"success"});
		 
	});
	 
};