/**
 * New node file
 */
var express=require('express');
var taskService=require('../../common/service/taskService');

exports.getTask=function(req , res){
	taskService.getTaskList(function(data,err){
		if(data.length>0){
			res.json({tasklist:data});
		}
		else{
			res.json({tasklist:"No task assign enjoy!!"});
		}
	});
	
};