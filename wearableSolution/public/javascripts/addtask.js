(function() {
	
	
	$("#publishButton_id").on('click',publishData);
	
	
	
}());


function validate(){
    var taskname = $("#taskname").val();
	var description = $("#description").val();
	var story = $("#story").val();
	
     
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
    if (story == "") {
		$("#errStory").text("Story is required");
		$("#errStory").focus();
		return false;
	}
    
    var task={
    		'taskname':	taskname,
    		'description':description,
    		'story':story
    }
    
    //addTask(task);
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
	    	$('#upload').css('background-image','url('+reader.result+')');
   	 
	    	dataURL = reader.result;
	    };
	    reader.readAsDataURL(input.files[0]);
	}
 function readURL2(event) {
	    var input = event.target;
	    
	    var reader = new FileReader();
	    reader.onload = function(){
	    	$('#upload2').css('background-image','url('+reader.result+')');
	 
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
 
 /*function addTask(task){
	 
	 alert("add task"+JSON.stringify(task));
	 $.ajax({
         type: 'POST',
         data: task,
         url: '/task/addtask',
         dataType: 'JSON'
     }).done(function( response ) {

         // Check for successful (blank) response
         if (response._id != '') {
           
        	 alert(response._id);
         }
         else {

             // If something goes wrong, alert the error message that our service returned
             alert('Error: ' + response.msg);

         }
     });
	 
 }*/
 function saveStep(){
	 
 }
function addStep(){
	if($('#step').val()==="1"){
		alert("save step 1");
	}
	else{
		$('#step2').css('display','block');
		$('#plus1').css('display','none');
		/*$('#step1_content').css('display','none');
		$('#step2_content').css('display','block');*/
	}
	
 }
function addStep(){
	if($('#step').val()==="1"){
		alert("save step 1");
	}
	else{
		$('#step2').css('display','block');
		$('#plus1').css('display','none');
	}
	
 }
function validateStep(){
	return true
}
function showStepTwo(){
	$('#step1_content').css('display','none');
	$('#step2_content').css('display','block');
	$('.stepbutton2').css('background-color','#47AB47');
	$('.stepbutton2').css('font-weight','bolder');
	$('.stepbutton').css('background-color','#FF3300');
}
function showStepOne(){
	$('#step2_content').css('display','none');
	$('#step1_content').css('display','block');
	$('.stepbutton').css('background-color','#47AB47');
	$('.stepbutton').css('font-weight','bolder');
	$('.stepbutton2').css('background-color','#FF3300');
}
function publishData(){
	
	$.ajax({
        type: 'post',
        data:{taskId:$('#taskId').val()},
        url: '/task/publishTask' 
    }).done(function( response ) {
    		
    	if(response.length >0){
    		$('#publishButton_id').text("Published");
    		$('#publishButton_id').css("background-color","#ff3300");
    		//$("#publishButton_id").attr('id','published');
    		$("#publishButton_id").prop('onclick',null).off('click');
    	}
    	else{
    		alert("not published");
    	}
    });
}