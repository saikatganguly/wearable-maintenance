(function() {
	
	getStepOneData();
	//publishData();
	$("#publishButton_id").on('click',publishData);
	
	
	
}());
$(document).ready(function() {
  //  $("input[disabled='disabled']").addClass('disable');
});
function getStepOneData(){
	$.ajax({
        type: 'post',
        data:{taskId:$('#taskId').val()},
        url: '/task/getStepImage' 
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
        url: '/task/publishTask' 
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
	 $('textarea').prop('disabled', false);
	 $('#editTask_id').text("Editable..");
		$('#editTask_id').css("background-color","#ff3300");
		$("#editTask_id").prop('onclick',null).off('click');
		$('#submit_div_step1').css("display","block");
		$('#submit_div_step2').css("display","block");
}

