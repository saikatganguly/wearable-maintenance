(function() {
	getStepOneData();
	$("#publishButton_id").on('click',publishData);
	var $form = $('.js-form');
	  var $formStep2 = $('.js-form-step-2');
	  var $submitAjax = $('.js-submit-ajax');
	  var $submitAjaxStep2 = $('.js-submit-ajax-step-2');
	  function onSubmitAjax(e) {
	  
	    if (e) e.preventDefault();
	    if (!FormData) {
	      return handleError('Sorry! Your browser doesn\'t support FormData');
	    }

	    disableSubmit();
	    postFormAjax(onPostFormSuccess, onPostFormError, onPostFormComplete);
	   
	  }
	  function onSubmitAjaxStep2(e) {
		  
		    if (e) e.preventDefault();
		    if (!FormData) {
		      return handleError('Sorry! Your browser doesn\'t support FormData');
		    }

		    disableSubmit();
		    postFormAjaxStep2(onPostFormSuccess, onPostFormError, onPostFormComplete);
		    
		  }

	  

	  function disableSubmit() {
	    $submitAjax.attr('disabled', true);
	    $submitAjax.text('Processing...');
	    $submitAjaxStep2.attr('disabled', true);
	    $submitAjaxStep2.text('Processing...');
	   
	  }

	  function enableSubmit() {
	    $submitAjax.attr('disabled', false);
	    $submitAjax.text('Submited');
	    $submitAjaxStep2.attr('disabled', false);
	    $submitAjaxStep2.text('Submited');
	    
	  }

	  function handleSuccess(data) {
	    console.log('Success:', data);
	    
	  }

	  function handleError(data) {
	    console.error('Error:', data);
	   
	  }

	  

	  function getFormDataObject() {
	    var formEl = $form[0];
	    var formData = new FormData(formEl);
	    return formData;
	  }
	  function getFormDataObjectStep2() {
		    var formEl = $formStep2[0];
		    var formData = new FormData(formEl);
		    return formData;
		  }

	  function postFormAjax(done, fail, always) {
	    var formData = getFormDataObject();
	    var xhr = $.ajax({
	      url: '/task/edittask',
	      type: 'POST',
	      data: formData,
	      contentType: false,
	      processData: false
	    })
	    .done(function( responce ) {
	    	
	    	alert("Task is saved!!!" );
	       
	    })
	    .fail(fail)
	    .always(always);
	    return xhr;
	  }
	  function postFormAjaxStep2(done, fail, always) {
		    var formData = getFormDataObjectStep2();
		    var xhr = $.ajax({
		      url: '/task/edittaskstep',
		      type: 'POST',
		      data: formData,
		      contentType: false,
		      processData: false
		    })
		    .done(function( responce ) {
		        if (responce.msg=="success") {
		        	alert("step2 is saved!!!" );
		        }
		        else {

		            alert('Error: ' + response.msg);

		        }
		    })
		    .fail(fail)
		    .always(always);
		    return xhr;
		  }

	

	  function onPostFormComplete(response) {
	    enableSubmit();
	  }

	  function onPostFormSuccess(response) {
	    handleSuccess(response);
	  }

	  function onPostFormError(error) {
	    handleError(error);
	  }

	 

	  function bindSubmit() {
		  $submitAjaxStep2.on('click', onSubmitAjaxStep2);
	      $submitAjax.on('click', onSubmitAjax);
	    
	  }

	  function init() {
	   
		  bindSubmit();
	  }

	  init();
	  	
	
}());

function getStepOneData(){
	$.ajax({
        type: 'post',
        data:{taskId:$('#taskId').val()},
        url: '/task/stepimage' 
    }).done(function( response ) {
    	var data=JSON.parse(response);
        $('#upload').css("background-image","url(data:image/jpeg;base64,"+data.stepImage1+")");
        $('#upload2').css("background-image","url(data:image/jpeg;base64,"+data.stepImage2+")")
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
	 $('#submit_div_step1').css("display","block");
	 $('#submit_div_step2').css("display","block");
}

