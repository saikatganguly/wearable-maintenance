var socket = io();
var dataURL="";

$(document).ready(function(){
	  /*var name = makeid();
	  $('#user').val(name);*/
	  socket.emit('broadcastMessage', 'System','test','test', '<b>' + name + '</b> has joined the discussion');
	});
$(document).on("keypress", ".usernameInput", function(e) {
    if (e.which == 13) {
    	var name=$('.usernameInput').val();
    	$('#user').val(name);
    	$('#back_window').css('display','none');
    	$('#popup').css('display','none');
    	 socket.emit('broadcastMessage', 'System',name, '<b>' + name + '</b> has joined the discussion');
    }
});
function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  var to = $('#active_user_chat').val();
  
  if(message != '') {
	  socket.emit('chatMessage', {from:"Android", message:message,to:to,taskId:'564b036edc7226081e74229f',authToken:'saikat27sg27'});
	  $('#messages').append('<li><b style="color:green"> Me </b>: ' + message + '</li>');
  }
  $('#m').val('').focus();
  return false;
}

function submitImage(){
	var from = $('#user').val();
	var to = $('#active_user_image').val();
	if(dataURL != '') {
		  $('#messages').append('<li><b style="color:green"> Me </b>: <div style="height:100px; width: 100px;background-size:100% 100% ;background-image:url(\''+dataURL+'\')"></div> </li>');
		  dataURL=dataURL.split(',')[1];
		  socket.emit('image', { image: true, buffer: dataURL,from:'Mobile',authToken:'Vijeshqwe',taskId:'56320b8a6e03c51018ae5f55',stepNumber:"2", });
	}
	dataURL="";
    return false;
}
var readURL = function(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
    dataURL = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
  };

function notifyTyping() {
	var user = $('#user').val();
	socket.emit('notifyUser', user);
}
 
socket.on('chatMessage', function(from, msg,users){
	var me = $('#user').val();
	var color = (from == me) ? 'green' : '#009afd';
	var from = (from == me) ? 'Me' : from;
	$('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

socket.on('broadcastMessage', function(from, msg,client){
	var me = $('#user').val();
	selectImage = document.getElementById('active_user_image');
	selectChat = document.getElementById('active_user_chat');
	//console.log("client.length"+client.length);
	if(client.length>0){
		if(client.length!=1 ){
			  document.getElementById("active_user_chat").innerHTML = "";
			  document.getElementById("active_user_image").innerHTML = "";  
		  }
		if(client.length ==1 && me == client[0] ){
			document.getElementById("active_user_chat").innerHTML = "";
			document.getElementById("active_user_image").innerHTML = ""; 
			var opt = document.createElement('option');
		    opt.value = "";
		    opt.innerHTML = "None";
		    selectChat.appendChild(opt);
		    var opt1 = document.createElement('option');
		    opt1.value = "";
		    opt1.innerHTML = "None";
		    selectImage.appendChild(opt1);
		}
		for(var i=0;i<client.length;i++){
			if(client[i] != null)
			if(me != client[i] ){
				var opt = document.createElement('option');
			    opt.value = client[i];
			    opt.innerHTML = client[i];
			    selectChat.appendChild(opt);
			    var opt1 = document.createElement('option');
			    opt1.value = client[i];
			    opt1.innerHTML = client[i];
			    selectImage.appendChild(opt1);
			}
		 }
	  }
	  var color = (from == me) ? 'green' : '#009afd';
	  var from = (from == me) ? 'Me' : from;
	  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
 });

socket.on('image', function(from, img){
	  var me = $('#user').val();
	  var color = (from == me) ? 'green' : '#009afd';
	  var from = (from == me) ? 'Me' : from;
	  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: <div style="height:100px; width: 100px;background-size:100% 100% ;background-image:url(\'data:image/jpeg;base64,'+img+'\')"></div> </li>');
	});
 
socket.on('notifyUser', function(user){
	var me = $('#user').val();
	if(user != me) {
	   $('#notifyUser').text(user + ' is typing ...');
	}
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
});
 
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
