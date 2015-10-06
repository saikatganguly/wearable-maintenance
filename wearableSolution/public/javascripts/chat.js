var socket = io();
var dataURL="";
$(document).ready(function(){
	 	  socket.emit('broadcastMessage', 'System',name, '<b>' + name + '</b> has joined the discussion');
	});
socket.on('chatMessage', function(from, msg,users){
	var me = $('#user').val();
	var color = (from == me) ? 'green' : '#009afd';
	var from = (from == me) ? 'Me' : from;
	$('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

socket.on('broadcastMessage', function(from, msg,client){
	
	  var color = (from == name) ? 'green' : '#009afd';
	  var from = (from == name) ? 'Me' : from;
	  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
 });

socket.on('image', function(from, img){
	  var me = $('#user').val();
	  var color = (from == name) ? 'green' : '#009afd';
	  var from = (from == name) ? 'Me' : from;
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
