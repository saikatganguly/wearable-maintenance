(function() {
	//getStepOneData();
	$("#publishButton_id").on('click',publishData);
		
	
}());

var stepNumber=1;
(function() {
 
  var $form = $('.js-form');
   
}());
function getFormDataObjectStep(step) {
	var $formStep = $('.js-form-step-'+step);
    var formEl = $formStep[0];
    formEl.elements["step"].value= step;
    var formData = new FormData(formEl);
    return formData;
  }

function ajaxSubmit(step){
	
	var descriptionStep = $("#descriptionStep"+step).val();
    if (taskImage == "") {
		$("#errStepImage_"+step).text("Step Image is required. ");
		$("#errStepImage_"+step).focus();
		return false;
	}
    if (descriptionStep == "") {
		$("#errDescriptionStep_"+step).text("Step description is required. ");
		$("#errDescriptionStep_"+step).focus();
		return false;
	}
	 var formData = getFormDataObjectStep(step);
	 
	    var xhr = $.ajax({
	      url: '/task/edittaskstep',
	      type: 'POST',
	      data: formData,
	      contentType: false,
	      processData: false
	    })
	    .done(function( response ) {
	        if (response.msg=="success") {
	        	$('#alert_title').text('Success');
	    		 $('#model_content').text('Step '+step+' updated successfully!!!');
	    		 $("#myModal2").modal('show');
	        	//alert("step2 is saved!!!" );
	        }
	        else {
	        	$('#alert_title').text('Failure');
	        	$('#model_content').css('color','red');
	        	$('#model_content').text('Step '+step+' Not updated successfully!!!');
	    		 $("#myModal2").modal('show');

	          //  alert('Error: ' + response.msg);

	        }
	    })
	
}
function getFormDataObject() {
	var $form = $('.js-form');
    var formEl = $form[0];
    var formData = new FormData(formEl);
    return formData;
  }
function postFormAjax() {
	var taskName = $("#taskName").val();
    var description = $("#description").val();
	var story = $("#story").val();
	var descriptionStep = $("#descriptionStep").val();
	
	 if (taskName == "") {
			$("#errTaskName").text("Task name is required. ");
			$("#errTaskName").focus();
			return false;
		}
	    if (description == "") {
			$("#errDescription").text("Task description is required. ");
			$("#errDescription").focus();
			return false;
		}
	    if (story == "") {
			$("#errStory").text("Story is required. ");
			$("#errStory").focus();
			return false;
		}
	    if (descriptionStep == "") {
	    	
			$("#errDescriptionStep_1").text("Step description is required. ");
			$("#errDescriptionStep_1").focus();
			return false;
		}
	var formData = getFormDataObject();
    var xhr = $.ajax({
      url: '/task/edittask',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false
    })
    .done(function( response ) {
    	
    	$('#alert_title').text('Success');
		 $('#model_content').text('Task updated successfully!!!');
		 $("#myModal2").modal('show');
       
    })
  }
  


function getStepOneData(){
	$.ajax({
        type: 'post',
        data:{taskId:$('#taskId').val()},
        url: '/task/stepimage' 
    }).done(function( response ) {
    	var data=JSON.parse(response);
        $('#upload').css("background-image","url(../stepimage/"+data.stepImage1+")");
        $('#upload2').css("background-image","url(../stepimage/"+data.stepImage2+")")
    });
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
    		$("#publishButton_id").prop('onclick',null).off('click');
    		$('#editTask_id').css("display","none");
    	}
    	else{
    		alert("not published");
    	}
    });
}
function editTask(){
	 $('input[type=text]').prop('disabled', false);
	 $('input[type=file]').prop('disabled', false);
	 $('textarea').prop('disabled', false);
	 $('#editTask_id').text("Editable..");
	 $('#editTask_id').css("background-color","#ff3300");
	 $("#editTask_id").prop('onclick',null).off('click');
	/* $('#submit_div_step1').css("display","block");
	 $('#submit_div_step2').css("display","block");*/
	 $('*[id*="submit_div_step"]').css('display','block');
}

function closeModel(){
	$("#myModal2").modal('hide');
}