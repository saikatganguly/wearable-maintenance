


function validate(){
    var taskname = $("#taskname").val();
	var description = $("#description").val();
	
     
    if (taskname == "") {
		$("#errTaskName").text("Task Name is required. ");
		$("#errTaskName").focus();
		return false;
	}
    
   
    if (description == "") {
		$("#errDescription").text("Description is required");
		$("#errDescription").focus();
		return false;
	}
    
    return true;
 }
 
 function removeMessage(id){
	
	$("#"+id).text("");
}

 function addImage() {
		var addimage = $('#addimage');
		$('<input type="file" id="fileToUpload" class="fileToUpload" onchange="readURL(event);" name="taskImage" accept="image/*" style="display: none;" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp,image/tiff">'
	).appendTo(addimage); 
		$('#fileToUpload').click();
	}
 function readURL(event) {
	    var input = event.target;
	    
	    var reader = new FileReader();
	    reader.onload = function(){
	    	$('<div class="form-group" id="uploadupper" style="float:left;width:75px;">'+
	    		'<div id="upload" class="upload" style="overflow:hidden; margin-left: 7px;position:relative;z-index:1;"><div class="close" style="color:blue;background-color:black;height:22px;width:20%;float:right;cursor: pointer; " onclick="removeImage();"><h4 style="color:white;font-weight:bolder;margin-top:2px">X</h4></div>'+ 
	    		'</div>').appendTo(addimage); 
	    	$('#upload').css('background-image','url('+reader.result+')');
      	 
	    dataURL = reader.result;
	    };
	    reader.readAsDataURL(input.files[0]);
	}
 
 function removeImage(){
		$("#upload").fadeOut("normal", function() {
	        $("#upload").remove();
	        $("#fileToUpload").remove();
	        $("#logotype").remove();
	        $("#uploadupper").remove();
	        $("#upload").css("background-image", null);  
	        
	    });
	    
	    
}