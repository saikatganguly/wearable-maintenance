var stepNumber=1;
(function() {
 
  var $form = $('.js-form');
   
}());
function getFormDataObjectStep(step) {
	var $formStep = $('.js-form-step-'+step);
    var formEl = $formStep[0];
    formEl.elements["taskId"].value= $("#taskId").val();
    formEl.elements["taskName"].value=$("#task_name").val();
    var formData = new FormData(formEl);
    return formData;
  }

function ajaxSubmit(step){
	var taskImage=$("#taskImage"+step).val();
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
	      url: '/task/addtaskstep',
	      type: 'POST',
	      data: formData,
	      contentType: false,
	      processData: false
	    })
	    .done(function( responce ) {
	        // Check for successful (blank) response
	        if (responce.msg=="success") {
	        	$('#alert_title').text('Success');
	    		 $('#model_content').text('Task step  is saved successfully!!!');
	    		 $("#myModal2").modal('show');
	    		 $(".js-submit-ajax-step-"+stepNumber).prop('onclick',null).off('click');
	    		 $(".js-submit-ajax-step-"+stepNumber).text("Submited");
	        	 $("#step").val(++stepNumber);
	    		 $("#status").val("saved");
	        	//$('#publish_task').css('display','block');
	        	

	        }
	        else {
	        	$('#alert_title').text('Failure');
	      		 $('#model_content').text('Step not saved successfully!!!');
	      		 $("#myModal2").modal('show');
	            // If something goes wrong, alert the error message that our service returned
	           // alert('Error: ' + response.msg);

	        }
	    });
	    
	    return xhr;
    
	
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
	var taskImage=$("#taskImage").val();
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
	    if (taskImage == "") {
			$("#errStepImage_1").text("Step Image is required. ");
			$("#errStepImage_1").focus();
			return false;
		}
	    if (descriptionStep == "") {
			$("#errDescriptionStep_1").text("Step description is required. ");
			$("#errDescriptionStep_1").focus();
			return false;
		}
    var formData = getFormDataObject();
    var xhr = $.ajax({
      url: '/task/addtask',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false
    })
    .done(function( responce ) {
    	var data=JSON.parse(responce);
        // Check for successful (blank) response
        if (data.taskId.length >0) {
	        	$('#alert_title').text('Success');
	    		$('#model_content').text('Task is saved successfully!!!');
	    		$("#myModal2").modal('show');
        	//alert("Task is saved!!!" +data.taskname );
	        	$("#taskId").val(data.taskId);
	        	$("#task_name").val(data.taskName);
	        	$(".js-submit-ajax").prop('onclick',null).off('click');
	    		 $(".js-submit-ajax").text("Submited");
	        	$("#step").val(++stepNumber);
	        	$("#status").val("saved");
        	
        	//window.location.href = "/home";

        }
        else {
        	$('#alert_title').text('Failure');
   		 	$('#model_content').text('Task not saved successfully!!!');
   		 	$("#myModal2").modal('show');

            // If something goes wrong, alert the error message that our service returned
            //alert('Error: ' + response.msg);

        }
    });
     return xhr;
    /*alert("khjk");
    return true;*/
    
  }
  

