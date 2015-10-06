var express=require('express');
var taskService=require('../../common/service/taskService');
var multiparty = require('multiparty');

//var form = require('connect-form');
exports.getTaskPage=function(req , res){
	res.render("add_task");
};

exports.addTask= function(req , res){
	var filePath="";
	console.log("reached task controller");
	
	var form = new multiparty.Form();

	  /*form.on('error', function (err) {
	    console.log('Error parsing form: ' + err.stack);
	  });

	  form.on('part', function (part) {
	    if (!part.filename)
	        return;
	    size = part.byteCount;
	    console.log('size : '+ size);
	    file_name = part.filename;
	  });*/

	  form.on('file', function (name, file) {
		  filePath = file.path;
	    console.log('filePath : '+ filePath);
	   
	  });

	  

	  form.parse(req, function(err, fields, files) {
		  taskService.createTask(fields.taskname,fields.description,filePath,function(data , err){
				
				if(data.length>0){
					var taskName=data;
					taskService.getTaskList(function(data,err){
						if(data.length>0){
							res.render("home", {session: req.session,"taskname":taskName,tasklist:data});
						}
					});
					
				}
				
			});
			
		});
		
	
	
};
