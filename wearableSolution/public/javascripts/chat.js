var socket = io();
var dataURL="";
var interval="";
$(document).ready(function(){
	 	  socket.emit('broadcastMessage', 'System',authToken, taskid);
	});
function stopBlink(event){
	/*if($(event).scrollTop() >= ($(event)[0].scrollHeight - $(event).outerHeight())) 
    {
		clearInterval(interval);
		$("#message_icon").css("color","black");
    }*/
	
	
	
}

function keyPress(e){
	var key=e.keyCode || e.which;
	if(key == 13){
    	submitfunction();
    }
}
function submitfunction(){
	var messageText=$('#btn-input').val();
	 if(messageText != '') {
		  socket.emit('chatMessage', {from:"System", message:messageText,to:"",taskId:taskid,authToken:authToken});
		  var htmlString="<div class=\"row msg_container base_sent\" onfocus=\"stopBlink()\">"+
			"<div class=\"col-md-10 col-xs-10\">"+
			"<div class=\"messages msg_sent\">"+
				"<p>"+messageText+"</p>"+
				
				"<time datetime=\"2009-11-13T20:00\">Timothy • 51 min</time>"+
			"</div>"+
		"</div>"+
		"<div class=\"col-md-2 col-xs-2 avatar\">"+
			"<img src=\"http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg\" class=\" img-responsive \"></div>"+
		"</div>";
			$('#messages_div').append(htmlString);
	  }
	 var element = document.getElementById("messages_div");
 	element.scrollTop = element.scrollHeight;
	 $('#btn-input').val("");
	  
	}
socket.on('chatMessage', function(from, msg){
	console.log(msg);
	/*var me = $('#user').val();
	var color = (from == me) ? 'green' : '#009afd';
	var from = (from == me) ? 'Me' : from;
	$('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');*/
	var htmlString="<div class=\"row msg_container base_receive\" onfocus=\"stopBlink()\">"+
	"<div class=\"col-md-2 col-xs-2 avatar\">"+
	"<img src=\"http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg\" class=\" img-responsive \"></div>"+
	"<div class=\"col-md-10 col-xs-10\">"+
	"<div class=\"messages msg_receive\">"+
		"<p>"+msg+"</p>"+
		
		"<time datetime=\"2009-11-13T20:00\">Timothy • 51 min</time>"+
	"</div>"+
"</div>"+

"</div>";
	$('#messages_div').append(htmlString);
	var element = document.getElementById("messages_div");
	element.scrollTop = element.scrollHeight;
	 if ($('#minim_chat_window').hasClass('panel-collapsed')) {
		 clearInterval(interval);
		 interval=setInterval(function(){blink()}, 1000);
			
			function blink() {
				$("#message_icon").css("color","#47ab47");
			    $("#message_icon").fadeTo(100, 0.1).fadeTo(200, 1.0);
			}
	 }
	

});

socket.on('broadcastMessage', function(from, msg,client){
	
	  var color = (from == name) ? 'green' : '#009afd';
	  var from = (from == name) ? 'Me' : from;
	  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
 });

socket.on('image', function(from, img,stepNumber){
	 /* var me = $('#user').val();
	  var color = (from == name) ? 'green' : '#009afd';
	  var from = (from == name) ? 'Me' : from;*/
	
	 $('#upload_active').css("background-image","url('data:image/jpeg;base64,"+img+"')");
	/*if(stepNumber===1){ $('#upload').css("background-image","url('data:image/jpeg;base64,"+img+"')");
	console.log("image got!!!!!! for step "+stepNumber);}
	else{$('#upload'+stepNumber).css("background-image","url('data:image/jpeg;base64,"+img+"')");*/
	console.log("image got!!!!!! for step "+stepNumber);/*}*/
	  //$('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: <div style="height:100px; width: 100px;background-size:100% 100% ;background-image:url(\'data:image/jpeg;base64,'+img+'\')"></div> </li>');
	});
/*socket.on('image', function(from, img,stepNumber){


	if(stepNumber===1){ 
		var htmlString="<div class=\"row\"><div class=\"col-md-9\" style=\"margin-top:1%\">"+
		"<div class=\"upload-image\">"+
		"<div id=\"uploadDiv\" class=\"toolbarItemBox\" title=\"Upload Image\" style=\"overflow: hidden; position: relative;\">"+
		"<div class=\"upload\" id=\"upload"+stepNumber+"\" class=\"toolbarItemIcon\" style=\"background-image:url('data:image/jpeg;base64,"+img+"')\" ></div>"+
		"</div></div></div></div>"
		;
		$('#image_content_1').append(htmlString);
		
	}
	else{var htmlString="<div class=\"row\"> <div class=\"col-md-9\" style=\"margin-top:1%\" >"+
		"<div class=\"upload-image\">"+
		"<div id=\"uploadDiv\" class=\"toolbarItemBox\" title=\"Upload Image\" style=\"overflow: hidden; position: relative;\">"+
		"<div class=\"upload\" id=\"upload"+stepNumber+"\" class=\"toolbarItemIcon\" style=\"background-image:url('data:image/jpeg;base64,"+img+"')\" ></div>"+
		"</div></div></div></div>"
		;
		$('#image_content_'+stepNumber).append(htmlString);}
	  //$('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: <div style="height:100px; width: 100px;background-size:100% 100% ;background-image:url(\'data:image/jpeg;base64,'+img+'\')"></div> </li>');
	});*/
 
socket.on('notifyUser', function(user){
	var me = $('#user').val();
	if(user != me) {
	   $('#notifyUser').text(user + ' is typing ...');
	}
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);
});
 
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function showStep(stepNum){
	
	$('*[id*="step_content_"]').css('display','none');
	$('#step_content_'+stepNum).css('display','block');
	$('*[id*="stepbutton_"]').css('background-color','#FF3300');
	$('#stepbutton_'+stepNum).css('background-color','#47AB47');
	
}
function showGallery(){
	$('#task_Id').val($('#taskId').val());
	$('#show-task-gallery').submit();
}
