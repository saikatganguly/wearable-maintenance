/**
 * New node file
 */
var express=require('express');
var taskService=require('../../common/service/taskService');

exports.getTask=function(req , res){
	
	taskService.getTaskListByUserId(req.userId,function(data,err){
		if(data.length>0){
			var tasklist=[];
			for(var i=0;i<data.length;i++){
				var stepData=[];
				for(var j=0;j<data[i].step.length;j++){
					stepData.push({
						_id:data[i].step[j]._id,
						description:data[i].step[j].description,
						stepimage:"http://172.16.0.113:3000/stepimage/"+data[i].step[j].stepimage,
					});
				}if(data[i].status==="Assigned"){
					tasklist.push({
					 	  _id:data[i]._id,
					 	  taskname:data[i].taskname,
						  description:data[i].description,
						  status:"Not started",
						  story:data[i].story,
						  steps:stepData,
						  					 
				});	
				}
				else{
					tasklist.push({
					 	  _id:data[i]._id,
					 	  taskname:data[i].taskname,
						  description:data[i].description,
						  status:data[i].status,
						  story:data[i].story,
						  steps:stepData,
						  					 
				});
					
				}
				
				
				
				//tasklist.push(step);
			}
			res.json({tasklist:tasklist,
				message:"success",
				status:"200"});
		}
		else{
			res.json({tasklist:[],
				message:"No task",
				status:"200"});
		}
	});
	
};

exports.changeTaskStatus=function(req , res){
	console.log("-- change status body ---"+JSON.stringify(req.body));
	taskService.changeStatusByTaskId(req.body,function(data,err){
		if (err) { 
			res.json({
				message:"ERROR",
				status:"401"});
			
		}
		if(!data){
			res.json({
				message:"Task Not Found",
				status:"404"});
		}
		else{
			if(req.body.status=="Running" ){
				res.json({
					message:"Running",
					status:"200"});
			}
			else{
				res.json({
					message:"Finished",
					status:"200"});
			}
			
			
		}
		
		
	});
	
	
};