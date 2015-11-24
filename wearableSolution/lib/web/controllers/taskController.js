var express=require('express');
var taskService=require('../../common/service/taskService');
var userService=require('../../common/service/userService');
//var multiparty = require('multiparty');
var fs=require('fs');
exports.getTaskPage=function(req , res){
	res.render("add_task",{step:"1",session: req.session,});
};

exports.addTask= function(req , res){
	
	console.log("reached task controller ");
	var oldImageName=req.files.taskImage.path.substring(req.files.taskImage.path.lastIndexOf("\\")+1);
	var imageName=req.body.taskName+new Date().getTime()+oldImageName.substring(oldImageName.indexOf("."));
	var imagePath=req.files.taskImage.path.substring(0,req.files.taskImage.path.lastIndexOf("\\"))+"\\"+imageName.replace( /\s/g, "");
	fs.renameSync(req.files.taskImage.path,imagePath);
	req.files.taskImage.path=imageName.replace( /\s/g, "");
	taskService.createTask(req,function(data , err){
		res.send(data);
				
	});
};

exports.addTaskStep= function(req , res){
	var oldImageName=req.files.taskImage2.path.substring(req.files.taskImage2.path.lastIndexOf("\\")+1);
	var imageName=req.body.taskName+new Date().getTime()+oldImageName.substring(oldImageName.indexOf("."));
	var imagePath=req.files.taskImage2.path.substring(0,req.files.taskImage2.path.lastIndexOf("\\"))+"\\"+imageName.replace( /\s/g, "");
	fs.renameSync(req.files.taskImage2.path,imagePath);
	req.files.taskImage2.path=imageName.replace( /\s/g, "");
	 	taskService.createTaskStep(req,function(data , err){
		 //fs.unlink(req.files.taskImage2.path);
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
	
	if(req.files.taskImage.size !== 0){
		if(fs.existsSync(req.files.taskImage.path.substring(0,req.files.taskImage.path.lastIndexOf("\\"))+"\\"+req.body.oldImage)){
			fs.unlink(req.files.taskImage.path.substring(0,req.files.taskImage.path.lastIndexOf("\\"))+"\\"+req.body.oldImage);
		}
		//fs.unlink(req.files.taskImage.path.substring(0,req.files.taskImage.path.lastIndexOf("\\"))+"\\"+req.body.oldImage);
		var oldImageName=req.files.taskImage.path.substring(req.files.taskImage.path.lastIndexOf("\\")+1);
		var imageName=req.body.taskName+new Date().getTime()+oldImageName.substring(oldImageName.indexOf("."));
		var imagePath=req.files.taskImage.path.substring(0,req.files.taskImage.path.lastIndexOf("\\"))+"\\"+imageName.replace( /\s/g, "");
		fs.renameSync(req.files.taskImage.path,imagePath);
		req.files.taskImage.path=imageName.replace( /\s/g, "");
		}
	
	
	
	taskService.editTaskById(req,function(data , err){
		
		res.send({msg:"success"});
		 
	});
	 
};
exports.editTaskStep= function(req , res){
	//var imagePath=path.join(__dirname, './public/stepimage/');
	try{
	if(req.files.taskImage2.size !== 0){
		if(fs.existsSync(req.files.taskImage2.path.substring(0,req.files.taskImage2.path.lastIndexOf("\\"))+"\\"+req.body.oldImage)){
			fs.unlink(req.files.taskImage2.path.substring(0,req.files.taskImage2.path.lastIndexOf("\\"))+"\\"+req.body.oldImage);
		}
		
		//fs.unlink(req.files.taskImage2.path.substring(0,req.files.taskImage2.path.lastIndexOf("\\"))+"\\"+req.body.oldImage);
		var oldImageName=req.files.taskImage2.path.substring(req.files.taskImage2.path.lastIndexOf("\\")+1);
		var imageName=req.body.taskName+new Date().getTime()+oldImageName.substring(oldImageName.indexOf("."));
		var imagePath=req.files.taskImage2.path.substring(0,req.files.taskImage2.path.lastIndexOf("\\"))+"\\"+imageName.replace( /\s/g, "");
		fs.renameSync(req.files.taskImage2.path,imagePath);
		req.files.taskImage2.path=imageName.replace( /\s/g, "");
		}

	taskService.editTaskStepById(req,function(data , err){
		
		res.send({msg:"success"});
		 
	});
	}catch (e) {
		console.log(e.toString());
	}
	
	 
};
exports.assignTask= function(req , res){
	var tasklist="";
	
	 taskService.assignTaskByTaskId(req,function(data , err){
	
		 res.send({msg:"success"});
		 
	});
	
};
exports.getTaskGallery= function(req , res){
	 
	 var filesName={};
	 var fileData=[];
	 if(fs.existsSync("../public/taskimage/"+req.body.taskId)){
		 fs.readdirSync("../public/taskimage/"+req.body.taskId).forEach(
					function(name) {
						fileData.push({
							"name":name,
						});
						
					});
			 filesName.file=fileData;
			 //console.log("in task gallery file json "+JSON.stringify(filesName));
			 res.render("gallery",{session: req.session,fileData:filesName,taskId:req.body.taskId});
	 }
	 else{
		 res.render("gallery",{session: req.session,fileData:"",taskId:req.body.taskId});
	 }
	 
	 
		
	
	
};