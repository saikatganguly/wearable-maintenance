(function() {
 
  var $form = $('.js-form');
  var $formStep2 = $('.js-form-step-2');
  var $submitAjax = $('.js-submit-ajax');
  var $submitAjaxStep2 = $('.js-submit-ajax-step-2');
  var $submitIframe = $('.js-submit-iframe');
  var $message = $('.js-message');
  var $iframeResponse = $('.js-iframe-response');

  function onSubmitAjax(e) {
  
    if (e) e.preventDefault();
    if (!FormData) {
      return handleError('Sorry! Your browser doesn\'t support FormData');
    }

    disableSubmit();
    postFormAjax(onPostFormSuccess, onPostFormError, onPostFormComplete);
    printMessage('Submitted with ajax...');
  }
  function onSubmitAjaxStep2(e) {
	  
	    if (e) e.preventDefault();
	    if (!FormData) {
	      return handleError('Sorry! Your browser doesn\'t support FormData');
	    }

	    disableSubmit2();
	    postFormAjaxStep2(onPostFormSuccess, onPostFormError, onPostFormComplete2);
	    printMessage('Submitted with ajax...');
	  }

  function onSubmitIframe(e) {
    if (e) e.preventDefault();
    disableSubmit();
    $form.submit();
    printMessage('Submitted with iframe...');
  }

  function disableSubmit() {
    $submitAjax.attr('disabled', true);
    $submitAjax.text('Processing...');
   
    $submitIframe.attr('disabled', true);
    $submitIframe.text('Processing...');
  }
  function disableSubmit2() {
	   
	    $submitAjaxStep2.attr('disabled', true);
	    $submitAjaxStep2.text('Processing...');
	    $submitIframe.attr('disabled', true);
	    $submitIframe.text('Processing...');
	  }

  function enableSubmit() {
    $submitAjax.attr('disabled', false);
    $submitAjax.text('Submited');
    
    $submitIframe.attr('disabled', false);
    $submitIframe.text('Submit with iframe');
  }
  function enableSubmit2() {
	    $submitAjaxStep2.attr('disabled', false);
	    $submitAjaxStep2.text('Submited');
	    $submitIframe.attr('disabled', false);
	    $submitIframe.text('Submit with iframe');
	  }

  function handleSuccess(data) {
    console.log('Success:', data);
    printMessage(data);
  }

  function handleError(data) {
    console.error('Error:', data);
    printMessage(data);
  }

  function printMessage(data) {
    var message = data;
    if (typeof data === 'object') {
      message = JSON.stringify(data, null, 2);
    }
    $message.text(message);
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
        	//alert("Task is saved!!!" +data.taskId );
        	$("#taskId").val(data.taskId);
        	$("#step").val(data.step);
        	//window.location.href = "/home";

        }
        else {
        	$('#alert_title').text('Failure');
   		 $('#model_content').text('Task not saved successfully!!!');
   		 $("#myModal2").modal('show');

            // If something goes wrong, alert the error message that our service returned
            //alert('Error: ' + response.msg);

        }
    })
    .fail(fail)
    .always(always);
    return xhr;
  }
  function postFormAjaxStep2(done, fail, always) {
	    var formData = getFormDataObjectStep2();
	    var xhr = $.ajax({
	      url: '/task/addtaskstep',
	      type: 'POST',
	      data: formData,
	      contentType: false,
	      processData: false
	    })
	    .done(function( responce ) {
	//var data=JSON.parse(responce);
	        // Check for successful (blank) response
	        if (responce.msg=="success") {
	        	$('#alert_title').text('Success');
	    		 $('#model_content').text('Task step 2 is saved successfully!!!');
	    		 $("#myModal2").modal('show');
	        	//alert("step2 is saved!!!" );
	        	$('#publish_task').css('display','block');

	        }
	        else {
	        	$('#alert_title').text('Failure');
	      		 $('#model_content').text('Step not saved successfully!!!');
	      		 $("#myModal2").modal('show');
	            // If something goes wrong, alert the error message that our service returned
	           // alert('Error: ' + response.msg);

	        }
	    })
	    .fail(fail)
	    .always(always);
	    return xhr;
	  }

  function onIframeResponse() {
    // Expect `this` to be bound to iframe
    var response = parseResponseFromIframe(this);
    onPostFormComplete();
    if (!response.ok) {
      return onPostFormError(response);
    }
    onPostFormSuccess(response);
  }

  function onPostFormComplete(response) {
    enableSubmit();
  }
  function onPostFormComplete2(response) {
	    enableSubmit2();
	  }

  function onPostFormSuccess(response) {
    handleSuccess(response);
  }

  function onPostFormError(error) {
    handleError(error);
  }

  function parseResponseFromIframe(iframe) {
    // Inspired by
    // http://cmlenz.github.io/jquery-iframe-transport/
    var doc = iframe.contentWindow ? iframe.contentWindow.document :
      (iframe.contentDocument ? iframe.contentDocument : iframe.document);
    var root = doc.documentElement ? doc.documentElement : doc.body;
    var textarea = root.getElementsByTagName('textarea')[0];

    var response = $(textarea).text();
    try {
      response = JSON.parse(response);
    }
    catch(SyntaxError) {
      response = {response: response};
    }

    return response;
  }

  function bindSubmit() {
	  $submitAjaxStep2.on('click', onSubmitAjaxStep2);
    $submitAjax.on('click', onSubmitAjax);
    $submitIframe.on('click', onSubmitIframe);
  }

  function bindIframeResponse() {
    $iframeResponse.on('load', onIframeResponse);
  }

  function bindAllEvents() {
  
    bindSubmit();
    bindIframeResponse();
  }

  function init() {
   
    bindAllEvents();
  }

  init();

}());

