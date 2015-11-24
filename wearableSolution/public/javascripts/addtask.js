(function() {

	$("#publishButton_id").on('click',publishData);
	
}());

var status="notSaved";
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
 function readURL2(event,step) {
	    var input = event.target;
	    
	    var reader = new FileReader();
	    reader.onload = function(){
	    	$('#upload'+step).css('background-image','url('+reader.result+')');
	 
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
 
 
 
function addStep(){
	
	if($("#status").val() ==="notSaved"){
		$('#alert_title').text('Alert Message');
		 $('#model_content').text('Save step before proceed');
		 $("#myModal2").modal('show');
	}
	else{
		var htmlStringStepButton="<div class=\"row\" id=\"step"+$('#step').val()+"\" style=\"\" >"+
		"<div class=\"col-md-offset-2 col-md-10\" >"+
		"<button id=\"stepbutton_"+$('#step').val()+"\" class=\"btn btn-second stepbutton2\" onclick=\"showStep('"+$('#step').val()+"')\" style = \"margin-left:2%\" type=\"button\"><b> Step "+$('#step').val()+"</b></button>"+
		"<img id=\"plus"+$('#step').val()+"\" src=\"../images/plus.png\" onclick=\"addStep()\">"+
		"</div></div>";
		
		$('#step_div').append(htmlStringStepButton);
		$('#status').val("notSaved");
		
		var htmlStringStepContent="<div class=\"col-md-9\" id=\"step_content_"+$('#step').val()+"\" style=\"display:none\" >"+
		"<form action=\"\" class=\"js-form-step-"+$('#step').val()+"\"  onsubmit=\"return validate()\"  method=\"post\" enctype=\"multipart/form-data\">"+
		"<input type=\"hidden\" class=\"taskId\" name=\"taskId\"  value=''>"+
		"<input type=\"hidden\" name=\"taskName\"  value=''>"+
			"<div class=\"row\">"+
				"<div class=\"col-md-9\" >"+
						"<div class=\"upload-image\">"+
						"<div id=\"uploadDiv\" class=\"toolbarItemBox\" title=\"Upload Image\" style=\"overflow: hidden; position: relative;\">"+
							"<div class=\"upload\" id=\"upload"+$('#step').val()+"\" class=\"toolbarItemIcon\" ></div>"+
							"<input class=\"fileToUpload\" id=\"taskImage"+$('#step').val()+"\" type=\"file\" accept=\"image/jpg,image/jpeg,image/png,image/gif,image/bmp,image/tiff\" style=\"\" name=\"taskImage2\" onchange=\"readURL2(event,'"+$('#step').val()+"');\" onfocus=\"removeMessage('errStepImage_"+$('#step').val()+"');\">"+
						"</div>"+
						"<label style=\"color:red;\" id=\"errStepImage_"+$('#step').val()+"\"></label>"+
					"</div>"+
				"</div>"+
			"</div>"+
			"<div class=\"row\" style=\"margin-top:2%\">"+
				"<div class=\"col-md-9\" >"+
					"<textarea id=\"descriptionStep"+$('#step').val()+"\" name=\"descriptionStep2\" class=\"descriptionText\" type=\"text\" placeholder=\"Step Description\" tabindex=\"4\" onfocus=\"removeMessage('errDescriptionStep_"+$('#step').val()+"');\" autocomplete=\"off\" style=\"resize: none;\"></textarea>"+
					"<label style=\"color:red;\" id=\"errDescriptionStep_"+$('#step').val()+"\"></label>"+
				"</div>"+
			"</div>"+
			"<div class=\"row\" style=\"margin-top:1%;margin-bottom:5px\">"+
		    	"<div class=\"col-md-offset-7 col-md-2\">"+
					"<button id=\"submit\" class=\"btn btn-second tasksubmit js-submit-ajax-step-"+$('#step').val()+"\" onclick=\"ajaxSubmit("+$('#step').val()+")\" type=\"button\">"+
					"<b> Submit</b></button>"+
				"</div>"+
			"</div>"+
			"</form>"+
		"</div>";
		
		$('#step_content').append(htmlStringStepContent);
		$('#step2').css('display','block');
		var previousStepNumber=parseInt($('#step').val())-1;
		$('#plus'+previousStepNumber).css('display','none');
		
		}
	
 }

function validateStep(){
	return true
}

function showStep(stepNum){
	
	$('*[id*="step_content_"]').css('display','none');
	$('#step_content_'+stepNum).css('display','block');
	$('*[id*="stepbutton_"]').css('background-color','#FF3300');
	$('#stepbutton_'+stepNum).css('background-color','#47AB47');
	
}

function publishData(){
	
	$.ajax({
        type: 'post',
        data:{taskId:$('#taskId').val()},
        url: '/task/publishtask' 
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
function closeModel(){
	$("#myModal2").modal('hide');
}